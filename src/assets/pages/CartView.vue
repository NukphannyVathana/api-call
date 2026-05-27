<script setup>
import { useCartStore } from '../../Stores/cart'

const cartStore = useCartStore()

const handleQuantityChange = (id, event) => {
  const newQuantity = parseInt(event.target.value)
  if (newQuantity > 0) cartStore.updateQuantity(id, newQuantity)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
      <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
      <h2 class="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
      <p class="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
      <router-link to="/shop" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">Start Shopping</router-link>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      <div class="flex-grow bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="item in cartStore.items" :key="item.id" class="p-6 flex flex-col sm:flex-row items-center gap-6">
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg bg-gray-50" />
            <div class="flex-grow text-center sm:text-left">
              <router-link :to="`/product/${item.id}`" class="text-lg font-semibold text-gray-900 hover:text-indigo-600">{{ item.name }}</router-link>
              <p class="text-gray-500 text-sm mt-1">{{ item.category }}</p>
            </div>
            <div class="flex items-center gap-4">
              <input type="number" :value="item.quantity" @change="handleQuantityChange(item.id, $event)" min="1" class="w-16 border border-gray-300 rounded-md px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              <p class="font-bold w-20 text-right">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition" title="Remove">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="w-full lg:w-96">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
          <h2 class="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
          <div class="flex justify-between mb-4 text-gray-600">
            <span>Subtotal ({{ cartStore.cartCount }} items)</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mb-6 text-gray-600">
            <span>Shipping</span>
            <span class="text-green-600 font-medium">Free</span>
          </div>
          <div class="flex justify-between mb-8 text-xl font-bold border-t border-gray-100 pt-4">
            <span>Total</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <button class="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>