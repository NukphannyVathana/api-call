import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isMiniCartOpen: false,
    toastVisible: false,
    toastMessage: ''
  }),
  actions: {
    toggleMiniCart() {
      this.isMiniCartOpen = !this.isMiniCartOpen
    },
    showToast(message) {
      this.toastMessage = message
      this.toastVisible = true
      setTimeout(() => {
        this.toastVisible = false
      }, 3000)
    }
  }
})