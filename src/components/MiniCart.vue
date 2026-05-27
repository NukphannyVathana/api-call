<script setup>
import { useCartStore } from '../Stores/cart.js'
import { useUiStore } from '../stores/ui'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const uiStore = useUiStore()
const router = useRouter()

const navigateToCart = () => {
  uiStore.isMiniCartOpen = false
  router.push('/cart')
}
</script>

<template>
  <div v-if="uiStore.isMiniCartOpen" class="relative z-50">
    <div class="fixed inset-0 bg-gray-900/50 transition-opacity backdrop-blur-sm" @click="uiStore.toggleMiniCart"></div>
    
    <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
      <div class="w-screen max-w-md bg-white shadow-2xl h-full flex flex-col slide-in">
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 class="text-lg font-bold text-gray-900">Shopping Cart ({{ cartStore.cartCount }})</h2>
          <button @click="uiStore.toggleMiniCart" class="text-gray-400 hover:text-gray-500">
             <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <p v-if="cartStore.items.length === 0" class="text-gray-500 text-center mt-10">Your cart is empty.</p>
          <ul v-else class="space-y-6">
            <li v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-4">
              <img :src="item.image" :alt="item.name" class="h-16 w-16 rounded-md object-cover border border-gray-200" />
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 hover:text-red-700 ml-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="border-t border-gray-100 p-6 bg-gray-50">
          <div class="flex justify-between text-base font-bold text-gray-900 mb-4">
            <p>Subtotal</p>
            <p>${{ cartStore.cartTotal.toFixed(2) }}</p>
          </div>
          <button @click="navigateToCart" class="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            View Full Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-in {
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>