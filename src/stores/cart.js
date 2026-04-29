import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart_items')) || [])
  
  const itemCount = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )
  
  const tax = computed(() => total.value * 0.18) // 18% VAT for Rwanda
  const shipping = computed(() => total.value > 100 ? 0 : 10) // Free shipping over $100
  const grandTotal = computed(() => total.value + tax.value + shipping.value)
  
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
    }
    
    saveToLocalStorage()
  }
  
  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }
  
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        saveToLocalStorage()
      }
    }
  }
  
  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }
  
  const saveToLocalStorage = () => {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }
  
  const isInCart = (productId) => {
    return items.value.some(item => item.id === productId)
  }
  
  const getItemQuantity = (productId) => {
    const item = items.value.find(item => item.id === productId)
    return item ? item.quantity : 0
  }
  
  return {
    items,
    itemCount,
    total,
    tax,
    shipping,
    grandTotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }
})
