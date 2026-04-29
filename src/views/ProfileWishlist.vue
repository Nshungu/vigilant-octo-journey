<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>

    <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
      <p class="text-gray-600 mb-8">Start adding products you love to your wishlist!</p>
      <RouterLink to="/products" class="btn-primary">
        Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in wishlistStore.items"
        :key="item.id"
        class="card group overflow-hidden"
      >
        <div class="relative">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          <!-- Remove Button -->
          <button
            @click="removeFromWishlist(item.id)"
            class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-200"
            aria-label="Remove from wishlist"
          >
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="p-4">
          <div class="mb-2">
            <span class="text-xs text-gray-500 uppercase tracking-wide">
              {{ item.category }}
            </span>
          </div>
          
          <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {{ item.title }}
          </h3>

          <!-- Rating -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              <template v-for="star in 5" :key="star">
                <svg
                  class="w-4 h-4"
                  :class="star <= Math.round(item.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
            <span class="text-xs text-gray-500 ml-2">
              ({{ item.rating?.count || 0 }})
            </span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-2xl font-bold text-kigali-blue">
                ${{ item.price.toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-2">
            <button
              @click="moveToCart(item)"
              class="w-full btn-primary flex items-center justify-center space-x-2"
              :disabled="isInCart(item.id)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>{{ isInCart(item.id) ? 'In Cart' : 'Add to Cart' }}</span>
            </button>
            
            <RouterLink
              :to="{ name: 'ProductDetail', params: { id: item.id } }"
              class="w-full btn-outline text-center block"
            >
              View Details
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const isInCart = (productId) => {
  return cartStore.isInCart(productId)
}

const removeFromWishlist = (productId) => {
  wishlistStore.removeItem(productId)
}

const moveToCart = (item) => {
  wishlistStore.moveToCart(item, cartStore)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
