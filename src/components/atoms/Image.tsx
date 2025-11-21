import React, { useState } from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  View,
  Text,
  ActivityIndicator,
  ImageStyle,
  ViewStyle,
} from 'react-native';

export interface ImageProps extends RNImageProps {
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  aspectRatio?: number;
}

export const Image: React.FC<ImageProps> = ({
  width,
  height,
  rounded = false,
  aspectRatio,
  style,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const containerStyle: ViewStyle = {
    position: 'relative',
    backgroundColor: '#f3f4f6',
    overflow: 'hidden',
    ...(width && { width }),
    ...(height && { height }),
    ...(aspectRatio && { aspectRatio }),
    ...(rounded && { borderRadius: 12 }),
  };

  const imageStyle: ImageStyle = {
    width: '100%',
    height: '100%',
    ...(style as ImageStyle),
  };

  const ErrorView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
      }}
    >
      <Text style={{ fontSize: 12, color: '#9ca3af' }}>
        Failed to load image
      </Text>
    </View>
  );

  return (
    <View style={containerStyle}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <ActivityIndicator color="#0ea5e9" />
        </View>
      )}
      {!error ? (
        <RNImage
          {...props}
          style={imageStyle}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          accessibilityRole="image"
        />
      ) : (
        <ErrorView />
      )}
    </View>
  );
};
