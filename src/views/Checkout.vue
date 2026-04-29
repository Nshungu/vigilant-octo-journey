<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
      <p class="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
      <RouterLink to="/products" class="btn-primary">
        Continue Shopping
      </RouterLink>
    </div>

    <form v-else @submit.prevent="processCheckout">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Shipping Information -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <span class="w-8 h-8 bg-kigali-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              Shipping Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  v-model="shippingInfo.firstName"
                  type="text"
                  required
                  class="input-field"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  v-model="shippingInfo.lastName"
                  type="text"
                  required
                  class="input-field"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                v-model="shippingInfo.email"
                type="email"
                required
                class="input-field"
                placeholder="john.doe@example.com"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                v-model="shippingInfo.phone"
                type="tel"
                required
                class="input-field"
                placeholder="+250 7xx xxx xxx"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <input
                v-model="shippingInfo.address"
                type="text"
                required
                class="input-field"
                placeholder="KN 4 Ave, Kigali"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  v-model="shippingInfo.city"
                  type="text"
                  required
                  class="input-field"
                  placeholder="Kigali"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <select v-model="shippingInfo.district" required class="input-field">
                  <option value="">Select District</option>
                  <option value="nyarugenge">Nyarugenge</option>
                  <option value="kicukiro">Kicukiro</option>
                  <option value="gasabo">Gasabo</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  v-model="shippingInfo.postalCode"
                  type="text"
                  class="input-field"
                  placeholder="250"
                />
              </div>
            </div>
          </div>

          <!-- Delivery Method -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <span class="w-8 h-8 bg-kigali-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              Delivery Method
            </h2>

            <div class="space-y-3">
              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="standard"
                  class="mr-3"
                />
                <div class="flex-1">
                  <div class="font-medium">Standard Delivery</div>
                  <div class="text-sm text-gray-500">3-5 business days</div>
                </div>
                <div class="font-semibold">
                  {{ cartStore.shipping === 0 ? 'FREE' : `$${cartStore.shipping.toFixed(2)}` }}
                </div>
              </label>

              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="express"
                  class="mr-3"
                />
                <div class="flex-1">
                  <div class="font-medium">Express Delivery</div>
                  <div class="text-sm text-gray-500">1-2 business days</div>
                </div>
                <div class="font-semibold">$15.00</div>
              </label>

              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="pickup"
                  class="mr-3"
                />
                <div class="flex-1">
                  <div class="font-medium">Store Pickup</div>
                  <div class="text-sm text-gray-500">KN 4 Ave, Kigali</div>
                </div>
                <div class="font-semibold">FREE</div>
              </label>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6 flex items-center">
              <span class="w-8 h-8 bg-kigali-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
              Payment Method
            </h2>

            <div class="space-y-4">
              <!-- Credit Card -->
              <div class="border rounded-lg p-4">
                <div class="flex items-center mb-4">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="card"
                    class="mr-3"
                  />
                  <span class="font-medium">Credit/Debit Card</span>
                  <div class="ml-auto flex space-x-2">
                    <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">VISA</div>
                    <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">MC</div>
                  </div>
                </div>

                <div v-if="paymentMethod === 'card'" class="space-y-4">
                  <div id="card-element" class="p-3 border rounded-lg bg-white">
                    <!-- Stripe Elements will be mounted here -->
                  </div>
                  <div id="card-errors" role="alert" class="text-red-600 text-sm mt-2">
                    <!-- Error messages will appear here -->
                  </div>
                </div>
              </div>

              <!-- Mobile Money -->
              <div class="border rounded-lg p-4">
                <div class="flex items-center">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="mobile"
                    class="mr-3"
                  />
                  <span class="font-medium">Mobile Money</span>
                  <div class="ml-auto flex space-x-2">
                    <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">MTN</div>
                    <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">AIR</div>
                  </div>
                </div>

                <div v-if="paymentMethod === 'mobile'" class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Money Number *
                  </label>
                  <input
                    v-model="mobileMoney.number"
                    type="tel"
                    placeholder="+250 7xx xxx xxx"
                    class="input-field"
                  />
                </div>
              </div>

              <!-- Cash on Delivery -->
              <div class="border rounded-lg p-4">
                <label class="flex items-center">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="cod"
                    class="mr-3"
                  />
                  <div>
                    <div class="font-medium">Cash on Delivery</div>
                    <div class="text-sm text-gray-500">Pay when you receive your order</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-6">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center space-x-4"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-16 h-16 object-cover rounded"
                />
                <div class="flex-1">
                  <h4 class="text-sm font-medium line-clamp-1">{{ item.title }}</h4>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-semibold">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="border-t pt-4 space-y-3">
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
                  {{ getShippingCost() === 0 ? 'FREE' : `$${getShippingCost().toFixed(2)}` }}
                </span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span class="text-kigali-blue">${{ getTotal().toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              type="submit"
              :disabled="processing"
              class="w-full btn-primary py-3 mt-6"
            >
              <span v-if="!processing">Place Order</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </button>

            <!-- Security Badge -->
            <div class="mt-4 text-center">
              <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// Stripe configuration
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here')
let stripe = null
let elements = null
let cardElement = null

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  district: '',
  postalCode: ''
})

