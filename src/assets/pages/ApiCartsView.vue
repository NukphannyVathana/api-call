<script setup>
import { onMounted } from 'vue'
import { useApiCartStore } from '../../Stores/apiCarts'

const apiCartStore = useApiCartStore()

onMounted(() => {
  apiCartStore.fetchCarts()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">API Carts</h1>
    
    <div v-if="apiCartStore.loading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-4"></div>
      <p class="text-gray-500 text-lg">Loading carts...</p>
    </div>
    
    <div v-else-if="apiCartStore.error" class="text-center py-10 bg-red-50 rounded-xl border border-red-100">
      <p class="text-red-500 text-lg">{{ apiCartStore.error }}</p>
    </div>
    
    <div v-else class="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cart ID</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Products</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Quantity</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Discounted Total</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="cart in apiCartStore.carts" :key="cart.id" class="hover:bg-indigo-50/50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">#{{ cart.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{{ cart.userId }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              <span class="bg-gray-100 text-gray-800 py-1 px-2 rounded-md font-medium">{{ cart.totalProducts }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              <span class="bg-blue-100 text-blue-800 py-1 px-2 rounded-md font-medium">{{ cart.totalQuantity }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${{ cart.total.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">${{ cart.discountedTotal.toFixed(2) }}</td>
          </tr>
          <tr v-if="apiCartStore.carts.length === 0">
            <td colspan="6" class="px-6 py-10 text-center text-gray-500">No carts found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
