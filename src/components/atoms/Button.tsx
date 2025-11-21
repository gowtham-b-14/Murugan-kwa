import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  fullWidth = false,
  style,
  ...props
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#0ea5e9',
        };
      case 'secondary':
        return {
          backgroundColor: '#d946ef',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#0ea5e9',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
        };
      case 'md':
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
        };
      default:
        return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        baseStyle.color = '#ffffff';
        break;
      case 'outline':
      case 'ghost':
        baseStyle.color = '#0ea5e9';
        break;
    }

    switch (size) {
      case 'sm':
        baseStyle.fontSize = 14;
        break;
      case 'md':
        baseStyle.fontSize = 16;
        break;
      case 'lg':
        baseStyle.fontSize = 18;
        break;
    }

    return baseStyle;
  };

  const buttonStyle: ViewStyle = {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled || loading ? 0.6 : 1,
    ...(fullWidth && { width: '100%' }),
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...(style as ViewStyle),
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#0ea5e9' : '#ffffff'} />
      ) : (
        <Text style={getTextStyle()}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};
