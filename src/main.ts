/**
 * En este archivo main.ts, se importan las funciones y componentes necesarios de Vue 3 y otras dependencias.
 * Se crea una instancia de la aplicación utilizando createApp y se importa el componente principal App.vue.
 */

import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import { createApollo } from './apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient } from '@apollo/client/core';

// Crear una instancia de la aplicación Vue
const app = createApp(App);

// Usar el enrutador en la aplicación
app.use(router);

// Llamar a createApollo para configurar Apollo Client
createApollo().then((apolloClient: ApolloClient<unknown>) => {
  // Proporcionar el cliente Apollo a la aplicación
  app.provide(DefaultApolloClient, apolloClient);
  // Al final se montará la aplicación en el elemento con el id 'app'
  app.mount('#app');
});
