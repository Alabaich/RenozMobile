import React, { useState } from 'react';
import { View, Modal, Button, TouchableOpacity, Text, ScrollView, StyleSheet,Dimensions } from 'react-native';
import CustomRangeSlider from '@react-native-community/slider';

const FilterModal = ({ 
    isVisible, 
    onClose, 
    filters, 
    selectedFilters, 
    onFilterSelect, 
    onApply,
    minPrice, 
    maxPrice  
  }) => {
    const [visibleFilters, setVisibleFilters] = useState({});
    const toggleFilterVisibility = (filterId) => {
        setVisibleFilters(prevState => ({
            ...prevState,
            [filterId]: !prevState[filterId]
        }));
    };

    const handleSelect = (filterId, valueLabel, filterLabel) => {
        const isSelected = selectedFilters[filterId] && selectedFilters[filterId].includes(valueLabel);

        onFilterSelect(filterId, valueLabel, filterLabel, isSelected);
    };
    const renderPriceFilter = () => {
        return (
          <View style={styles.filterSection}>
            <View style={styles.priceLabels}>
              <Text style={[styles.priceLabel]}>
                {`$${minPrice.toFixed(2)}`} 
              </Text>
              <Text style={[styles.priceLabel, ]}>
                {`$${maxPrice.toFixed(2)}`}
              </Text>
            </View>
          </View>
        );
      };

      const renderFilterSection = (filter) => {
        const isFilterVisible = !!visibleFilters[filter.id];
      
        if (filter.id === "filter.v.price") {
            const isFilterVisible = !!visibleFilters[filter.id];
            return (
              <View key={`price-filter-${filter.id}`} style={styles.filterSection}>
                <TouchableOpacity onPress={() => toggleFilterVisibility(filter.id)}>
                  <Text style={styles.filterTitle}>Price</Text>
                </TouchableOpacity>
                {isFilterVisible && renderPriceFilter()}
              </View>
            );
          }

        return (
          <View key={filter.id} style={styles.filterSection}>
            <TouchableOpacity onPress={() => toggleFilterVisibility(filter.id)}>
              <Text style={styles.filterTitle}>{filter.label}</Text>
            </TouchableOpacity>
            {isFilterVisible && filter.values.map((value, index) => (
              <TouchableOpacity
                key={`${filter.id}-${value.id}-${index}`} 
                onPress={() => handleSelect(filter.id, value.label, filter.label)}
                style={[
                  styles.filterOption,
                  isSelected(filter.id, value.label) ? styles.selectedFilterOption : styles.unselectedFilterOption,
                ]}
              >
                <Text style={styles.filterOptionText}>{value.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      };
      
      function isSelected(filterId, valueLabel) {
        return selectedFilters[filterId] && selectedFilters[filterId].includes(valueLabel);
      }
      

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContent}>
                <Button title="Close" onPress={onClose} />
                <ScrollView>
                    {filters.map(renderFilterSection)}
                </ScrollView>
                <Button title="Apply Filters" onPress={onApply} />
            </View>
        </Modal>
    );
};





const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterSection: {
        marginBottom: 20,
    },
    filterTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    filterOption: {
        padding: 10,
        borderRadius: 4,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedFilterOption: {
        backgroundColor: '#007bff', // Adjust as needed
    },
    unselectedFilterOption: {
        backgroundColor: '#ffffff', // Adjust as needed
    },
    filterOptionText: {
        textAlign: 'center',
    },
});

export default FilterModal;