const deliveryMethod = ref('standard')
const paymentMethod = ref('card')


const mobileMoney = ref({
  number: ''
})

const processing = ref(false)

const getShippingCost = () => {
  if (deliveryMethod.value === 'pickup') return 0
  if (deliveryMethod.value === 'express') return 15
  return cartStore.shipping
}

const getTotal = () => {
  return cartStore.total + cartStore.tax + getShippingCost()
}

const processCheckout = async () => {
  try {
    processing.value = true

    // Validate form
    if (!validateCheckoutForm()) {
      processing.value = false
      return
    }

    // Process payment based on method
    let paymentResult = { success: false, paymentId: null }

    if (paymentMethod.value === 'card') {
      paymentResult = await processStripePayment()
    } else if (paymentMethod.value === 'mobile') {
      const mobileSuccess = await processMobileMoneyPayment()
      paymentResult = { success: mobileSuccess, paymentId: 'mobile_' + Date.now() }
    } else if (paymentMethod.value === 'cod') {
      paymentResult = { success: true, paymentId: 'cod_' + Date.now() } // Cash on delivery is always successful
    }

    if (!paymentResult.success) {
      processing.value = false
      return
    }

    // Create order
    const order = {
      id: Date.now(),
      items: cartStore.items,
      shippingInfo: shippingInfo.value,
      deliveryMethod: deliveryMethod.value,
      paymentMethod: paymentMethod.value,
      subtotal: cartStore.total,
      tax: cartStore.tax,
      shipping: getShippingCost(),
      total: getTotal(),
      status: paymentMethod.value === 'cod' ? 'confirmed' : 'processing',
      paymentId: paymentResult.paymentId,
      date: new Date().toISOString()
    }

    // Save order to localStorage (in real app, save to backend)
    const orders = JSON.parse(localStorage.getItem('user_orders') || '[]')
    orders.push(order)
    localStorage.setItem('user_orders', JSON.stringify(orders))

    // Clear cart
    cartStore.clearCart()

    // Redirect to success page
    router.push({ 
      name: 'OrderSuccess', 
      query: { orderId: order.id } 
    })

  } catch (error) {
    console.error('Checkout error:', error)
    alert('An error occurred during checkout. Please try again.')
  } finally {
    processing.value = false
  }
}

const validateCheckoutForm = () => {
  // Validate shipping info
  if (!shippingInfo.value.firstName || !shippingInfo.value.lastName || 
      !shippingInfo.value.email || !shippingInfo.value.phone || 
      !shippingInfo.value.address || !shippingInfo.value.city || 
      !shippingInfo.value.district) {
    alert('Please fill in all required shipping information.')
    return false
  }

  // Validate payment info
  if (paymentMethod.value === 'card') {
    if (!cardElement) {
      alert('Please wait for the card form to load.')
      return false
    }
    // Stripe Elements handles its own validation
    // We'll let Stripe handle the validation during payment
  }

  if (paymentMethod.value === 'mobile') {
    if (!mobileMoney.value.number) {
      alert('Please enter your mobile money number.')
      return false
    }
  }

  return true
}

