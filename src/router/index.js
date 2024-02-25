import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
    path: '/',
    name: '',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'DIYdrink',
        name: 'DIYdrink',
        component: () => import('../views/front/DIYdrink.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/front/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/AdminView.vue'),
    children: [
      {
        path: 'adminHome',
        name: 'adminHome',
        component: () => import('../views/admin/AdminHome.vue')
      },
      {
        path: 'adminProducts',
        name: 'adminProducts',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'adminOrder',
        name: 'adminOrder',
        component: () => import('../views/admin/AdminOrder.vue')
      }
    ]
  }
  ]
})

export default router
