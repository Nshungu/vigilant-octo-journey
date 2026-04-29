<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <aside class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center mb-6">
            <div class="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">{{ authStore.user?.name || 'User' }}</h2>
            <p class="text-gray-600">{{ authStore.user?.email }}</p>
          </div>

          <nav class="space-y-2">
            <RouterLink
              to="/profile/orders"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="$route.name === 'ProfileOrders' ? 'bg-kigali-blue text-white' : 'hover:bg-gray-100'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Order History</span>
            </RouterLink>

            <RouterLink
              to="/profile/wishlist"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              :class="$route.name === 'ProfileWishlist' ? 'bg-kigali-blue text-white' : 'hover:bg-gray-100'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>Wishlist</span>
            </RouterLink>

            <RouterLink
              to="/profile/settings"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Settings</span>
            </RouterLink>

            <button
              @click="logout"
              class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 text-left"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="lg:col-span-3">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>
