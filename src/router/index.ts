import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../users/Users.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../login/Login.vue')
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: () => import(/* webpackChunkName: "user-create" */ '../users/create/UserCreate.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.name != 'Login' && !store.getters['login/isAuthenticated']) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
