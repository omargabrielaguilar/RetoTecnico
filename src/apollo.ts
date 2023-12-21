/**
 * Este archivo apollo.ts contiene la configuración para crear un cliente Apollo que se utilizará para realizar consultas GraphQL a la API 'https://countries.trevorblades.com/'.
 */

import { provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const createApollo = async (): Promise<ApolloClient<unknown>> => {
  // Crear una instancia de Apollo Client con la URI de la API y una caché en memoria
  const apolloClient = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
  });

  // Hacer disponible el cliente Apollo en toda la aplicación
  provide(DefaultApolloClient, apolloClient);

  // Devolver la instancia del cliente Apollo
  return apolloClient;
};
