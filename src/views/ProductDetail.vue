<template>
  <div v-if="product" class="bg-white rounded-lg shadow-md p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div>
        <div class="mb-4">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(image, index) in [product.image]"
            :key="index"
            class="border-2 border-transparent rounded cursor-pointer hover:border-kigali-blue transition-colors"
          >
            <img
              :src="image"
              :alt="`${product.title} ${index + 1}`"
              class="w-full h-20 object-cover rounded"
            />
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <div class="mb-2">
          <span class="text-sm text-gray-500 uppercase tracking-wide">
            {{ product.category }}
          </span>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ product.title }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center mb-4">
          <div class="flex items-center">
            <template v-for="star in 5" :key="star">
              <svg
                class="w-5 h-5"
                :class="star <= Math.round(product.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </template>
          </div>
          <span class="text-sm text-gray-500 ml-2">
            {{ product.rating?.rate || 0 }} ({{ product.rating?.count || 0 }} reviews)
          </span>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-kigali-blue">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Product Actions -->
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700">Quantity:</label>
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button
                @click="quantity > 1 && quantity--"
                class="px-3 py-2 hover:bg-gray-100 transition-colors"
                :disabled="quantity <= 1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                class="w-16 text-center border-0 focus:ring-0"
              />
              <button
                @click="quantity++"
                class="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex space-x-4">
            <button
              @click="addToCart"
              class="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Add to Cart</span>
            </button>
            <button
              @click="toggleWishlist"
              class="px-4 py-2 border-2 rounded-lg transition-colors"
              :class="isInWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Product Features -->
        <div class="mt-8 pt-8 border-t">
          <h3 class="text-lg font-semibold mb-4">Product Features</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-kigali-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-gray-600">12 Month Warranty</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-kigali-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-gray-600">Free Delivery</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-kigali-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-gray-600">Authentic Products</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-kigali-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-gray-600">Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Reviews Section -->
    <div class="mt-12 pt-8 border-t">
      <h2 class="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="text-3xl font-bold mr-4">{{ product.rating?.rate || 0 }}</div>
            <div>
              <div class="flex items-center mb-1">
                <template v-for="star in 5" :key="star">
                  <svg
                    class="w-5 h-5"
                    :class="star <= Math.round(product.rating?.rate || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </template>
              </div>
              <p class="text-sm text-gray-500">{{ product.rating?.count || 0 }} reviews</p>
            </div>
          </div>
          <button class="btn-primary">Write a Review</button>
        </div>
      </div>

      <!-- Sample Reviews -->
      <div class="space-y-6">
        <div class="border-b pb-6">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <h4 class="font-semibold">John Doe</h4>
                <div class="flex items-center">
                  <template v-for="star in 5" :key="star">
                    <svg
                      class="w-4 h-4 text-yellow-400 fill-current"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </template>
                  <span class="text-sm text-gray-500 ml-2">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
          <p class="text-gray-600">
            Great product! Exactly as described and works perfectly. Fast delivery to Kigali.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <LoadingSpinner centered text="Loading product..." />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const quantity = ref(1)

const product = computed(() => productsStore.getProductById(route.params.id))
const isInWishlist = computed(() => wishlistStore.isInWishlist(route.params.id))

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
    // Show toast notification would go here
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleItem(product.value)
    // Show toast notification would go here
  }
}

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})
</script>
