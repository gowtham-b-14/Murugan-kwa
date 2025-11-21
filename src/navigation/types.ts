import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ProductListing: {
    category?: string;
    searchQuery?: string;
  };
  ProductDetail: {
    productId: string;
  };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ProductListingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductListing'
>;
export type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;
