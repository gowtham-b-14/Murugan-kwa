import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Typography, Card, Button, Image } from '../components/atoms';
import { SearchBar, Header, ProductCard } from '../components/molecules';
import { useFeaturedProducts, useCategories } from '../hooks/useProducts';
import type { HomeScreenProps } from '../navigation/types';
import type { Product } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HomePage: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts(10);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('ProductListing', { searchQuery });
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('ProductListing', { category: categoryId });
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: '#f9fafb',
  };

  const heroContainerStyle: ViewStyle = {
    backgroundColor: '#0ea5e9',
    padding: 24,
    paddingTop: 40,
  };

  const sectionContainerStyle: ViewStyle = {
    padding: 16,
  };

  const sectionHeaderStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  };

  const categoryGridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const categoryCardStyle: ViewStyle = {
    width: (SCREEN_WIDTH - 48) / 2,
    marginBottom: 16,
  };

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={heroContainerStyle}>
          <Typography
            variant="h1"
            weight="bold"
            style={{ color: '#ffffff', marginBottom: 8 }}
          >
            KnitWell
          </Typography>
          <Typography
            variant="body"
            style={{ color: '#ffffff', marginBottom: 20, opacity: 0.9 }}
          >
            Discover amazing products at great prices
          </Typography>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for products..."
            onClear={() => setSearchQuery('')}
          />
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onPress={handleSearch}
            style={{ marginTop: 12 }}
          >
            Search
          </Button>
        </View>

        {!categoriesLoading && categories && categories.length > 0 && (
          <View style={sectionContainerStyle}>
            <View style={sectionHeaderStyle}>
              <Typography variant="h3" weight="bold">
                Shop by Category
              </Typography>
            </View>
            <View style={categoryGridStyle}>
              {categories.slice(0, 6).map((category: any) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryPress(category.id)}
                  style={categoryCardStyle}
                  activeOpacity={0.8}
                >
                  <Card variant="elevated" padding="none">
                    {category.image && (
                      <Image
                        source={{ uri: category.image }}
                        height={120}
                        aspectRatio={1}
                      />
                    )}
                    <View style={{ padding: 12 }}>
                      <Typography variant="label" weight="semibold" align="center">
                        {category.name}
                      </Typography>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {!productsLoading && featuredProducts && featuredProducts.length > 0 && (
          <View style={sectionContainerStyle}>
            <View style={sectionHeaderStyle}>
              <Typography variant="h3" weight="bold">
                Featured Products
              </Typography>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductListing', {})}
              >
                <Typography variant="label" color="primary">
                  View All →
                </Typography>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredProducts.map((product: Product) => (
                <View key={product.id} style={{ marginRight: 12 }}>
                  <ProductCard
                    product={product}
                    onPress={handleProductPress}
                    compact
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={sectionContainerStyle}>
          <Card variant="elevated" padding="lg">
            <Typography variant="h3" weight="bold" align="center">
              Special Offer
            </Typography>
            <Typography
              variant="body"
              color="secondary"
              align="center"
              style={{ marginTop: 8, marginBottom: 16 }}
            >
              Get 20% off on your first order
            </Typography>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('ProductListing', {})}
            >
              Shop Now
            </Button>
          </Card>
        </View>

        <View style={sectionContainerStyle}>
          <Typography variant="h3" weight="bold" style={{ marginBottom: 16 }}>
            Why Shop With Us
          </Typography>
          <Card variant="outlined" padding="md" style={{ marginBottom: 12 }}>
            <Typography variant="h4" weight="semibold">
              🚚 Free Shipping
            </Typography>
            <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
              On orders over $50
            </Typography>
          </Card>
          <Card variant="outlined" padding="md" style={{ marginBottom: 12 }}>
            <Typography variant="h4" weight="semibold">
              🔒 Secure Payment
            </Typography>
            <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
              100% secure transactions
            </Typography>
          </Card>
          <Card variant="outlined" padding="md">
            <Typography variant="h4" weight="semibold">
              ↩️ Easy Returns
            </Typography>
            <Typography variant="caption" color="secondary" style={{ marginTop: 4 }}>
              30-day return policy
            </Typography>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
