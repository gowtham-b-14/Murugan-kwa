import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';

type RootStackParamList = {
  Home: undefined;
  ProductListing: undefined;
  ProductDetail: { productId?: string };
};

type ProductListingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductListing'>;
};

const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M17.5 17.5L13.8833 13.8833"
      stroke="#99A1AF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
      stroke="#99A1AF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FilterIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M8.33333 4.16666H2.5" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 15.8333H2.5" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11.6667 2.5V5.83333" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.3333 14.1667V17.5" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17.5 10H10" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17.4999 15.8333H13.3333" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17.5001 4.16666H11.6667" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.66675 8.33334V11.6667" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.66667 10H2.5" stroke="#4A5565" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HeartIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M1.66675 7.91668C1.66677 6.98935 1.94808 6.08383 2.47353 5.31973C2.99898 4.55563 3.74385 3.96889 4.60976 3.63701C5.47567 3.30513 6.42188 3.24372 7.32343 3.46088C8.22497 3.67805 9.03944 4.16358 9.65925 4.85335C9.7029 4.90002 9.75568 4.93724 9.81431 4.96268C9.87294 4.98812 9.93617 5.00125 10.0001 5.00125C10.064 5.00125 10.1272 4.98812 10.1859 4.96268C10.2445 4.93724 10.2973 4.90002 10.3409 4.85335C10.9588 4.1591 11.7734 3.66949 12.6764 3.44968C13.5795 3.22988 14.528 3.2903 15.3958 3.62292C16.2636 3.95553 17.0096 4.54456 17.5343 5.3116C18.0591 6.07864 18.3378 6.98731 18.3334 7.91668C18.3334 9.82501 17.0834 11.25 15.8334 12.5L11.2567 16.9275C11.1015 17.1059 10.91 17.2491 10.6951 17.3478C10.4802 17.4464 10.2468 17.4982 10.0103 17.4997C9.77386 17.5012 9.53979 17.4524 9.32365 17.3565C9.10752 17.2605 8.91427 17.1197 8.75675 16.9433L4.16675 12.5C2.91675 11.25 1.66675 9.83335 1.66675 7.91668Z"
      stroke="#4A5565"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HomeIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 9.99999C2.99993 9.70906 3.06333 9.42161 3.18579 9.15771C3.30824 8.8938 3.4868 8.65979 3.709 8.47199L10.709 2.47199C11.07 2.1669 11.5274 1.99951 12 1.99951C12.4726 1.99951 12.93 2.1669 13.291 2.47199L20.291 8.47199C20.5132 8.65979 20.6918 8.8938 20.8142 9.15771C20.9367 9.42161 21.0001 9.70906 21 9.99999V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99999Z"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShopIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.9999 21L16.6599 16.66"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BagIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.10303 6.03406H20.897"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.4 5.467C3.14036 5.81319 3 6.23426 3 6.667V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6.667C21 6.23426 20.8596 5.81319 20.6 5.467L18.6 2.8C18.4137 2.55161 18.1721 2.35 17.8944 2.21115C17.6167 2.07229 17.3105 2 17 2H7C6.68951 2 6.38328 2.07229 6.10557 2.21115C5.82786 2.35 5.58629 2.55161 5.4 2.8L3.4 5.467Z"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={active ? '#EC003F' : '#99A1AF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Silk Blend Tunic',
    price: '$89.50',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8af39074281630082168c452fc72bdaf2138be53?width=366',
  },
  {
    id: '2',
    name: 'Classic Wrap Dress',
    price: '$119.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/2ddc134b0c58a62bf03b2ecd3b5e270e5274f2e9?width=366',
  },
  {
    id: '3',
    name: 'Statement Blazer',
    price: '$149.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/f67f230abffed2738ae3cbc3d943655440eb1c74?width=366',
  },
  {
    id: '4',
    name: 'Artisan Necklace',
    price: '$45.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/49a02839c723043613b28fac743b3b2ce108ed73?width=366',
  },
  {
    id: '5',
    name: 'Relaxed Linen Set',
    price: '$129.00',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/57270553350cee7ea0208abd056580d92a203cbb?width=366',
  },
  {
    id: '6',
    name: 'Embroidered Top',
    price: '$79.50',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/bbd7cf9a40918fa7c3cbf06af5b65290ae2f21d7?width=366',
  },
];

const categories = ['All', 'New', 'Dresses', 'Tops', 'Jackets', 'Accessories'];

export default function ProductListingScreen({ navigation }: ProductListingScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      activeOpacity={0.7}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity style={styles.heartButton}>
          <HeartIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.mainContent}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Shop</Text>
            
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <SearchIcon />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for styles..."
                  placeholderTextColor="rgba(10, 10, 10, 0.50)"
                />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <FilterIcon />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.productsHeader}>
            <Text style={styles.itemCount}>{products.length} items</Text>
          </View>

          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <View key={product.id} style={styles.productCardWrapper}>
                {renderProductCard({ item: product })}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Home')}
          >
            <HomeIcon active={false} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <ShopIcon active={true} />
            <Text style={[styles.navText, styles.navTextActive]}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <BagIcon active={false} />
            <Text style={styles.navText}>Bag</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <ProfileIcon active={false} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#101828',
    lineHeight: 24,
    letterSpacing: -0.312,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#0A0A0A',
    letterSpacing: -0.312,
  },
  filterButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    gap: 8,
    paddingRight: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#F3F4F6',
  },
  categoryButtonActive: {
    backgroundColor: '#EC003F',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#364153',
    lineHeight: 24,
    letterSpacing: -0.312,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  productsHeader: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6A7282',
    lineHeight: 20,
    letterSpacing: -0.15,
  },
  productsGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCardWrapper: {
    width: '47%',
  },
  productCard: {
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    aspectRatio: 183 / 244,
    borderRadius: 10,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#101828',
    lineHeight: 24,
    letterSpacing: -0.312,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#EC003F',
    lineHeight: 24,
    letterSpacing: -0.312,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 56,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#99A1AF',
    lineHeight: 16,
  },
  navTextActive: {
    color: '#EC003F',
  },
});
