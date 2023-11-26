import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
