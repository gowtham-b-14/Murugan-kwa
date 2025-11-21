# API Integration Guide

This document describes the GraphQL API that the mobile app expects from the backend.

## Backend Requirements

- Node.js with Apollo GraphQL Server
- GraphQL endpoint accessible via HTTP/HTTPS
- Support for queries and mutations listed below

## Configuration

Set the GraphQL endpoint in your `.env` file:

```env
EXPO_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## Type Definitions

### Core Types

```graphql
type Product {
  id: ID!
  name: String!
  description: String!
  price: Float!
  currency: String!
  images: [String!]!
  category: String!
  subcategory: String
  rating: Float!
  reviewCount: Int!
  inStock: Boolean!
  sku: String!
  brand: String
  sizes: [String!]
  colors: [String!]
  specifications: JSON
}

type Review {
  id: ID!
  productId: ID!
  userId: ID!
  userName: String!
  rating: Int!
  comment: String!
  createdAt: String!
  helpful: Int!
  images: [String!]
}

type CartItem {
  id: ID!
  product: Product!
  quantity: Int!
  selectedSize: String
  selectedColor: String
}

type Cart {
  items: [CartItem!]!
  subtotal: Float!
  tax: Float!
  shipping: Float!
  total: Float!
}

type Category {
  id: ID!
  name: String!
  slug: String!
  image: String
  subcategories: [Category!]
}

type PaginationInfo {
  page: Int!
  limit: Int!
  total: Int!
  hasMore: Boolean!
}

type ProductListResponse {
  products: [Product!]!
  pagination: PaginationInfo!
}

type ReviewListResponse {
  reviews: [Review!]!
  pagination: PaginationInfo!
}
```

### Input Types

```graphql
input ProductFilter {
  category: String
  priceRange: PriceRangeInput
  brands: [String!]
  colors: [String!]
  sizes: [String!]
  rating: Int
  inStock: Boolean
}

input PriceRangeInput {
  min: Float!
  max: Float!
}

enum SortBy {
  PRICE_ASC
  PRICE_DESC
  RATING
  NEWEST
  POPULAR
}
```

## Queries

### 1. Get Products (with filtering, sorting, pagination)

```graphql
query GetProducts(
  $filter: ProductFilter
  $sortBy: SortBy
  $page: Int
  $limit: Int
) {
  products(
    filter: $filter
    sortBy: $sortBy
    page: $page
    limit: $limit
  ) {
    products {
      id
      name
      description
      price
      currency
      images
      category
      subcategory
      rating
      reviewCount
      inStock
      sku
      brand
    }
    pagination {
      page
      limit
      total
      hasMore
    }
  }
}
```

**Example Variables:**
```json
{
  "filter": {
    "category": "Electronics",
    "inStock": true,
    "priceRange": {
      "min": 0,
      "max": 1000
    }
  },
  "sortBy": "PRICE_ASC",
  "page": 1,
  "limit": 20
}
```

### 2. Get Product by ID

```graphql
query GetProductById($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    currency
    images
    category
    subcategory
    rating
    reviewCount
    inStock
    sku
    brand
    sizes
    colors
    specifications
  }
}
```

### 3. Get Product Reviews

```graphql
query GetProductReviews($productId: ID!, $page: Int, $limit: Int) {
  reviews(productId: $productId, page: $page, limit: $limit) {
    reviews {
      id
      productId
      userId
      userName
      rating
      comment
      createdAt
      helpful
      images
    }
    pagination {
      page
      limit
      total
      hasMore
    }
  }
}
```

### 4. Get Categories

```graphql
query GetCategories {
  categories {
    id
    name
    slug
    image
    subcategories {
      id
      name
      slug
      image
    }
  }
}
```

### 5. Get Featured Products

```graphql
query GetFeaturedProducts($limit: Int) {
  featuredProducts(limit: $limit) {
    id
    name
    description
    price
    currency
    images
    category
    rating
    reviewCount
    inStock
  }
}
```

### 6. Get Cart

```graphql
query GetCart {
  cart {
    items {
      id
      product {
        id
        name
        price
        currency
        images
        inStock
      }
      quantity
      selectedSize
      selectedColor
    }
    subtotal
    tax
    shipping
    total
  }
}
```

## Mutations

### 1. Add to Cart

```graphql
mutation AddToCart(
  $productId: ID!
  $quantity: Int!
  $size: String
  $color: String
) {
  addToCart(
    productId: $productId
    quantity: $quantity
    size: $size
    color: $color
  ) {
    items {
      id
      product {
        id
        name
        price
        currency
        images
      }
      quantity
      selectedSize
      selectedColor
    }
    total
  }
}
```

**Example Variables:**
```json
{
  "productId": "123",
  "quantity": 2,
  "size": "M",
  "color": "Blue"
}
```

### 2. Remove from Cart

```graphql
mutation RemoveFromCart($itemId: ID!) {
  removeFromCart(itemId: $itemId) {
    items {
      id
      quantity
    }
    total
  }
}
```

### 3. Update Cart Item

```graphql
mutation UpdateCartItem($itemId: ID!, $quantity: Int!) {
  updateCartItem(itemId: $itemId, quantity: $quantity) {
    items {
      id
      quantity
    }
    total
  }
}
```

### 4. Create Review

```graphql
mutation CreateReview(
  $productId: ID!
  $rating: Int!
  $comment: String!
  $images: [String!]
) {
  createReview(
    productId: $productId
    rating: $rating
    comment: $comment
    images: $images
  ) {
    id
    productId
    rating
    comment
    createdAt
  }
}
```

**Example Variables:**
```json
{
  "productId": "123",
  "rating": 5,
  "comment": "Great product!",
  "images": ["https://example.com/review-image.jpg"]
}
```

### 5. Mark Review as Helpful

```graphql
mutation MarkReviewHelpful($reviewId: ID!) {
  markReviewHelpful(reviewId: $reviewId) {
    id
    helpful
  }
}
```

## Sample Backend Implementation (Node.js + Apollo)

### Server Setup

```javascript
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `
  # Copy type definitions from above
`;

