import React from 'react';
import { TextInput, View, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const containerStyle: ViewStyle = {
    marginBottom: 16,
  };

  const labelStyle: TextStyle = {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  };

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: error ? '#ef4444' : '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    ...(style as TextStyle),
  };

  const helperTextStyle: TextStyle = {
    fontSize: 12,
    color: error ? '#ef4444' : '#6b7280',
    marginTop: 4,
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={inputContainerStyle}>
        {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
        <TextInput
          style={inputStyle}
          placeholderTextColor="#9ca3af"
          accessibilityLabel={label}
          accessibilityHint={helperText}
          {...props}
        />
        {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
      </View>
      {(error || helperText) && (
        <Text style={helperTextStyle}>{error || helperText}</Text>
      )}
    </View>
  );
};
