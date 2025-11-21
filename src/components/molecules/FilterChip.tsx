import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Typography } from '../atoms';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected = false,
  onPress,
  disabled = false,
}) => {
  const chipStyle: ViewStyle = {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: selected ? '#0ea5e9' : '#d1d5db',
    backgroundColor: selected ? '#e0f2fe' : '#ffffff',
    marginRight: 8,
    marginBottom: 8,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <TouchableOpacity
      style={chipStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      <Typography
        variant="label"
        weight="medium"
        color={selected ? 'primary' : 'secondary'}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};
