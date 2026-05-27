<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '../../services/api'
import { useCartStore } from '../../Stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)

onMounted(async () => {
  try {
    product.value = await fetchProductById(route.params.id)
  } catch (error) {
    alert("Product not found")
    router.push('/shop')
  } finally {
    loading.value = false
  }
})

const increment = () => quantity.value++
const decrement = () => { if (quantity.value > 1) quantity.value-- }

const handleAddToCart = () => {
  cartStore.addToCart(product.value, quantity.value)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="loading" class="text-center py-20 text-gray-500">Loading...</div>
    
    <div v-else class="flex flex-col md:flex-row gap-12">
      <div class="md:w-1/2">
        <div class="rounded-2xl overflow-hidden bg-gray-100 shadow-sm aspect-square">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
        </div>
      </div>
      
      <div class="md:w-1/2 flex flex-col justify-center">
        <span class="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">{{ product.category }}</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{{ product.name }}</h1>
        <div class="flex items-center text-yellow-400 mb-6 text-lg">
          <span class="text-gray-900 mr-2 font-medium">{{ product.rating }}</span> ★
        </div>
        <p class="text-2xl font-bold text-gray-900 mb-6">${{ product.price.toFixed(2) }}</p>
        <p class="text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>
        
        <div class="flex items-center gap-6 mb-8 border-t border-gray-200 pt-8">
          <div class="flex items-center border border-gray-300 rounded-lg bg-white">
            <button @click="decrement" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-l-lg transition">-</button>
            <span class="px-4 py-2 font-medium border-x border-gray-300 min-w-[3rem] text-center">{{ quantity }}</span>
            <button @click="increment" class="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-r-lg transition">+</button>
          </div>
          
          <button @click="handleAddToCart" class="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>