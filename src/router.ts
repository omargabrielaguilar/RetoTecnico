/**
 * Este archivo define y exporta el enrutador para la aplicación Vue 3 utilizando vue-router.
 * Importa las funciones y tipos necesarios de 'vue-router', así como las vistas Home y Vista.
 * Define las rutas de la aplicación, asignando componentes a rutas específicas.
 * Finalmente, crea y exporta el enrutador con las opciones de historial y rutas especificadas.
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Vista from "./views/Vista.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home }, // Ruta de inicio
  { path: "/vista/:id", component: Vista },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
