import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiCartStore = defineStore('apiCart', {
  state: () => ({
    carts: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchCarts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('https://dummyjson.com/carts')
        this.carts = response.data.carts
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
