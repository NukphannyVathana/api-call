<script>
export default {
  name: 'HeroBanner',
  data() {
    return {
      title: "Summer Collection 2026",
      subtitle: "Discover the latest trends in electronics, fashion, and accessories."
    }
  }
}
</script>

<template>
  <div class="relative bg-gray-900 text-white overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
    <div class="absolute inset-0">
      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" alt="Hero" class="w-full h-full object-cover opacity-40" />
    </div>
    <div class="relative max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8 flex flex-col items-center text-center">
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{{ title }}</h1>
      <p class="mt-6 max-w-lg text-xl text-gray-300">{{ subtitle }}</p>
      <div class="mt-10 flex gap-4">
        <router-link to="/shop" class="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg">Shop Now</router-link>
      </div>
    </div>
  </div>
</template>