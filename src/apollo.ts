// apollo.ts
import { provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const createApollo = async (): Promise<ApolloClient<unknown>> => {
  const apolloClient = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
  });
  provide(DefaultApolloClient, apolloClient);

  return apolloClient;
};
