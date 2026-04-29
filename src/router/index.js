import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/products',
      component: () => import('@/views/ProductsLayout.vue'),
      children: [
        {
          path: '',
          name: 'ProductsList',
          component: () => import('@/views/ProductsList.vue')
        },
        {
          path: ':id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductDetail.vue'),
          props: true
        },
        {
          path: 'category/:category',
          name: 'ProductsByCategory',
          component: () => import('@/views/ProductsList.vue'),
          props: true
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/Cart.vue')
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: () => import('@/views/Wishlist.vue')
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('@/views/Checkout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfileLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/profile/orders'
        },
        {
          path: 'orders',
          name: 'ProfileOrders',
          component: () => import('@/views/ProfileOrders.vue')
        },
        {
          path: 'wishlist',
          name: 'ProfileWishlist',
          component: () => import('@/views/ProfileWishlist.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: () => import('@/views/OrderSuccess.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
