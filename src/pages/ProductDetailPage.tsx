import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../components/molecules';
import { ProductGallery, Reviews } from '../components/organisms';
import { Typography, Button, Card } from '../components/atoms';
import { Rating, FilterChip } from '../components/molecules';
import {
  useProduct,
  useProductReviews,
  useAddToCart,
  useCreateReview,
  useMarkReviewHelpful,
} from '../hooks/useProducts';
import type { ProductDetailScreenProps } from '../navigation/types';

export const ProductDetailPage: React.FC<ProductDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { productId } = route.params;
  const { data: product, isLoading } = useProduct(productId);
  const { data: reviewsData } = useProductReviews(productId);
  const addToCart = useAddToCart();
  const createReview = useCreateReview();
  const markHelpful = useMarkReviewHelpful();

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart.mutate({
        productId: product.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
    }
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    createReview.mutate({
      productId,
      rating,
      comment,
    });
  };

  const handleMarkHelpful = (reviewId: string) => {
    markHelpful.mutate(reviewId);
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: '#ffffff',
  };

  const contentStyle: ViewStyle = {
    padding: 16,
  };

  const priceContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  };

  const quantityContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  };

  const bottomBarStyle: ViewStyle = {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    gap: 12,
  };

  if (isLoading || !product) {
    return (
      <SafeAreaView style={containerStyle}>
        <Header
          title="Loading..."
          showBack
          onBack={() => navigation.goBack()}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body" color="muted">
            Loading product details...
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

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
        title={product.name}
        showBack
        onBack={() => navigation.goBack()}
        rightElement={cartIcon()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductGallery images={product.images} productName={product.name} />

        <View style={contentStyle}>
          <Typography variant="h2" weight="bold">
            {product.name}
          </Typography>

          <View style={{ marginVertical: 12 }}>
            <Rating
              rating={product.rating}
              size="md"
              showValue
            />
            <Typography variant="caption" color="muted" style={{ marginTop: 4 }}>
              {product.reviewCount} reviews
            </Typography>
          </View>

          <View style={priceContainerStyle}>
            <Typography variant="h2" weight="bold" color="primary">
              {product.currency} {product.price.toFixed(2)}
            </Typography>
            {!product.inStock && (
              <Card variant="outlined" padding="sm">
                <Typography variant="caption" color="error">
                  Out of Stock
                </Typography>
              </Card>
            )}
          </View>

          <Typography variant="body" color="secondary" style={{ marginBottom: 20 }}>
            {product.description}
          </Typography>

          {product.sizes && product.sizes.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Typography variant="h4" weight="semibold" style={{ marginBottom: 12 }}>
                Select Size
              </Typography>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {product.sizes.map((size) => (
                  <FilterChip
                    key={size}
                    label={size}
                    selected={selectedSize === size}
                    onPress={() => setSelectedSize(size)}
                  />
                ))}
              </View>
            </View>
          )}

          {product.colors && product.colors.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Typography variant="h4" weight="semibold" style={{ marginBottom: 12 }}>
                Select Color
              </Typography>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {product.colors.map((color) => (
                  <FilterChip
                    key={color}
                    label={color}
                    selected={selectedColor === color}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </View>
          )}

          <View style={quantityContainerStyle}>
            <Typography variant="h4" weight="semibold" style={{ marginRight: 16 }}>
              Quantity:
            </Typography>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d1d5db',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4">-</Typography>
            </TouchableOpacity>
            <Typography
              variant="h4"
              weight="semibold"
              style={{ marginHorizontal: 20 }}
            >
              {quantity}
            </Typography>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d1d5db',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4">+</Typography>
            </TouchableOpacity>
          </View>

          {product.specifications && (
            <View style={{ marginBottom: 20 }}>
              <Typography variant="h4" weight="semibold" style={{ marginBottom: 12 }}>
                Specifications
              </Typography>
              <Card variant="outlined" padding="md">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <View
                    key={key}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: '#f3f4f6',
                    }}
                  >
                    <Typography variant="body" color="secondary">
                      {key}
                    </Typography>
                    <Typography variant="body" weight="medium">
                      {value}
                    </Typography>
                  </View>
                ))}
              </Card>
            </View>
          )}
        </View>

        {reviewsData && (
          <Reviews
            reviews={reviewsData.reviews || []}
            productId={productId}
            onSubmitReview={handleSubmitReview}
            onMarkHelpful={handleMarkHelpful}
            loading={createReview.isPending}
          />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={bottomBarStyle}>
        <Button
          variant="outline"
          size="lg"
          onPress={() => {
            console.log('Add to wishlist');
          }}
          style={{ flex: 1 }}
        >
          ♡
        </Button>
        <Button
          variant="primary"
          size="lg"
          onPress={handleAddToCart}
          disabled={!product.inStock}
          loading={addToCart.isPending}
          style={{ flex: 3 }}
        >
          Add to Cart
        </Button>
      </View>
    </SafeAreaView>
  );
};
