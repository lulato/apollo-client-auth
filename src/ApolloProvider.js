import React from "react";

import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/link-context";

// 1. APOLLO SETUP
// Cache Setup
// const isLoggedInVar = makeVar(!!localStorage.getItem("@token"));
// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         isLoggedIn: {
//           read() {
//             return isLoggedInVar();
//           },
//         },
//       },
//     },
//   },
// });
const cache = new InMemoryCache();

// BaseLink
const httpLink = new createHttpLink({
  uri: "https://palapapa-server.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("@token");
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const combinedLink = authLink.concat(httpLink);

// Error handling... need to figure out how this works
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Combine Links
const link = errorLink.concat(combinedLink);

const client = new ApolloClient({
  cache,
  link,
});

export function ClientProvider() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
