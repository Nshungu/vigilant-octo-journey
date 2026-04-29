// Simple Node.js server for Stripe payment processing
// This is for demonstration purposes - in production, use a proper backend framework

import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key_here');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', customerEmail, shippingInfo } = req.body;

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

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
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
