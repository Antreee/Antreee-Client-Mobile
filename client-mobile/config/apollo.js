import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://99cd-180-251-156-102.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
