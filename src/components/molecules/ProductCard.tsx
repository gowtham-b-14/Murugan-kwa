import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Card, Image, Typography, Button } from '../atoms';
import type { Product } from '../../types';

export interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  compact = false,
}) => {
  const containerStyle: ViewStyle = {
    width: compact ? 160 : '100%',
    marginBottom: 16,
  };

  const priceContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  };

  const ratingContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => onPress?.(product)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Product: ${product.name}`}
    >
      <Card variant="elevated" padding="none">
        <Image
          source={{ uri: product.images[0] }}
          height={compact ? 160 : 240}
          aspectRatio={compact ? 1 : 4 / 3}
        />
        <View style={{ padding: 12 }}>
          <Typography
            variant={compact ? 'label' : 'h4'}
            weight="semibold"
            numberOfLines={2}
          >
            {product.name}
          </Typography>

          {!compact && (
            <Typography
              variant="caption"
              color="secondary"
              numberOfLines={2}
              style={{ marginTop: 4 }}
            >
              {product.description}
            </Typography>
          )}

          <View style={ratingContainerStyle}>
            <Typography variant="caption" weight="medium">
              ⭐ {product.rating.toFixed(1)}
            </Typography>
            <Typography variant="caption" color="muted" style={{ marginLeft: 4 }}>
              ({product.reviewCount})
            </Typography>
          </View>

          <View style={priceContainerStyle}>
            <Typography variant={compact ? 'body' : 'h4'} weight="bold" color="primary">
              {product.currency} {product.price.toFixed(2)}
            </Typography>
            {!product.inStock && (
              <Typography variant="caption" color="error">
                Out of Stock
              </Typography>
            )}
          </View>

          {!compact && onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              disabled={!product.inStock}
              onPress={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              style={{ marginTop: 12 }}
            >
              Add to Cart
            </Button>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
