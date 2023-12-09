import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

const routes = [
  { path: '/', component: () => import('./pages/Login/index.vue') },
  { path: '/signup', component: () => import('./pages/Register/index.vue') },
  {
    path: '/dashboard',
    component: () => import('./pages/Dashboard/index.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'account',
        component: () => import('./pages/Account/index.vue'),
      },
      {
        path: ':folderId',
        component: () => import('./pages/Links/index.vue'),
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
