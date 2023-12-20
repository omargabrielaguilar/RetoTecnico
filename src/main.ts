// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './style.css';
import router from './router';
import { createApollo } from './apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient } from '@apollo/client/core';

const app = createApp(App);

app.use(router);

// Llama a createApollo y proporciona el cliente Apollo a la aplicación
createApollo().then((apolloClient: ApolloClient<unknown>) => {
  app.provide(DefaultApolloClient, apolloClient);
  app.mount('#app');
});
