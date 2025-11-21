import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return { fontSize: 32, lineHeight: 40 };
      case 'h2':
        return { fontSize: 28, lineHeight: 36 };
      case 'h3':
        return { fontSize: 24, lineHeight: 32 };
      case 'h4':
        return { fontSize: 20, lineHeight: 28 };
      case 'body':
        return { fontSize: 16, lineHeight: 24 };
      case 'caption':
        return { fontSize: 12, lineHeight: 16 };
      case 'label':
        return { fontSize: 14, lineHeight: 20 };
      default:
        return {};
    }
  };

  const getWeightStyle = (): TextStyle => {
    switch (weight) {
      case 'regular':
        return { fontWeight: '400' };
      case 'medium':
        return { fontWeight: '500' };
      case 'semibold':
        return { fontWeight: '600' };
      case 'bold':
        return { fontWeight: '700' };
      default:
        return {};
    }
  };

  const getColorStyle = (): TextStyle => {
    switch (color) {
      case 'primary':
        return { color: '#1f2937' };
      case 'secondary':
        return { color: '#6b7280' };
      case 'muted':
        return { color: '#9ca3af' };
      case 'error':
        return { color: '#ef4444' };
      case 'success':
        return { color: '#10b981' };
      default:
        return {};
    }
  };

  const textStyle: TextStyle = {
    textAlign: align,
    ...getVariantStyle(),
    ...getWeightStyle(),
    ...getColorStyle(),
    ...(style as TextStyle),
  };

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};
