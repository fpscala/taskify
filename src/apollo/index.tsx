import { ApolloLink, concat, fromPromise } from "apollo-link";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { gql } from "@apollo/client";
import { refreshToken } from "../apollo/mutations";

const REFRESH_TOKEN = gql`
  ${refreshToken}
`;

const GRAPHQL_URL = "http://localhost:8000/graphql";

const httpLink = new HttpLink({
  uri: (operation) =>
    `${GRAPHQL_URL}?operation=${encodeURIComponent(
      operation.operationName
    )}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const accessToken = window.localStorage.getItem("accessToken");
  operation.setContext({
    headers: {
      authorization:
        !operation.operationName.includes("Login") && accessToken
          ? `Bearer ${accessToken}`
          : "",
    },
  });
  return forward(operation);
});
function getNewToken(refreshToken: string) {
  // Assuming you have defined the REFRESH_TOKEN_MUTATION somewhere
  return refreshApolloClient
    .mutate({
      mutation: REFRESH_TOKEN,
      variables: { refreshToken },
    })
    .then((response) => {
      // Extract the new accessToken from the response data and return it
      const { accessToken, refreshToken: newRefreshToken } =
        response.data.refreshToken;
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", newRefreshToken);
      return accessToken;
    })
    .catch(() => {
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      return;
    });
}
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    function refetchToken(refreshToken: string) {
      return fromPromise(getNewToken(refreshToken))
        .filter((value) => Boolean(value))
        .flatMap((accessToken) => {
          const oldHeaders = operation.getContext().headers;
          // modify the operation context with a new token
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${accessToken}`,
            },
          });

          // retry the request, returning the new observable
          return forward(operation);
        });
    }
    if (networkError) {
      // Check the status code of the network error
      if (networkError?.statusCode === 403 && refreshToken) {
        return refetchToken(refreshToken);
      } else {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return;
      }
    }
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        // Check for a 403 error
        if (extensions.errorCode === "VALIDATION_ERROR" && refreshToken) {
          return refetchToken(refreshToken);
        }
      });
    }
  }
);

const refreshApolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

const setupApollo = () => {
  const client = new ApolloClient({
    link: concat(authMiddleware, ApolloLink.from([errorLink, httpLink])),
    cache: new InMemoryCache(),
  });

  return client;
};

export default setupApollo;
