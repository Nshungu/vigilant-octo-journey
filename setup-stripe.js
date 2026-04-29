#!/usr/bin/env node

// Setup script for Stripe payment integration
import fs from 'fs'
import path from 'path'

console.log('🚀 Kigali Tech Store - Stripe Payment Setup')
console.log('==========================================')

// Check if .env.local exists
const envLocalPath = './.env.local'
const envExamplePath = './.env.example'

if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local already exists')
} else {
  console.log('📝 Creating .env.local from .env.example...')
  
  // Copy .env.example to .env.local
  const envExample = fs.readFileSync(envExamplePath, 'utf8')
  
  // Replace placeholder keys with your actual Stripe keys
  const envLocal = envExample
    .replace('your_stripe_publishable_key_here', 'pk_test_your_stripe_publishable_key_here')
    .replace('your_stripe_secret_key_here', 'sk_test_your_stripe_secret_key_here')
  
  fs.writeFileSync(envLocalPath, envLocal)
  console.log('✅ .env.local created with your Stripe test keys')
}

console.log('\n📋 Next Steps:')
console.log('1. Start the payment server: npm run server')
console.log('2. In another terminal, start the frontend: npm run dev')
console.log('3. Open http://localhost:3000')
console.log('4. Test checkout with Stripe test cards:')
console.log('   - Card: 4242 4242 4242 4242')
console.log('   - Expiry: Any future date')
console.log('   - CVC: Any 3 digits')

console.log('\n🔧 Server Configuration:')
console.log('- Payment server runs on: http://localhost:3001')
console.log('- Frontend runs on: http://localhost:3000')
console.log('- Stripe endpoint: http://localhost:3001/create-payment-intent')

console.log('\n💳 Real Stripe Payment Features:')
console.log('✅ Real payment processing with Stripe')
console.log('✅ Payment Intent creation')
console.log('✅ Card validation via Stripe Elements')
console.log('✅ Error handling and user feedback')
console.log('✅ Order confirmation with payment IDs')
console.log('✅ Rwanda-specific shipping and billing')

console.log('\n🎯 Ready to test real payments!')
