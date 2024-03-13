import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import client from './shopifyInitialisation';

const CollectionsListScreen = ({ navigation }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.collection.fetchAll().then((fetchedCollections) => {
      setCollections(fetchedCollections);
      setLoading(false);
    });
  }, []);

  const renderCollection = ({ item }) => (
    <TouchableOpacity
      onPress={() => // Example navigation call with params
      navigation.navigate('CollectionProducts', { collectionId: item.id, collectionName: item.title })
      }
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={collections}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCollection}
    />
  );
};

export default CollectionsListScreen;
