<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-kigali-blue rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.293a1 1 0 00-1.414 1.414L14.586 10l-1.293 1.293a1 1 0 101.414 1.414L16 11.414l1.293 1.293a1 1 0 001.414-1.414L17.414 10l1.293-1.293a1 1 0 00-1.414-1.414L16 8.586l-1.293-1.293z"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">Kigali Tech</span>
        </RouterLink>

        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kigali-blue focus:border-transparent"
              aria-label="Search products"
            />
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <RouterLink to="/products" class="text-gray-600 hover:text-kigali-blue transition-colors">
            Products
          </RouterLink>
          <RouterLink to="/cart" class="relative text-gray-600 hover:text-kigali-blue transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 bg-kigali-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>
          <RouterLink to="/wishlist" class="relative text-gray-600 hover:text-kigali-blue transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span v-if="wishlistStore.itemCount > 0" class="absolute -top-2 -right-2 bg-kigali-yellow text-gray-800 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ wishlistStore.itemCount }}
            </span>
          </RouterLink>
          <RouterLink v-if="authStore.isAuthenticated" to="/profile" class="text-gray-600 hover:text-kigali-blue transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </RouterLink>
          <RouterLink v-else to="/login" class="btn-primary">
            Login
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-gray-600 hover:text-kigali-blue"
          aria-label="Toggle mobile menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden py-4 border-t">
        <div class="mb-4">
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kigali-blue focus:border-transparent"
            aria-label="Search products"
          />
        </div>
        <div class="flex flex-col space-y-3">
          <RouterLink to="/products" class="text-gray-600 hover:text-kigali-blue transition-colors">
            Products
          </RouterLink>
          <RouterLink to="/cart" class="text-gray-600 hover:text-kigali-blue transition-colors">
            Cart ({{ cartStore.itemCount }})
          </RouterLink>
          <RouterLink to="/wishlist" class="text-gray-600 hover:text-kigali-blue transition-colors">
            Wishlist ({{ wishlistStore.itemCount }})
          </RouterLink>
          <RouterLink v-if="authStore.isAuthenticated" to="/profile" class="text-gray-600 hover:text-kigali-blue transition-colors">
            Profile
          </RouterLink>
          <RouterLink v-else to="/login" class="btn-primary text-center">
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const showMobileMenu = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'ProductsList',
      query: { search: searchQuery.value.trim() }
    })
    showMobileMenu.value = false
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>
