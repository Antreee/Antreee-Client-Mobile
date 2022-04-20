import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://a1e1-158-140-164-0.ngrok.io",

  cache: new InMemoryCache(),
});

export default client;
