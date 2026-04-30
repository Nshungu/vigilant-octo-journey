// Simple Node.js server for Stripe payment processing
// This is for demonstration purposes - in production, use a proper backend framework

import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

// Direct Stripe key configuration (temporary fix for environment loading issue)
// Replace with your actual Stripe secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key_here';
console.log('Stripe Secret Key configured');

const stripe = Stripe(stripeSecretKey);

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('Received payment request:', req.body);
    const { amount, currency = 'usd', customerEmail, shippingInfo } = req.body;
    
    if (!amount || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields: amount and customerEmail' });
    }

    console.log('Creating payment intent with amount:', amount, 'currency:', currency);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      payment_method_types: ['card'],
      receipt_email: customerEmail,
      shipping: shippingInfo ? {
        address: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.district,
          postal_code: shippingInfo.postalCode,
          country: 'RW'
        },
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`
      } : undefined,
      metadata: {
        integration_check: 'accept_a_payment',
        customer_email: customerEmail || '',
        shipping_city: shippingInfo?.city || 'Kigali',
        shipping_country: 'Rwanda'
      }
    });

    console.log('Payment intent created successfully:', paymentIntent.id);

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    });
    res.status(500).send({ error: error.message });
  }
});

// Confirm payment endpoint
app.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Retrieve the payment intent to confirm status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.send({
      status: paymentIntent.status,
      paymentIntent: paymentIntent
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).send({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Stripe payment endpoint: http://localhost:${PORT}/create-payment-intent`);
});
