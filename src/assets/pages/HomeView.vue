<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../../services/api'
import HeroBanner from '../../components/HeroBanner.vue'
import ProductCard from '../../components/ProductCard.vue'

const featuredProducts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const products = await fetchProducts()
    // Slice to show only first 4 items as "Featured"
    featuredProducts.value = products.slice(0, 4)
  } catch (error) {
    console.error("Error fetching featured products", error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <HeroBanner />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h2 class="text-2xl font-bold mb-8">Featured Products</h2>
      <div v-if="loading" class="text-center py-10 text-gray-500">Loading features...</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>