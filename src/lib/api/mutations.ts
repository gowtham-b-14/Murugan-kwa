import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!, $size: String, $color: String) {
    addToCart(productId: $productId, quantity: $quantity, size: $size, color: $color) {
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
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId) {
      items {
        id
        quantity
      }
      total
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($itemId: ID!, $quantity: Int!) {
    updateCartItem(itemId: $itemId, quantity: $quantity) {
      items {
        id
        quantity
      }
      total
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($productId: ID!, $rating: Int!, $comment: String!, $images: [String!]) {
    createReview(productId: $productId, rating: $rating, comment: $comment, images: $images) {
      id
      productId
      rating
      comment
      createdAt
    }
  }
`;

export const MARK_REVIEW_HELPFUL = gql`
  mutation MarkReviewHelpful($reviewId: ID!) {
    markReviewHelpful(reviewId: $reviewId) {
      id
      helpful
    }
  }
`;
