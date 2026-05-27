<script>
import { mapState } from 'pinia'
import { useUiStore } from '../stores/ui'

export default {
  name: 'NotificationToast',
  computed: {
    // Mapping UI store states for Options API usage
    ...mapState(useUiStore, ['toastVisible', 'toastMessage'])
  }
}
</script>

<template>
  <transition name="slide-up">
    <div v-if="toastVisible" class="fixed bottom-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      <span class="font-medium">{{ toastMessage }}</span>
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>