const resolvers = {
  Query: {
    products: async (_, { filter, sortBy, page = 1, limit = 20 }) => {
      // Implement your database query here
      // Return { products: [...], pagination: {...} }
    },
    product: async (_, { id }) => {
      // Fetch single product by ID
    },
    reviews: async (_, { productId, page = 1, limit = 10 }) => {
      // Fetch reviews for product
    },
    categories: async () => {
      // Fetch all categories
    },
    featuredProducts: async (_, { limit = 10 }) => {
      // Fetch featured products
    },
    cart: async (_, __, { userId }) => {
      // Fetch user's cart
    },
  },
  Mutation: {
    addToCart: async (_, { productId, quantity, size, color }, { userId }) => {
      // Add item to cart
    },
    removeFromCart: async (_, { itemId }, { userId }) => {
      // Remove item from cart
    },
    updateCartItem: async (_, { itemId, quantity }, { userId }) => {
      // Update cart item quantity
    },
    createReview: async (_, { productId, rating, comment, images }, { userId }) => {
      // Create new review
    },
    markReviewHelpful: async (_, { reviewId }, { userId }) => {
      // Increment helpful count
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    // Get user from authentication header
    return { userId: req.headers.authorization };
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## Testing the API

### Using Apollo Studio

1. Navigate to your GraphQL endpoint in Apollo Studio
2. Use the queries and mutations provided above
3. Test with sample data

### Using cURL

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { products(page: 1, limit: 10) { products { id name price } } }"
  }'
```

### Using Postman

1. Create a new POST request to your GraphQL endpoint
2. Set body to GraphQL
3. Paste query and variables

## Error Handling

The backend should return errors in the standard GraphQL format:

```json
{
  "errors": [
    {
      "message": "Product not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

## Authentication

If your app requires authentication:

1. Send JWT token in Authorization header
2. Extract user ID in context
3. Use user ID in resolvers

```javascript
context: async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = verifyToken(token);
  return { userId };
}
```

## Performance Tips

1. **Implement DataLoader** for N+1 query prevention
2. **Add database indexes** on frequently queried fields
3. **Use pagination** for all list queries
4. **Implement caching** with Redis or similar
5. **Add query complexity limits** to prevent abuse

## Security

1. **Rate limiting** on mutations
2. **Input validation** for all fields
3. **SQL injection prevention** (use parameterized queries)
4. **Authorization checks** in resolvers
5. **CORS configuration** for production

## Next Steps

1. Implement the GraphQL schema on your backend
2. Connect to your database (PostgreSQL, MongoDB, etc.)
3. Test all queries and mutations
4. Update the `EXPO_PUBLIC_GRAPHQL_ENDPOINT` in your `.env` file
5. Run the mobile app and verify integration