const processStripePayment = async () => {
  try {
    if (!stripe || !elements) {
      throw new Error('Stripe not initialized')
    }

    // Create payment intent on backend
    const response = await axios.post('http://localhost:3002/create-payment-intent', {
      amount: getTotal(),
      currency: 'usd',
      customerEmail: shippingInfo.value.email,
      shippingInfo: shippingInfo.value
    })

    const { clientSecret, paymentIntentId } = response.data

    // Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${shippingInfo.value.firstName} ${shippingInfo.value.lastName}`,
          email: shippingInfo.value.email,
          phone: shippingInfo.value.phone,
          address: {
            line1: shippingInfo.value.address,
            city: shippingInfo.value.city,
            state: shippingInfo.value.district,
            postal_code: shippingInfo.value.postalCode,
            country: 'RW'
          }
        }
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    if (paymentIntent.status === 'succeeded') {
      // Store payment ID for order
      return { success: true, paymentId: paymentIntent.id }
    } else {
      throw new Error('Payment was not successful')
    }

  } catch (error) {
    console.error('Stripe payment error:', error)
    
    // Display error to user
    const errorElement = document.getElementById('card-errors')
    if (errorElement) {
      errorElement.textContent = error.message
    }
    
    return { success: false, error: error.message }
  }
}

const processMobileMoneyPayment = async () => {
  try {
    // Simulate mobile money payment
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Processing mobile money payment:', mobileMoney.value.number)
    
    // In a real app, integrate with MTN Mobile Money or Airtel Money APIs
    return true
  } catch (error) {
    console.error('Mobile money payment error:', error)
    alert('Mobile money payment failed. Please try again.')
    return false
  }
}

const initializeStripe = async () => {
  try {
    stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    elements = stripe.elements({
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#0051ba', // Kigali blue
          colorBackground: '#ffffff',
          colorText: '#212529',
          colorDanger: '#dc3545',
          fontFamily: 'Inter, system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '6px'
        }
      }
    })

    cardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#212529',
          '::placeholder': {
            color: '#6b7280'
          }
        }
      },
      hidePostalCode: false
    })

    cardElement.mount('#card-element')

    // Handle real-time validation errors from the card Element
    cardElement.on('change', ({ error }) => {
      const displayError = document.getElementById('card-errors')
      if (error) {
        displayError.textContent = error.message
      } else {
        displayError.textContent = ''
      }
    })

  } catch (error) {
    console.error('Error initializing Stripe:', error)
    const errorElement = document.getElementById('card-errors')
    if (errorElement) {
      errorElement.textContent = 'Failed to load payment form. Please refresh the page.'
    }
  }
}

onMounted(async () => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: '/checkout' } })
    return
  }

  // Pre-fill user information
  if (authStore.user) {
    shippingInfo.value.firstName = authStore.user.name.split(' ')[0] || ''
    shippingInfo.value.lastName = authStore.user.name.split(' ')[1] || ''
    shippingInfo.value.email = authStore.user.email
    shippingInfo.value.phone = authStore.user.phone
  }

  // Initialize Stripe Elements
  await nextTick()
  if (paymentMethod.value === 'card') {
    initializeStripe()
  }
})

// Watch for payment method changes to initialize/cleanup Stripe Elements
watch(paymentMethod, (newMethod) => {
  if (newMethod === 'card' && !cardElement) {
    nextTick(() => {
      initializeStripe()
    })
  } else if (newMethod !== 'card' && cardElement) {
    // Cleanup Stripe Elements when switching away from card payment
    cardElement.destroy()
    cardElement = null
    elements = null
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
