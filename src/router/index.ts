import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import OauthRedirect from '@/components/OauthRedirect.vue';
import OauthCallback from '@/components/OauthCallback.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/redirect', component: OauthRedirect },
  { path: '/callback', component: OauthCallback },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
