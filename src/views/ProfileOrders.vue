<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

    <div v-if="orders.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">No orders yet</h2>
      <p class="text-gray-600 mb-8">Once you place an order, it will appear here.</p>
      <RouterLink to="/products" class="btn-primary">
        Start Shopping
      </RouterLink>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold">Order #{{ order.id }}</h3>
            <p class="text-sm text-gray-500">
              {{ formatDate(order.date) }}
            </p>
          </div>
          <div class="text-right">
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="getStatusClass(order.status)"
            >
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="border-t border-b py-4 mb-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Shipping Address</h4>
              <p class="text-sm text-gray-600">
                {{ order.shippingInfo.firstName }} {{ order.shippingInfo.lastName }}<br>
                {{ order.shippingInfo.address }}<br>
                {{ order.shippingInfo.city }}, {{ order.shippingInfo.district }}<br>
                {{ order.shippingInfo.phone }}
              </p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Order Details</h4>
              <p class="text-sm text-gray-600">
                Delivery: {{ order.deliveryMethod }}<br>
                Payment: {{ order.paymentMethod }}<br>
                Items: {{ order.items.length }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="space-y-3 mb-4">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center space-x-4"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-16 h-16 object-cover rounded"
            />
            <div class="flex-1">
              <h4 class="font-medium text-sm">{{ item.title }}</h4>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <div class="text-sm font-semibold">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <!-- Order Total -->
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-600">Subtotal: ${{ order.subtotal.toFixed(2) }}</p>
            <p class="text-sm text-gray-600">Tax: ${{ order.tax.toFixed(2) }}</p>
            <p class="text-sm text-gray-600">Shipping: ${{ order.shipping.toFixed(2) }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-semibold text-kigali-blue">
              ${{ order.total.toFixed(2) }}
            </p>
            <button class="text-sm text-kigali-blue hover:text-blue-700 mt-2">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  // Load orders from localStorage
  orders.value = JSON.parse(localStorage.getItem('user_orders') || '[]')
})
</script>
