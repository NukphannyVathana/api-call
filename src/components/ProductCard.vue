<script>
import { mapActions } from 'pinia'
import { useCartStore } from '../Stores/cart.js'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart']),
    handleAddToCart() {
      this.addToCart(this.product, 1);
    }
  }
}
</script>

<template>
  <div class="product-card">
    <router-link :to="`/product/${product.id}`" class="image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <span class="category-badge">{{ product.category }}</span>
    </router-link>
    
    <div class="product-info">
      <router-link :to="`/product/${product.id}`">
        <h3 class="product-name">{{ product.name }}</h3>
      </router-link>
      <div class="product-rating">
        <span>{{ product.rating }}</span> ★
      </div>
      
      <div class="product-footer">
        <span class="product-price">${{ product.price.toFixed(2) }}</span>
        <button @click="handleAddToCart" class="btn-add">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  border: 1px solid rgba(229, 231, 235, 0.85);
  border-radius: 1.25rem;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
}

.image-wrapper {
  position: relative;
  display: block;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.image-wrapper:hover .product-image {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.96);
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-gray-900);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.product-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-rating {
  color: #fbbf24;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.product-rating span {
  color: var(--text-muted);
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.btn-add {
  border-radius: 999px;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.btn-add:hover {
  background-color: var(--primary-hover);
}

.product-price {
  font-weight: 800;
  color: var(--text-main);
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
}

.btn-add {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
}

.btn-add:hover {
  background-color: var(--primary-hover);
}
</style>