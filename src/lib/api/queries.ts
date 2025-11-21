import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilter, $sortBy: SortBy, $page: Int, $limit: Int) {
    products(filter: $filter, sortBy: $sortBy, page: $page, limit: $limit) {
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
`;

export const GET_PRODUCT_BY_ID = gql`
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
`;

export const GET_PRODUCT_REVIEWS = gql`
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
`;

export const GET_CATEGORIES = gql`
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
`;

export const GET_FEATURED_PRODUCTS = gql`
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
`;

export const GET_CART = gql`
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
`;
