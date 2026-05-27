import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './assets/pages/HomeView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/shop', name: 'Shop', component: () => import('./assets/pages/ShopView.vue') },
    { path: '/product/:id', name: 'ProductDetail', component: () => import('./assets/pages/ProductDetailView.vue') },
    { path: '/cart', name: 'Cart', component: () => import('./assets/pages/CartView.vue') }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})