import { createRouter, createWebHistory } from 'vue-router'

import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Dashboard from './pages/Dashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Register },
  { path: '/dashboard', component: Dashboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
