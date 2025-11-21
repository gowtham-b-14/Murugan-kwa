import React from 'react';
import { View, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { Typography } from '../atoms';

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightElement,
  leftElement,
}) => {
  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        paddingTop: 48,
      },
      android: {
        paddingTop: 12,
      },
    }),
  };

  const leftContainerStyle: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  };

  const centerContainerStyle: ViewStyle = {
    flex: 2,
    alignItems: 'center',
  };

  const rightContainerStyle: ViewStyle = {
    flex: 1,
    alignItems: 'flex-end',
  };

  return (
    <View style={headerStyle}>
      <View style={leftContainerStyle}>
        {showBack && onBack ? (
          <TouchableOpacity
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={{ marginRight: 8 }}
          >
            <Typography variant="h4">←</Typography>
          </TouchableOpacity>
        ) : null}
        {leftElement}
      </View>

      <View style={centerContainerStyle}>
        <Typography variant="h4" weight="bold" numberOfLines={1}>
          {title}
        </Typography>
      </View>

      <View style={rightContainerStyle}>{rightElement}</View>
    </View>
  );
};
