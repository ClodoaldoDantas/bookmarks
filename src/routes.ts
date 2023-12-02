import { createRouter, createWebHistory } from 'vue-router'

import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Dashboard from './pages/Dashboard.vue'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = await getCurrentUser()

  if (requiresAuth && !user) {
    next('/')
  } else if (!requiresAuth && user) {
    next('/dashboard')
  } else {
    next()
  }
})
