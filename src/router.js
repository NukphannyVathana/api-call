import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './assets/pages/HomeView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/shop', name: 'Shop', component: () => import('./assets/pages/ShopView.vue') },
    { path: '/product/:id', name: 'ProductDetail', component: () => import('./assets/pages/ProductDetailView.vue') },
    { path: '/cart', name: 'Cart', component: () => import('./assets/pages/CartView.vue') },
    { path: '/api-carts', name: 'ApiCarts', component: () => import('./assets/pages/ApiCartsView.vue') }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})