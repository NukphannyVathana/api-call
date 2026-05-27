<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { fetchProducts } from '../../services/api'
import ProductCard from '../../components/ProductCard.vue'

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ['All', 'Electronics', 'Fashion', 'Accessories']
let searchTimeout = null

const loadProducts = async (query = '') => {
  loading.value = true
  try {
    products.value = await fetchProducts(query)
  } catch (error) {
    console.error('Product search failed:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})

watch(searchQuery, (value) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadProducts(value.trim())
  }, 300)
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value
    return matchesCategory
  })
})
</script>

<template>
  <div class="container shop-page">
    <div class="shop-header">
      <h1>Shop All</h1>
      
      <div class="filters">
        <input v-model="searchQuery" type="text" placeholder="Search products..." class="search-input" />
        <select v-model="selectedCategory" class="category-select">
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">Loading products...</div>
    
    <div v-else-if="filteredProducts.length === 0" class="empty-state">
      <p>No products found matching your criteria.</p>
      <button @click="searchQuery = ''; selectedCategory = 'All'" class="btn-clear">Clear Filters</button>
    </div>

    <div v-else class="product-grid">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style scoped>
.shop-page {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.shop-header h1 {
  font-size: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
}

.search-input, .category-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
}

.search-input:focus, .category-select:focus {
  border-color: var(--primary-color);
}

.product-grid {
  display: grid;
  /* Auto-fill creates responsive columns without media queries */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
}

.btn-clear {
  margin-top: 1rem;
  color: var(--primary-color);
  background: transparent;
  font-weight: bold;
}
</style>