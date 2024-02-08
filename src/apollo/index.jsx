import { ApolloLink, concat } from "apollo-link";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { gql } from "@apollo/client";
import { refreshToken } from "../apollo/mutations";

const REFRESH_TOKEN = gql`
  ${refreshToken}
`;

const uri = "http://localhost:8000/graphql";

const httpLink = new HttpLink({ uri: uri });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const accessToken = window.localStorage.getItem("accessToken");
  operation.setContext({
    headers: {
      authorization:
        operation.operationName !== "Login" && accessToken
          ? `Bearer ${accessToken}`
          : "",
    },
  });
  return forward(operation);
});
const getNewToken = (apolloClient, refreshToken) => {
  // Assuming you have defined the REFRESH_TOKEN_MUTATION somewhere
  return apolloClient
    .mutate({
      mutation: REFRESH_TOKEN,
      variables: { refreshToken },
    })
    .then((response) => {
      // Extract the new accessToken from the response data and return it
      console.log(response);
      const { accessToken, refreshToken: newRefreshToken } =
        response.data.refreshToken;
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", newRefreshToken);
      return accessToken;
    });
};
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  console.log(graphQLErrors);
  console.log(networkError);
  if (graphQLErrors) {
    console.log(graphQLErrors);
    graphQLErrors.forEach(({ message, extensions }) => {
      // Check for a 403 error
      if (extensions && extensions.code === "FORBIDDEN") {
        const refreshToken = window.localStorage.getItem("refreshToken");

        return fromPromise(
          getNewToken(operation.client, refreshToken).catch(() => {
            return (window.location.href = "/login");
          })
        )
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
    });
  }
});

const setupApollo = () => {
  const client = new ApolloClient({
    link: concat(authMiddleware, ApolloLink.from([errorLink, httpLink])),
    cache: new InMemoryCache(),
  });

  return client;
};

export default setupApollo;
