import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Typography } from '../atoms';

export interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 20;
    }
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const starContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  return (
    <View style={containerStyle}>
      <View style={starContainerStyle}>
        {[...Array(maxRating)].map((_, index) => (
          <Typography
            key={index}
            variant="body"
            style={{ fontSize: getFontSize(), marginRight: 2 }}
          >
            {index < Math.floor(rating) ? '⭐' : '☆'}
          </Typography>
        ))}
      </View>
      {showValue && (
        <Typography
          variant={size === 'sm' ? 'caption' : 'body'}
          weight="medium"
          style={{ marginLeft: 8 }}
        >
          {rating.toFixed(1)}
        </Typography>
      )}
    </View>
  );
};
