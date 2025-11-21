import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';

type RootStackParamList = {
  Home: undefined;
  ProductListing: undefined;
  ProductDetail: { productId?: string };
};

type ProductDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
};

const StarIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M7.68323 1.53003C7.71245 1.471 7.75758 1.42132 7.81353 1.38658C7.86949 1.35184 7.93404 1.33344 7.9999 1.33344C8.06576 1.33344 8.13031 1.35184 8.18626 1.38658C8.24222 1.42132 8.28735 1.471 8.31656 1.53003L9.85656 4.64936C9.95802 4.85468 10.1078 5.0323 10.293 5.167C10.4782 5.3017 10.6933 5.38944 10.9199 5.4227L14.3639 5.9267C14.4292 5.93615 14.4905 5.96368 14.5409 6.00616C14.5913 6.04865 14.6288 6.1044 14.6492 6.1671C14.6696 6.22981 14.6721 6.29697 14.6563 6.36099C14.6405 6.42501 14.6071 6.48333 14.5599 6.52936L12.0692 8.9547C11.905 9.11477 11.7821 9.31235 11.7111 9.53045C11.6402 9.74855 11.6233 9.98062 11.6619 10.2067L12.2499 13.6334C12.2614 13.6986 12.2544 13.7657 12.2296 13.8272C12.2048 13.8886 12.1632 13.9418 12.1096 13.9807C12.056 14.0196 11.9925 14.0427 11.9265 14.0473C11.8604 14.0519 11.7944 14.0378 11.7359 14.0067L8.65723 12.388C8.45438 12.2815 8.22868 12.2259 7.99956 12.2259C7.77044 12.2259 7.54475 12.2815 7.3419 12.388L4.2639 14.0067C4.20545 14.0376 4.1395 14.0516 4.07353 14.0469C4.00757 14.0422 3.94424 14.0191 3.89076 13.9802C3.83728 13.9413 3.79579 13.8882 3.771 13.8268C3.74622 13.7655 3.73914 13.6985 3.75056 13.6334L4.3379 10.2074C4.37669 9.98119 4.35989 9.74896 4.28892 9.53073C4.21796 9.31249 4.09497 9.1148 3.93056 8.9547L1.4399 6.53003C1.39229 6.48405 1.35856 6.42563 1.34254 6.36141C1.32652 6.2972 1.32886 6.22978 1.34928 6.16682C1.36971 6.10387 1.40741 6.04793 1.45808 6.00535C1.50876 5.96278 1.57037 5.9353 1.6359 5.92603L5.07923 5.4227C5.30607 5.3897 5.52149 5.30207 5.70695 5.16736C5.89242 5.03264 6.04237 4.85488 6.1439 4.64936L7.68323 1.53003Z"
      fill="#FFB900"
      stroke="#FFB900"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BackIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShareIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.59009 13.51L15.4201 17.49"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.4101 6.51001L8.59009 10.49"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 9.50001C2.00002 8.38721 2.33759 7.30059 2.96813 6.38367C3.59867 5.46675 4.49252 4.76267 5.53161 4.36441C6.5707 3.96615 7.70616 3.89245 8.78801 4.15305C9.86987 4.41365 10.8472 4.99629 11.591 5.82401C11.6434 5.88002 11.7067 5.92468 11.7771 5.95521C11.8474 5.98574 11.9233 6.00149 12 6.00149C12.0767 6.00149 12.1526 5.98574 12.2229 5.95521C12.2933 5.92468 12.3566 5.88002 12.409 5.82401C13.1504 4.99091 14.128 4.40338 15.2116 4.13961C16.2952 3.87585 17.4335 3.94836 18.4749 4.34749C19.5163 4.74663 20.4114 5.45346 21.0411 6.37391C21.6708 7.29436 22.0053 8.38477 22 9.50001C22 11.79 20.5 13.5 19 15L13.508 20.313C13.3217 20.527 13.0919 20.6989 12.834 20.8173C12.5762 20.9357 12.296 20.9979 12.0123 20.9997C11.7285 21.0015 11.4476 20.9428 11.1883 20.8277C10.9289 20.7126 10.697 20.5436 10.508 20.332L5 15C3.5 13.5 2 11.8 2 9.50001Z"
      stroke="#101828"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function ProductDetailScreen({ navigation }: ProductDetailScreenProps) {
  const [selectedColor, setSelectedColor] = useState('Ivory');
  const [selectedSize, setSelectedSize] = useState('');

  const colors = ['Ivory', 'Blush', 'Navy'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860' }}
            style={styles.productImage}
            resizeMode="cover"
          />
          
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <BackIcon />
            </TouchableOpacity>
            
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <ShareIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <HeartIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.category}>Tops</Text>
              <Text style={styles.productName}>Silk Blend Tunic</Text>
            </View>
            <Text style={styles.price}>$89.50</Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </View>
            <Text style={styles.reviewText}>(128 reviews)</Text>
          </View>

          <Text style={styles.description}>
            Elegant silk blend tunic with delicate details
          </Text>

          <View style={styles.section}>
            <View style={styles.colorHeader}>
              <Text style={styles.sectionTitle}>Color: </Text>
              <Text style={styles.selectedValue}>{selectedColor}</Text>
            </View>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    selectedColor === color && styles.colorButtonSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text
                    style={[
                      styles.colorButtonText,
                      selectedColor === color && styles.colorButtonTextSelected,
                    ]}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sizeHeader}>
              <Text style={styles.sectionTitle}>Select Size</Text>
              <TouchableOpacity>
                <Text style={styles.sizeGuide}>Size Guide</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sizeOptions}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size && styles.sizeButtonTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.addToBagButton}>
            <Text style={styles.addToBagText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 480,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    padding: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  category: {
    fontSize: 14,
    color: '#6A7282',
    letterSpacing: -0.15,
    lineHeight: 20,
  },
  productName: {
    fontSize: 16,
    color: '#101828',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
  price: {
    fontSize: 16,
    color: '#EC003F',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  stars: {
    flexDirection: 'row',
    gap: 0,
  },
  reviewText: {
    fontSize: 14,
    color: '#6A7282',
    letterSpacing: -0.15,
    lineHeight: 20,
  },
  description: {
    fontSize: 16,
    color: '#4A5565',
    letterSpacing: -0.312,
    lineHeight: 26,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  colorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#101828',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
  selectedValue: {
    fontSize: 16,
    color: '#4A5565',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  colorButtonSelected: {
    borderColor: '#EC003F',
    backgroundColor: '#FFF1F2',
  },
  colorButtonText: {
    fontSize: 16,
    color: '#364153',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
  colorButtonTextSelected: {
    color: '#EC003F',
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeGuide: {
    fontSize: 14,
    color: '#EC003F',
    letterSpacing: -0.15,
    lineHeight: 20,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    borderColor: '#EC003F',
    backgroundColor: '#FFF1F2',
  },
  sizeButtonText: {
    fontSize: 16,
    color: '#364153',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
  sizeButtonTextSelected: {
    color: '#EC003F',
  },
  addToBagButton: {
    backgroundColor: '#EC003F',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 8,
  },
  addToBagText: {
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: -0.312,
    lineHeight: 24,
  },
});
