// In ./src/pages/SearchScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import client from '../components/shopifyInitialisation';

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchText) => {
    setLoading(true);
    setQuery(searchText);
    
    // Clear results if the search text is empty
    if (searchText === '') {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      // Perform the search query using the Shopify JS Buy SDK
      // Here we're constructing a search query that can match several fields
      const searchQuery = `title:*${searchText}* OR tag:*${searchText}* OR product_type:*${searchText}*`;
      let query = {
        query: searchQuery
      };

      const products = await client.product.fetchQuery(query);
      setResults(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setResults([]); // Clear results on error
    }
    
    setLoading(false);
  };

  // Render function for FlatList items
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.title}</Text>
      {/* You can add more product details here */}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Type here to search..."
        value={query}
        onChangeText={handleSearch}
        autoCorrect={false}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchInput: {
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  item: {
    fontSize: 18,
  },
});

export default SearchScreen;
