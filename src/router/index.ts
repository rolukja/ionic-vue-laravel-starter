import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/debug', component: () => import('../views/Debug.vue') }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token');
  const isAuthenticated = !!token;
  
  // Wenn Route Authentifizierung erfordert, aber User nicht authentifiziert ist
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }
  
  // Wenn Route Guest-Status erfordert, aber User authentifiziert ist
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/home');
    return;
  }
  
  next();
});

export default router;