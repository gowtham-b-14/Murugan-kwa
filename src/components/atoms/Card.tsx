import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  style,
  ...props
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        };
      case 'outlined':
        return {
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#e5e7eb',
        };
      case 'default':
      default:
        return {
          backgroundColor: '#ffffff',
        };
    }
  };

  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'sm':
        return { padding: 8 };
      case 'md':
        return { padding: 16 };
      case 'lg':
        return { padding: 24 };
      default:
        return {};
    }
  };

  const cardStyle: ViewStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    ...getVariantStyle(),
    ...getPaddingStyle(),
    ...(style as ViewStyle),
  };

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};
