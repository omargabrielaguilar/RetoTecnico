import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import Vista from './views/Vista.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/vista/:id', component: Vista },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
