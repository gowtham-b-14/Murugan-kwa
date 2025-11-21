import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
  Modal,
} from 'react-native';
import { Image, Typography } from '../atoms';

export interface ProductGalleryProps {
  images: string[];
  productName?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const mainImageContainerStyle: ViewStyle = {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: '#f9fafb',
  };

  const thumbnailContainerStyle: ViewStyle = {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
  };

  const thumbnailStyle = (isSelected: boolean): ViewStyle => ({
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: isSelected ? '#0ea5e9' : 'transparent',
    overflow: 'hidden',
  });

  const indicatorContainerStyle: ViewStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  };

  const modalContainerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  };

  return (
    <>
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / SCREEN_WIDTH
            );
            setSelectedIndex(index);
          }}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setShowFullScreen(true)}
              activeOpacity={0.9}
            >
              <View style={mainImageContainerStyle}>
                <Image
                  source={{ uri: image }}
                  width={SCREEN_WIDTH}
                  height={SCREEN_WIDTH}
                  accessibilityLabel={`${productName} image ${index + 1} of ${images.length}`}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={indicatorContainerStyle}>
          <Typography variant="caption" style={{ color: '#ffffff' }}>
            {selectedIndex + 1} / {images.length}
          </Typography>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={thumbnailContainerStyle}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedIndex(index)}
              style={thumbnailStyle(index === selectedIndex)}
            >
              <Image
                source={{ uri: image }}
                width={60}
                height={60}
                accessibilityLabel={`Thumbnail ${index + 1}`}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={showFullScreen}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFullScreen(false)}
      >
        <View style={modalContainerStyle}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
            onPress={() => setShowFullScreen(false)}
          >
            <Typography variant="h2" style={{ color: '#ffffff' }}>
              ✕
            </Typography>
          </TouchableOpacity>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: selectedIndex * SCREEN_WIDTH, y: 0 }}
          >
            {images.map((image, index) => (
              <View
                key={index}
                style={{
                  width: SCREEN_WIDTH,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: image }}
                  width={SCREEN_WIDTH}
                  height={SCREEN_WIDTH}
                  accessibilityLabel={`Full screen ${productName} image ${index + 1}`}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
