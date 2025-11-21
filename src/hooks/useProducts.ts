import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '../lib/api/client';
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_REVIEWS,
  GET_FEATURED_PRODUCTS,
  GET_CATEGORIES,
  GET_CART,
} from '../lib/api/queries';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CREATE_REVIEW,
  MARK_REVIEW_HELPFUL,
} from '../lib/api/mutations';
import type { Filter, SortBy, Product, ProductListResponse } from '../types';

export const useProducts = (
  filter?: Filter,
  sortBy?: SortBy,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: ['products', filter, sortBy, page, limit],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: { filter, sortBy, page, limit },
      });
      return data.products as ProductListResponse;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_PRODUCT_BY_ID,
        variables: { id },
      });
      return data.product as Product;
    },
    enabled: !!id,
  });
};

export const useProductReviews = (productId: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['reviews', productId, page, limit],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_PRODUCT_REVIEWS,
        variables: { productId, page, limit },
      });
      return data.reviews;
    },
    enabled: !!productId,
  });
};

export const useFeaturedProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: ['featuredProducts', limit],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_FEATURED_PRODUCTS,
        variables: { limit },
      });
      return data.featuredProducts as Product[];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_CATEGORIES,
      });
      return data.categories;
    },
  });
};

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_CART,
      });
      return data.cart;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      productId: string;
      quantity: number;
      size?: string;
      color?: string;
    }) => {
      const { data } = await apolloClient.mutate({
        mutation: ADD_TO_CART,
        variables,
      });
      return data.addToCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_FROM_CART,
        variables: { itemId },
      });
      return data.removeFromCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: { itemId: string; quantity: number }) => {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CART_ITEM,
        variables,
      });
      return data.updateCartItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      productId: string;
      rating: number;
      comment: string;
      images?: string[];
    }) => {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_REVIEW,
        variables,
      });
      return data.createReview;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
};

export const useMarkReviewHelpful = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await apolloClient.mutate({
        mutation: MARK_REVIEW_HELPFUL,
        variables: { reviewId },
      });
      return data.markReviewHelpful;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
