<script setup>
import { useCartStore } from './stores/cart'
import { useUiStore } from './stores/ui'
import MiniCart from './components/MiniCart.vue'
import NotificationToast from './components/NotificationToast.vue'

const cartStore = useCartStore()
const uiStore = useUiStore()
</script>

<template>
  <div id="app-wrapper">
    <header class="navbar">
      <div class="container navbar-content">
        <router-link to="/" class="brand">VueCommerce</router-link>
        
        <nav class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/shop">Shop</router-link>
          <router-link to="/api-carts">API Carts</router-link>
        </nav>

        <button @click="uiStore.toggleMiniCart" class="cart-toggle">
          <span>🛒 Cart</span>
          <span v-if="cartStore.cartCount > 0" class="cart-badge">
            {{ cartStore.cartCount }}
          </span>
        </button>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <MiniCart />
    <NotificationToast />
  </div>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 40;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.cart-toggle {
  position: relative;
  background: transparent;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.cart-toggle:hover {
  background-color: var(--border-color);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
}

.main-content {
  padding-bottom: 4rem;
}
</style>