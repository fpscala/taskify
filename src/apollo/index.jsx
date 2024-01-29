import { ApolloLink, concat } from "apollo-link";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from "apollo-link-http";
const uri = "http://localhost:8000/graphql"
const httpLink = new HttpLink({ uri: uri });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = window.localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const setupApollo = () => {
  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });


  return client;
};

export default setupApollo;
