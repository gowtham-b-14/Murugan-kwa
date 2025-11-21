import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Input } from '../atoms';
import { Typography } from '../atoms';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search products...',
  onClear,
  onFocus,
  onBlur,
}) => {
  const SearchIcon = () => (
    <Typography variant="body" color="muted">
      🔍
    </Typography>
  );

  const ClearButton = () =>
    value ? (
      <TouchableOpacity
        onPress={onClear}
        accessibilityRole="button"
        accessibilityLabel="Clear search"
      >
        <Typography variant="body" color="muted">
          ✕
        </Typography>
      </TouchableOpacity>
    ) : null;

  const containerStyle: ViewStyle = {
    marginBottom: 0,
  };

  return (
    <View style={containerStyle}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        leftIcon={<SearchIcon />}
        rightIcon={<ClearButton />}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};
