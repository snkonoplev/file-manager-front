import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'System',
    component: () => import(/* webpackChunkName: "system" */ '../system/System.vue')
  },
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
    path: '/storage',
    name: 'Storage',
    component: () => import(/* webpackChunkName: "storage" */ '../storage/Storage.vue')
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: () => import(/* webpackChunkName: "user-create" */ '../users/create/UserCreate.vue')
  },
  {
    path: '/users/:id(\\d+)',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user-edit" */ '../users/edit/UserEdit.vue')
  },
  {
    path: '/users/change-password',
    name: 'ChangePassword',
    component: () => import(/* webpackChunkName: "change-password" */ '../users/change-password/UserChangePassword.vue')
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
