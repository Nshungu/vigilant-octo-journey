import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const featuredProducts = computed(() => 
    products.value.slice(0, 8).sort(() => Math.random() - 0.5)
  )
  
  const getProductsByCategory = computed(() => (category) => {
    if (!category) return products.value
    return products.value.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  })
  
  const getProductById = computed(() => (id) => {
    return products.value.find(product => product.id === parseInt(id))
  })
  
  const fetchProducts = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Fetching products from Fake Store API...')
      const response = await axios.get('https://fakestoreapi.com/products', { timeout: 5000 })
      products.value = response.data.map(product => ({
        ...product,
        image: product.image,
        rating: product.rating || { rate: 4, count: 100 }
      }))
      console.log('Products fetched successfully:', products.value.length, 'items')
    } catch (err) {
      error.value = 'Failed to fetch products. Please try again.'
      console.error('Error fetching products:', err)
      console.log('Using fallback products due to API error')
      // Fallback products if API fails
      products.value = [
        {
          id: 1,
          title: 'Laptop Pro',
          price: 999.99,
          category: 'electronics',
          description: 'High-performance laptop for professionals',
          image: 'https://picsum.photos/seed/laptop/300/300',
          rating: { rate: 4.5, count: 128 }
        },
        {
          id: 2,
          title: 'Wireless Headphones',
          price: 79.99,
          category: 'electronics',
          description: 'Premium noise-cancelling wireless headphones',
          image: 'https://picsum.photos/seed/headphones/300/300',
          rating: { rate: 4.3, count: 89 }
        },
        {
          id: 3,
          title: 'Smart Watch',
          price: 299.99,
          category: 'electronics',
          description: 'Advanced fitness and health tracking smartwatch',
          image: 'https://picsum.photos/seed/watch/300/300',
          rating: { rate: 4.6, count: 156 }
        },
        {
          id: 4,
          title: 'Designer Sunglasses',
          price: 149.99,
          category: 'jewelery',
          description: 'Stylish designer sunglasses with UV protection',
          image: 'https://picsum.photos/seed/sunglasses/300/300',
          rating: { rate: 4.2, count: 67 }
        },
        {
          id: 5,
          title: 'Leather Wallet',
          price: 49.99,
          category: 'jewelery',
          description: 'Genuine leather bifold wallet',
          image: 'https://picsum.photos/seed/wallet/300/300',
          rating: { rate: 4.4, count: 93 }
        }
      ]
    } finally {
      loading.value = false
    }
  }
  
  const fetchCategories = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Fetching categories from Fake Store API...')
      const response = await axios.get('https://fakestoreapi.com/products/categories', { timeout: 5000 })
      console.log('Categories fetched successfully:', response.data)
      categories.value = response.data
    } catch (err) {
      error.value = null // Don't show error for categories, just use fallback
      console.error('Error fetching categories:', err)
      console.log('Using fallback categories due to API error')
      // Fallback categories if API fails
      categories.value = ['electronics', 'jewelery', "men's clothing", "women's clothing"]
    } finally {
      loading.value = false
    }
  }

  const initializeStore = async () => {
    await Promise.all([
      fetchProducts(),
      fetchCategories()
    ])
  }
  
  const searchProducts = (query) => {
    if (!query) return products.value
    const searchTerm = query.toLowerCase()
    return products.value.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    )
  }
  
  const filterProducts = (filters) => {
    let filtered = products.value
    
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      )
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= filters.minPrice)
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice)
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    }
    
    return filtered
  }
  
  return {
    products,
    categories,
    loading,
    error,
    featuredProducts,
    getProductsByCategory,
    getProductById,
    fetchProducts,
    fetchCategories,
    initializeStore,
    searchProducts,
    filterProducts
  }
})
