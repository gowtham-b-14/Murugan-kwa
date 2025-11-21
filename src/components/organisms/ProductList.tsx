import React from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  ViewStyle,
  ListRenderItem,
} from 'react-native';
import { ProductCard } from '../molecules';
import { Typography } from '../atoms';
import type { Product } from '../../types';

export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onProductPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  numColumns?: number;
  emptyMessage?: string;
  compact?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  refreshing = false,
  onRefresh,
  onLoadMore,
  onProductPress,
  onAddToCart,
  numColumns = 1,
  emptyMessage = 'No products found',
  compact = false,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: '#f9fafb',
  };

  const contentContainerStyle: ViewStyle = {
    padding: 16,
    ...(products.length === 0 && {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }),
  };

  const columnWrapperStyle: ViewStyle | undefined =
    numColumns > 1
      ? {
          justifyContent: 'space-between',
          marginBottom: 16,
        }
      : undefined;

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      onPress={onProductPress}
      onAddToCart={onAddToCart}
      compact={compact || numColumns > 1}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'center', padding: 32 }}>
        <Typography variant="h3" color="muted" align="center">
          {emptyMessage}
        </Typography>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapperStyle}
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0ea5e9"
            />
          ) : undefined
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
