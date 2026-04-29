<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        {{ pageTitle }}
      </h1>
      <p class="text-gray-600">
        {{ filteredProducts.length }} products found
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <aside class="lg:w-64 flex-shrink-0">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-4">Filters</h2>
          
          <!-- Search -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search products..."
              class="input-field"
            />
          </div>

          <!-- Categories -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Categories</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="filters.category"
                  type="radio"
                  :value="null"
                  class="mr-2"
                />
                <span class="text-sm">All Categories</span>
              </label>
              <label v-for="category in categories" :key="category" class="flex items-center">
                <input
                  v-model="filters.category"
                  type="radio"
                  :value="category"
                  class="mr-2"
                />
                <span class="text-sm capitalize">{{ category }}</span>
              </label>
            </div>
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
            <div class="space-y-3">
              <input
                v-model.number="filters.minPrice"
                type="number"
                placeholder="Min price"
                class="input-field text-sm"
              />
              <input
                v-model.number="filters.maxPrice"
                type="number"
                placeholder="Max price"
                class="input-field text-sm"
              />
            </div>
          </div>

          <!-- Sort -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select v-model="sortBy" class="input-field">
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>

          <button
            @click="clearFilters"
            class="w-full btn-secondary text-sm"
          >
            Clear Filters
          </button>
        </div>
      </aside>

      <!-- Products Grid -->
      <main class="flex-1">
        <LoadingSpinner v-if="productsStore.loading" centered text="Loading products..." />

        <div v-else-if="productsStore.error" class="text-center py-12">
          <div class="text-red-500 mb-4">{{ productsStore.error }}</div>
          <button @click="loadProducts" class="btn-primary">
            Try Again
          </button>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          <button @click="clearFilters" class="btn-primary">
            Clear Filters
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in sortedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/product/ProductCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const filters = ref({
  search: '',
  category: null,
  minPrice: null,
  maxPrice: null
})

const sortBy = ref('default')

const pageTitle = computed(() => {
  if (route.params.category) {
    return route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1)
  }
  return 'All Products'
})

const categories = computed(() => productsStore.categories)

const filteredProducts = computed(() => {
  let products = productsStore.products

  // Filter by category from route params
  if (route.params.category) {
    products = products.filter(product => 
      product.category.toLowerCase() === route.params.category.toLowerCase()
    )
  }

  // Apply additional filters
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    products = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    )
  }

  if (filters.value.category) {
    products = products.filter(product => 
      product.category.toLowerCase() === filters.value.category.toLowerCase()
    )
  }

  if (filters.value.minPrice !== null) {
    products = products.filter(product => product.price >= filters.value.minPrice)
  }

  if (filters.value.maxPrice !== null) {
    products = products.filter(product => product.price <= filters.value.maxPrice)
  }

  return products
})

const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-low':
      return products.sort((a, b) => a.price - b.price)
    case 'price-high':
      return products.sort((a, b) => b.price - a.price)
    case 'rating':
      return products.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    case 'name':
      return products.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return products
  }
})

const clearFilters = () => {
  filters.value = {
    search: '',
    category: null,
    minPrice: null,
    maxPrice: null
  }
  sortBy.value = 'default'
  
  // Clear URL params
  router.push({ name: 'ProductsList' })
}

const loadProducts = async () => {
  try {
    await productsStore.initializeStore()
  } catch (error) {
    console.error('Error loading products and categories:', error)
  }
}

// Initialize filters from URL query params
onMounted(() => {
  loadProducts()
  
  // Set filters from query params
  if (route.query.search) {
    filters.value.search = route.query.search
  }
  if (route.query.category) {
    filters.value.category = route.query.category
  }
  if (route.query.minPrice) {
    filters.value.minPrice = parseFloat(route.query.minPrice)
  }
  if (route.query.maxPrice) {
    filters.value.maxPrice = parseFloat(route.query.maxPrice)
  }
  if (route.query.sort) {
    sortBy.value = route.query.sort
  }
})

// Update URL when filters change
watch([filters, sortBy], () => {
  const query = {}
  
  if (filters.value.search) query.search = filters.value.search
  if (filters.value.category) query.category = filters.value.category
  if (filters.value.minPrice !== null) query.minPrice = filters.value.minPrice
  if (filters.value.maxPrice !== null) query.maxPrice = filters.value.maxPrice
  if (sortBy.value !== 'default') query.sort = sortBy.value
  
  router.push({ query })
}, { deep: true })
</script>
