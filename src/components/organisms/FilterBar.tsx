import React, { useState } from 'react';
import { View, ScrollView, ViewStyle, TouchableOpacity, Modal } from 'react-native';
import { FilterChip } from '../molecules';
import { Typography, Button } from '../atoms';
import type { Filter, SortBy, SortOption } from '../../types';

export interface FilterBarProps {
  filters: Filter;
  sortBy: SortBy;
  onFilterChange: (filters: Filter) => void;
  onSortChange: (sortBy: SortBy) => void;
  categories?: string[];
  brands?: string[];
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  sortBy,
  onFilterChange,
  onSortChange,
  categories = [],
  brands = [],
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const containerStyle: ViewStyle = {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  };

  const sortContainerStyle: ViewStyle = {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  };

  const modalContainerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  };

  const modalContentStyle: ViewStyle = {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.category ? [filters.category] : [];
    const isSelected = currentCategories.includes(category);

    onFilterChange({
      ...filters,
      category: isSelected ? undefined : category,
    });
  };

  const handleBrandToggle = (brand: string) => {
    const currentBrands = filters.brands || [];
    const isSelected = currentBrands.includes(brand);

    onFilterChange({
      ...filters,
      brands: isSelected
        ? currentBrands.filter((b) => b !== brand)
        : [...currentBrands, brand],
    });
  };

  const clearFilters = () => {
    onFilterChange({});
    setShowFilterModal(false);
  };

  const activeFilterCount = [
    filters.category,
    filters.brands?.length,
    filters.priceRange,
    filters.inStock,
  ].filter(Boolean).length;

  return (
    <>
      <View style={containerStyle}>
        <View style={sortContainerStyle}>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}
          >
            <Typography variant="label" weight="medium">
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Typography>
          </TouchableOpacity>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SORT_OPTIONS.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={sortBy === option.value}
                onPress={() => onSortChange(option.value as SortBy)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={modalContainerStyle}>
          <View style={modalContentStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Typography variant="h3" weight="bold">
                Filters
              </Typography>
              <TouchableOpacity onPress={clearFilters}>
                <Typography variant="label" color="primary">
                  Clear All
                </Typography>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {categories.length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Typography variant="h4" weight="semibold" style={{ marginBottom: 12 }}>
                    Categories
                  </Typography>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {categories.map((category) => (
                      <FilterChip
                        key={category}
                        label={category}
                        selected={filters.category === category}
                        onPress={() => handleCategoryToggle(category)}
                      />
                    ))}
                  </View>
                </View>
              )}

              {brands.length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Typography variant="h4" weight="semibold" style={{ marginBottom: 12 }}>
                    Brands
                  </Typography>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {brands.map((brand) => (
                      <FilterChip
                        key={brand}
                        label={brand}
                        selected={filters.brands?.includes(brand)}
                        onPress={() => handleBrandToggle(brand)}
                      />
                    ))}
                  </View>
                </View>
              )}

              <View style={{ marginBottom: 20 }}>
                <FilterChip
                  label="In Stock Only"
                  selected={filters.inStock || false}
                  onPress={() =>
                    onFilterChange({ ...filters, inStock: !filters.inStock })
                  }
                />
              </View>
            </ScrollView>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => setShowFilterModal(false)}
            >
              Apply Filters
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};
