<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative bg-gradient-to-r from-kigali-blue to-blue-700 text-white">
      <div class="container mx-auto px-4 py-20 md:py-32">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Kigali Tech Store
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Your trusted partner for affordable electronics and gadgets in Rwanda. Quality products, competitive prices, and fast delivery across Kigali.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/products" class="btn-primary bg-white text-kigali-blue hover:bg-gray-100 text-lg px-8 py-3">
              Shop Now
            </RouterLink>
            <RouterLink to="/about" class="btn-outline border-white text-white hover:bg-white hover:text-kigali-blue text-lg px-8 py-3">
              Learn More
            </RouterLink>
          </div>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-12 text-kigali-light fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 bg-kigali-light">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-kigali-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Free Delivery</h3>
            <p class="text-gray-600">Free shipping on orders over $100 across Kigali</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-kigali-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Warranty Protection</h3>
            <p class="text-gray-600">12-month warranty on all electronic products</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-kigali-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Secure Payment</h3>
            <p class="text-gray-600">Safe and secure payment with Mobile Money & Cards</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <RouterLink
            v-for="category in categories"
            :key="category"
            :to="{ name: 'ProductsByCategory', params: { category } }"
            class="card p-6 text-center hover:shadow-lg transition-shadow duration-200 group"
          >
            <div class="w-16 h-16 bg-kigali-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z"/>
              </svg>
            </div>
            <h3 class="font-semibold capitalize text-gray-800">{{ category }}</h3>
            <p class="text-sm text-gray-500 mt-1">View Products</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold">Featured Products</h2>
          <RouterLink to="/products" class="btn-outline">
            View All Products
          </RouterLink>
        </div>

        <LoadingSpinner v-if="productsStore.loading" centered text="Loading products..." />

        <div v-else-if="productsStore.error" class="text-center py-12">
          <div class="text-red-500 mb-4">{{ productsStore.error }}</div>
          <button @click="loadProducts" class="btn-primary">
            Try Again
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-kigali-blue text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
        <p class="text-xl mb-8 text-blue-100">
          Subscribe to our newsletter for exclusive deals and new product updates
        </p>
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex gap-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button type="submit" class="btn-primary bg-kigali-green hover:bg-green-600 text-white">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/product/ProductCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const productsStore = useProductsStore()
const email = ref('')

const featuredProducts = computed(() => productsStore.featuredProducts.slice(0, 8))
const categories = computed(() => productsStore.categories.slice(0, 8))

const loadProducts = async () => {
  try {
    await productsStore.initializeStore()
  } catch (error) {
    console.error('Error loading products and categories:', error)
  }
}

const subscribeNewsletter = () => {
  // Mock newsletter subscription
  alert(`Thank you for subscribing with ${email.value}!`)
  email.value = ''
}

onMounted(() => {
  loadProducts()
})
</script>
