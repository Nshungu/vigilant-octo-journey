# Kigali Tech Store

A full-featured e-commerce Single Page Application (SPA) built with Vue 3, designed for the Kigali, Rwanda market. This project demonstrates modern web development practices including state management, routing, payment integration, and responsive design.

## 🚀 Features

### Core Features
- **Product Catalog**: Dynamic product listing from Fake Store API
- **Shopping Cart**: Add/remove items, quantity management, price calculations
- **Wishlist**: Save favorite products with heart icon toggles
- **User Authentication**: Login/Register with mock JWT authentication
- **Product Search & Filtering**: Search by name, filter by category and price
- **Product Details**: Detailed product pages with reviews and ratings
- **Checkout Process**: Multi-step checkout with address forms and payment options
- **Order Management**: View order history and track orders
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Technical Features
- **Vue 3 Composition API**: Modern Vue.js with script setup syntax
- **Vue Router 4**: Client-side routing with navigation guards
- **Pinia State Management**: Centralized state for cart, wishlist, auth, and products
- **Tailwind CSS**: Utility-first CSS framework with custom Kigali theme
- **Axios**: HTTP client for API requests
- **LocalStorage**: Data persistence for cart, wishlist, and auth
- **Lazy Loading**: Performance optimization with route-level code splitting

## 🛠️ Tech Stack

- **Frontend**: Vue 3, Vue Router 4, Pinia
- **Styling**: Tailwind CSS with custom Rwanda-themed colors
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm
- **API**: Fake Store API (https://fakestoreapi.com)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kigali-tech-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 🎨 Design System

### Color Palette (Kigali Theme)
- **Kigali Blue**: `#0051ba` (Primary)
- **Kigali Yellow**: `#fcd116` (Accent)
- **Kigali Green**: `#00a651` (Success)
- **Kigali Light**: `#f8f9fa` (Background)
- **Kigali Dark**: `#212529` (Text)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weight (600-700)
- **Body Text**: Regular weight (400)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🏗️ Project Structure

```
src/
├── assets/
│   └── css/
│       └── main.css          # Tailwind CSS imports
├── components/
│   ├── layout/
│   │   ├── Header.vue        # Navigation header
│   │   └── Footer.vue        # Site footer
│   ├── product/
│   │   └── ProductCard.vue   # Product card component
│   └── ui/
│       ├── LoadingSpinner.vue # Loading indicator
│       └── ToastNotification.vue # Notification system
├── router/
│   └── index.js             # Vue Router configuration
├── stores/
│   ├── auth.js              # Authentication state
│   ├── cart.js              # Shopping cart state
│   ├── products.js          # Products state
│   └── wishlist.js          # Wishlist state
├── views/
│   ├── Home.vue             # Homepage
│   ├── ProductsLayout.vue    # Products layout
│   ├── ProductsList.vue     # Product listing
│   ├── ProductDetail.vue    # Product details
│   ├── Cart.vue            # Shopping cart
│   ├── Wishlist.vue        # Wishlist page
│   ├── Login.vue           # Login page
│   ├── Register.vue        # Registration page
│   ├── Checkout.vue        # Checkout process
│   ├── ProfileLayout.vue   # Profile layout
│   ├── ProfileOrders.vue   # Order history
│   ├── ProfileWishlist.vue # Profile wishlist
│   ├── OrderSuccess.vue   # Order confirmation
│   └── NotFound.vue       # 404 page
├── App.vue                # Root component
└── main.js               # Application entry point
```

## 🔐 Authentication

The application uses mock JWT authentication:

### Login Credentials
- **Email**: Any valid email format
- **Password**: Any password (mock validation)

### Auth Flow
1. User enters credentials
2. Mock JWT token is generated
3. Token stored in localStorage
4. User state persisted in Pinia store
5. Protected routes require authentication

## 🛒 Shopping Cart Features

- **Add to Cart**: From product pages and listings
- **Quantity Management**: Increase/decrease item quantities
- **Remove Items**: Remove individual items or clear cart
- **Price Calculations**: Subtotal, tax (18%), shipping, and total
- **Persistence**: Cart data saved to localStorage
- **Promo Codes**: Mock discount system (SAVE10, SAVE20, etc.)

## 💳 Payment Integration

### Payment Methods
- **Credit/Debit Cards**: Mock card input validation
- **Mobile Money**: MTN Mobile Money, Airtel Money
- **Cash on Delivery**: Pay upon receipt

### Security
- Input validation for all payment fields
- Secure checkout flow
- Order confirmation and tracking

## 📊 State Management

### Pinia Stores

#### Auth Store
- User authentication state
- Login/logout functionality
- Token management

#### Cart Store
- Shopping cart items
- Price calculations
- LocalStorage persistence

#### Products Store
- Product data from API
- Categories management
- Search and filtering

#### Wishlist Store
- Saved products
- Toggle functionality
- Move to cart features

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel Deployment
1. Connect repository to Vercel
2. Vercel will automatically detect and build the Vue app
3. Configure environment variables if needed

## 🔧 Configuration

### Environment Variables
Create `.env.local` for local development:
```
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51TRBqfR6VA7TUWKkWHLPcuiHDHuyfStewDGSDHQIVsQC6m3RAnkqBp2kRNNNztynGVFi94icnQ3XNSa6B46ltUsW00YpXB2cLf
```

### Stripe Payment Integration

The application includes Stripe payment processing with the following features:

#### Setup
1. **Install dependencies**: Already included in package.json
2. **Environment variables**: Copy from `.env.example` to `.env.local`
3. **Backend server**: Run the payment server for real Stripe processing

#### Running with Payment Server
```bash
# Install additional dependencies
npm install express cors stripe concurrently

# Run both frontend and backend
npm run start:full
```

#### Payment Methods
- **Credit/Debit Cards**: Real Stripe integration with test cards
- **Mobile Money**: MTN Mobile Money & Airtel Money (mock implementation)
- **Cash on Delivery**: Pay upon receipt

#### Test Cards for Stripe
Use these test cards for testing:
- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## 🧪 Testing

The project includes:
- Component-based testing structure
- Mock API responses
- User interaction testing

## 📈 Performance Optimizations

- **Lazy Loading**: Route-level code splitting
- **Image Optimization**: Lazy loading for product images
- **State Persistence**: Efficient localStorage usage
- **Component Caching**: Vue's built-in reactivity system

## 🌐 Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Email: info@kigalitech.rw
- Phone: +250 788 123 456
- Address: KN 4 Ave, Kigali, Rwanda

## 🎯 Future Enhancements

- **Admin Dashboard**: Product and order management
- **Real-time Notifications**: WebSocket integration
- **PWA Support**: Offline functionality
- **Multi-language**: English/Kinyarwanda support
- **Advanced Search**: Full-text search with filters
- **Product Reviews**: User-generated reviews and ratings
- **Order Tracking**: Real-time order status updates

---

**Built with ❤️ for the Kigali tech community**
