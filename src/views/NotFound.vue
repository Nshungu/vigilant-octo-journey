<template>
  <div class="min-h-screen bg-kigali-light flex items-center justify-center py-12 px-4">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-kigali-blue">404</h1>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p class="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>

      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/" class="btn-primary">
            Go Home
          </RouterLink>
          <RouterLink to="/products" class="btn-outline">
            Browse Products
          </RouterLink>
        </div>

        <div class="mt-8">
          <p class="text-sm text-gray-500 mb-4">Or search for what you need:</p>
          <div class="max-w-md mx-auto">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kigali-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="mt-12 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h3 class="text-lg font-semibold mb-4">Need Help?</h3>
        <div class="space-y-3 text-left">
          <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-kigali-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>FAQ</span>
            </div>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          
          <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-kigali-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Contact Support</span>
            </div>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          
          <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-kigali-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>Call: +250 788 123 456</span>
            </div>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'ProductsList',
      query: { search: searchQuery.value.trim() }
    })
  }
}
</script>
