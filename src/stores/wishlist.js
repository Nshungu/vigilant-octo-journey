import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(JSON.parse(localStorage.getItem('wishlist_items')) || [])
  
  const itemCount = computed(() => items.value.length)
  
  const addItem = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (!existingItem) {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating
      })
      saveToLocalStorage()
    }
  }
  
  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }
  
  const toggleItem = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }
  
  const clearWishlist = () => {
    items.value = []
    saveToLocalStorage()
  }
  
  const saveToLocalStorage = () => {
    localStorage.setItem('wishlist_items', JSON.stringify(items.value))
  }
  
  const isInWishlist = (productId) => {
    return items.value.some(item => item.id === productId)
  }
  
  const moveToCart = (product, cartStore) => {
    cartStore.addItem(product)
    removeItem(product.id)
  }
  
  const moveAllToCart = (cartStore) => {
    items.value.forEach(item => {
      cartStore.addItem(item)
    })
    clearWishlist()
  }
  
  return {
    items,
    itemCount,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    moveToCart,
    moveAllToCart
  }
})
