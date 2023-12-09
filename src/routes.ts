import { createRouter, createWebHistory } from 'vue-router'

import Login from './pages/Login/index.vue'
import Register from './pages/Register/index.vue'
import Dashboard from './pages/Dashboard/index.vue'
import Account from './pages/Account/index.vue'
import Links from './pages/Links/index.vue'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Register },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'account',
        component: Account,
      },
      {
        path: ':folderId',
        component: Links,
      },
    ],
  },
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
