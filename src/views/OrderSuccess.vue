<template>
  <div class="min-h-screen bg-kigali-light flex items-center justify-center py-12 px-4">
    <div class="max-w-2xl w-full">
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
        <p class="text-lg text-gray-600 mb-8">
          Thank you for your order. We've received your order and will begin processing it right away.
        </p>

        <!-- Order Details -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 class="text-lg font-semibold mb-4">Order Details</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Order Number:</span>
              <span class="font-medium">#{{ orderId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Order Date:</span>
              <span class="font-medium">{{ formatDate(new Date()) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Email:</span>
              <span class="font-medium">{{ authStore.user?.email }}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-4">What's Next?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-kigali-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 class="font-medium">Order Confirmation</h3>
                <p class="text-sm text-gray-600">You'll receive an email confirmation shortly.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-kigali-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 class="font-medium">Processing</h3>
                <p class="text-sm text-gray-600">We'll prepare your items for shipping.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-kigali-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 class="font-medium">Delivery</h3>
                <p class="text-sm text-gray-600">Your order will be delivered to your address.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/profile/orders" class="btn-primary">
            View Order History
          </RouterLink>
          <RouterLink to="/products" class="btn-outline">
            Continue Shopping
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const orderId = computed(() => route.query.orderId || 'N/A')

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  // Initialize auth state
  authStore.initializeAuth()
})
</script>
