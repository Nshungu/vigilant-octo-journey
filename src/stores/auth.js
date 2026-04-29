import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token'))
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (email, password) => {
    try {
      // Mock authentication - in real app, call API
      if (email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now()
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: email,
          phone: '+250 788 123 456'
        }
        
        token.value = mockToken
        user.value = mockUser
        localStorage.setItem('auth_token', mockToken)
        localStorage.setItem('user_data', JSON.stringify(mockUser))
        
        return { success: true, user: mockUser }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  const register = async (userData) => {
    try {
      // Mock registration - in real app, call API
      const mockToken = 'mock-jwt-token-' + Date.now()
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }
      
      token.value = mockToken
      user.value = mockUser
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }
  
  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_data')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }
  
  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth
  }
})
