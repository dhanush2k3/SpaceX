import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useGetHistoryQuery } from '../../store/SpaceXQuery/spacexApi';
import { History } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import { useState, useCallback } from 'react';
import { debounce } from '../../services/debounce';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HistoryList'
>;

const HistoryList = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: history = [], isLoading, error } = useGetHistoryQuery();

  const [query, setQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState<History[]>(history);

  const filterHistory = (text: string) => {
    const filtered = history.filter(item =>
      item.title?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredHistory(filtered);
  };

  const debouncedFilter = useCallback(debounce(filterHistory), [history]);

  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedFilter(text);
  };

  const renderItem = ({ item }: { item: History }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title ?? 'Untitled Event'}</Text>

      <Text style={styles.cardDetails} numberOfLines={4} ellipsizeMode="tail">
        {item.details ?? 'No details available'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HistoryDetail', { history: item })}
      >
        <Text style={styles.buttonText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading history...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error fetching history</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        <TextInput
          placeholder="Search History"
          style={styles.textinput}
          placeholderTextColor={'#000'}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredHistory}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#1a1a1a',
    marginVertical: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
    alignSelf: 'center',
  },
  textinput: {
    height: 45,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 40,
    marginHorizontal: 25,
    color: '#000',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'left',
  },
  cardDetails: {
    fontSize: 12,
    color: '#555',
    textAlign: 'left',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HistoryList;
