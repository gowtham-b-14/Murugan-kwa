# KnitWell Mobile App

A fully-featured React Native e-commerce mobile application built with Expo, TypeScript, and GraphQL.

## 🏗️ Architecture

This project follows the **Atomic Design Pattern** for component organization:

- **Atoms**: Basic building blocks (Button, Input, Card, Typography, Image)
- **Molecules**: Simple component combinations (ProductCard, SearchBar, Header, Rating, FilterChip)
- **Organisms**: Complex components (ProductList, FilterBar, ProductGallery, Reviews)
- **Pages**: Complete screens (HomePage, ProductListingPage, ProductDetailPage)

## 🚀 Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v6
- **State Management**: React Query (TanStack Query)
- **API Layer**: Apollo GraphQL Client
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   ��   ├── Typography.tsx
│   │   │   ├── Image.tsx
│   │   │   └── index.ts
│   │   ├── molecules/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Rating.tsx
│   │   │   ├── FilterChip.tsx
│   │   │   └── index.ts
│   │   └── organisms/
│   │       ├── ProductList.tsx
│   │       ├── FilterBar.tsx
│   │       ├── ProductGallery.tsx
│   │       ├── Reviews.tsx
│   │       └── index.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductListingPage.tsx
│   │   └── ProductDetailPage.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── lib/
│   │   └── api/
│   │       ├── client.ts
│   │       ├── queries.ts
│   │       └── mutations.ts
│   ├── hooks/
│   │   └── useProducts.ts
│   └── types/
│       └── index.ts
├── App.tsx
├── package.json
└── tsconfig.json
```

## 🎨 Features

### Home Page
- Hero section with search
- Category grid
- Featured products carousel
- Special offers
- Benefits section

### Product Listing Page (PLP)
- Advanced filtering (category, brand, price, stock status)
- Multiple sorting options (price, rating, popularity, newest)
- Search functionality
- Infinite scroll/pagination
- Grid layout with product cards

### Product Detail Page (PDP)
- Image gallery with zoom
- Product information
- Size and color selection
- Quantity selector
- Add to cart
- Reviews and ratings
- Specifications

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd knitwellmobileapp
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your GraphQL endpoint:
```
EXPO_PUBLIC_GRAPHQL_ENDPOINT=http://your-backend-url/graphql
```

### Running the App

```bash
# Start Expo dev server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## 📡 Backend Integration

The app is designed to work with a Node.js Apollo GraphQL backend. The API layer is modular and easy to extend.

### Required GraphQL Schema

The backend should implement the following queries and mutations:

**Queries:**
- `products(filter, sortBy, page, limit)` - Get paginated products
- `product(id)` - Get single product
- `reviews(productId, page, limit)` - Get product reviews
- `categories` - Get all categories
- `featuredProducts(limit)` - Get featured products
- `cart` - Get user's cart

**Mutations:**
- `addToCart(productId, quantity, size, color)` - Add item to cart
- `removeFromCart(itemId)` - Remove item from cart
- `updateCartItem(itemId, quantity)` - Update cart item
- `createReview(productId, rating, comment, images)` - Create review
- `markReviewHelpful(reviewId)` - Mark review as helpful

## 🎯 API Layer

The API layer is built with modularity in mind:

- **Apollo Client**: Configured with error handling and caching
- **React Query**: Wraps GraphQL queries for better state management
- **Custom Hooks**: Easy-to-use hooks for all API operations

Example usage:
```typescript
import { useProducts, useAddToCart } from '../hooks/useProducts';

const MyComponent = () => {
  const { data, isLoading } = useProducts(filter, sortBy, page);
  const addToCart = useAddToCart();
  
  const handleAddToCart = (productId: string) => {
    addToCart.mutate({ productId, quantity: 1 });
  };
};
```

## 🧪 Code Quality

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## 📱 Components

All components are:
- **Fully typed** with TypeScript
- **Accessible** with proper ARIA labels and roles
- **Responsive** to different screen sizes
- **Reusable** and composable
- **Documented** with clear prop interfaces

## 🔐 Environment Variables

- `EXPO_PUBLIC_GRAPHQL_ENDPOINT`: GraphQL API endpoint URL

## 🚧 Future Enhancements

- [ ] Add unit tests with Jest and React Native Testing Library
- [ ] Add Storybook for component documentation
- [ ] Implement authentication flow
- [ ] Add cart functionality
- [ ] Add checkout process
- [ ] Add payment integration
- [ ] Add push notifications
- [ ] Add offline support
- [ ] Add analytics

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines first.

## 📞 Support

For support, email support@knitwell.com or open an issue in the repository.
