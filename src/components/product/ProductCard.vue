<template>
  <div class="card group cursor-pointer overflow-hidden">
    <div class="relative">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      
      <!-- Wishlist Heart -->
      <button
        @click.stop="toggleWishlist"
        class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
        :aria-label="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
      >
        <svg
          class="w-5 h-5 transition-colors duration-200"
          :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <!-- Badge for Featured/New -->
      <div v-if="product.featured" class="absolute top-4 left-4 bg-kigali-green text-white px-2 py-1 text-xs font-semibold rounded">
        Featured
      </div>
    </div>

    <div class="p-4">
      <div class="mb-2">
        <span class="text-xs text-gray-500 uppercase tracking-wide">
          {{ product.category }}
        </span>
      </div>
      
      <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-2">
        <div class="flex items-center">
          <template v-for="star in 5" :key="star">
            <svg
              class="w-4 h-4"
              :class="star <= Math.round(product.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </template>
        </div>
        <span class="text-xs text-gray-500 ml-2">
          ({{ product.rating?.count || 0 }})
        </span>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div>
          <span class="text-2xl font-bold text-kigali-blue">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart"
        class="w-full btn-primary flex items-center justify-center space-x-2"
        :disabled="isInCart"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <span>{{ isInCart ? 'In Cart' : 'Add to Cart' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInCart = computed(() => cartStore.isInCart(props.product.id))
const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const addToCart = () => {
  cartStore.addItem(props.product)
  // Show toast notification would go here
}

const toggleWishlist = () => {
  wishlistStore.toggleItem(props.product)
  // Show toast notification would go here
}

const goToProduct = () => {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } })
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
