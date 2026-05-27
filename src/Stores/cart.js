import { defineStore } from 'pinia'
import { useUiStore } from './ui'

export const useCartStore = defineStore('cart', {
  state: () => ({
    // Initialize from localStorage if available
    items: JSON.parse(localStorage.getItem('ecommerce_cart')) || []
  }),
  getters: {
    cartTotal: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0)
  },
  actions: {
    saveCart() {
      localStorage.setItem('ecommerce_cart', JSON.stringify(this.items))
    },
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }
      this.saveCart()
      
      // Trigger UI Notification
      const uiStore = useUiStore()
      uiStore.showToast(`Added ${product.name} to cart!`)
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveCart()
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
        this.saveCart()
      }
    }
  }
})