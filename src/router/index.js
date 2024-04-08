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
          path: 'products/:id', 
          component: () => import('../views/front/ProductInfo.vue')
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
  ],
  //換頁回到最上面
  scrollBehavior(to ,from ,savedPosition){
    return savedPosition || {top:0}  
  }
})

export default router
