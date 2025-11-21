import React, { useState, useEffect } from 'react';
import { View, ViewStyle, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header, SearchBar } from '../components/molecules';
import { ProductList, FilterBar } from '../components/organisms';
import { Typography } from '../components/atoms';
import { useProducts, useAddToCart } from '../hooks/useProducts';
import type { ProductListingScreenProps } from '../navigation/types';
import type { Filter, SortBy, Product } from '../types';

export const ProductListingPage: React.FC<ProductListingScreenProps> = ({
  navigation,
  route,
}) => {
  const { category, searchQuery } = route.params;
  const [filters, setFilters] = useState<Filter>({
    category,
  });
  const [sortBy, setSortBy] = useState<SortBy>('popular');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchQuery || '');

  const { data, isLoading, refetch } = useProducts(filters, sortBy, page);
  const addToCart = useAddToCart();

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleAddToCart = (product: Product) => {
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  const handleLoadMore = () => {
    if (data?.pagination.hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    refetch();
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: '#f9fafb',
  };

  const searchContainerStyle: ViewStyle = {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  };

  const cartIcon = () => (
    <TouchableOpacity
      onPress={() => {
        console.log('Navigate to cart');
      }}
      accessibilityRole="button"
      accessibilityLabel="Shopping cart"
    >
      <Typography variant="h4">🛒</Typography>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={containerStyle}>
      <Header
        title="Products"
        showBack
        onBack={() => navigation.goBack()}
        rightElement={cartIcon()}
      />

      <View style={searchContainerStyle}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search products..."
          onClear={() => setSearch('')}
        />
      </View>

      <FilterBar
        filters={filters}
        sortBy={sortBy}
        onFilterChange={setFilters}
        onSortChange={setSortBy}
        categories={['Electronics', 'Clothing', 'Home', 'Sports', 'Books']}
        brands={['Brand A', 'Brand B', 'Brand C', 'Brand D']}
      />

      <ProductList
        products={data?.products || []}
        loading={isLoading}
        onProductPress={handleProductPress}
        onAddToCart={handleAddToCart}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        refreshing={false}
        numColumns={2}
        compact
      />
    </SafeAreaView>
  );
};
