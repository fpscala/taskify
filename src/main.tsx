import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import setupApollo from "./apollo";
import { ApolloProvider } from "@apollo/client";
const client = setupApollo();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
