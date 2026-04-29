<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
      <p class="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
      <RouterLink to="/products" class="btn-primary">
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 border-b">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">Cart Items ({{ cartStore.itemCount }})</h2>
              <button
                @click="clearCart"
                class="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div class="divide-y">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="w-20 h-20 object-cover rounded-lg"
              />

              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 mb-1">{{ item.title }}</h3>
                <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center space-x-2">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="p-1 rounded hover:bg-gray-200 transition-colors"
                  :disabled="item.quantity <= 1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <input
                  :value="item.quantity"
                  @input="updateQuantity(item.id, parseInt($event.target.value) || 1)"
                  type="number"
                  min="1"
                  class="w-16 text-center border border-gray-300 rounded px-2 py-1"
                />
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <!-- Item Total -->
              <div class="text-right">
                <p class="font-semibold text-lg">${{ (item.price * item.quantity).toFixed(2) }}</p>
                <button
                  @click="removeItem(item.id)"
                  class="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h2 class="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">${{ cartStore.total.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax (18%)</span>
              <span class="font-medium">${{ cartStore.tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">
                {{ cartStore.shipping === 0 ? 'FREE' : `$${cartStore.shipping.toFixed(2)}` }}
              </span>
            </div>
            <div class="border-t pt-4">
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-kigali-blue">${{ cartStore.grandTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Promo Code -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Promo Code
            </label>
            <div class="flex space-x-2">
              <input
                v-model="promoCode"
                type="text"
                placeholder="Enter code"
                class="flex-1 input-field text-sm"
              />
              <button
                @click="applyPromoCode"
                class="btn-secondary text-sm px-4 py-2"
              >
                Apply
              </button>
            </div>
            <p v-if="promoMessage" class="text-sm mt-2" :class="promoError ? 'text-red-500' : 'text-green-600'">
              {{ promoMessage }}
            </p>
          </div>

          <!-- Checkout Button -->
          <RouterLink
            to="/checkout"
            class="w-full btn-primary text-center block py-3"
          >
            Proceed to Checkout
          </RouterLink>

          <!-- Continue Shopping -->
          <RouterLink
            to="/products"
            class="w-full btn-outline text-center block mt-3 py-3"
          >
            Continue Shopping
          </RouterLink>

          <!-- Security Badge -->
          <div class="mt-6 text-center">
            <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommended Products -->
    <section v-if="cartStore.items.length > 0" class="mt-16">
      <h2 class="text-2xl font-bold mb-8">You might also like</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in recommendedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/product/ProductCard.vue'

const cartStore = useCartStore()
const productsStore = useProductsStore()
const router = useRouter()

const promoCode = ref('')
const promoMessage = ref('')
const promoError = ref(false)

const recommendedProducts = computed(() => {
  // Get random products that aren't in cart
  const cartItemIds = cartStore.items.map(item => item.id)
  const availableProducts = productsStore.products.filter(product => 
    !cartItemIds.includes(product.id)
  )
  return availableProducts.slice(0, 4).sort(() => Math.random() - 0.5)
})

const updateQuantity = (productId, quantity) => {
  if (quantity < 1) return
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart()
  }
}

const applyPromoCode = () => {
  promoError.value = false
  
  if (!promoCode.value.trim()) {
    promoError.value = true
    promoMessage.value = 'Please enter a promo code'
    return
  }

  // Mock promo codes
  const promoCodes = {
    'SAVE10': { discount: 0.1, message: '10% discount applied!' },
    'SAVE20': { discount: 0.2, message: '20% discount applied!' },
    'FREESHIP': { discount: 'shipping', message: 'Free shipping applied!' },
    'WELCOME': { discount: 0.15, message: '15% discount applied!' }
  }

  const promo = promoCodes[promoCode.value.toUpperCase()]
  
  if (promo) {
    promoError.value = false
    promoMessage.value = promo.message
    // In a real app, you would apply the discount to the cart
  } else {
    promoError.value = true
    promoMessage.value = 'Invalid promo code'
  }
}

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})
</script>
