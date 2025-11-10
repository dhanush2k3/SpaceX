import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useGetLaunchesQuery } from '../../store/SpaceXQuery/spacexApi';
import { Launch } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import { debounce } from '../../services/debounce';
import { useState } from 'react';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LaunchesList'
>;

const LaunchesList = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: launches = [], error, isLoading } = useGetLaunchesQuery();

  const [query, setQuery] = useState('');
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>(launches);

  const filterLaunches = (text: string) => {
    const filtered = launches.filter(launch =>
      launch.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredLaunches(filtered);
  };

  const debouncedFilter = useCallback(debounce(filterLaunches), [
    launches,
  ]);

  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedFilter(text);
  };

  const getLaunchImage = (item: Launch) =>
    item.links?.patch?.small ||
    item.links?.patch?.large ||
    item.links?.flickr?.original?.[0] ||
    'https://images.unsplash.com/photo-1761872936204-07e2bbe1990b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070';

  if (isLoading)
    return <ActivityIndicator size="large" style={styles.centered} />;

  if (error) return <Text style={styles.error}>Error loading launches</Text>;

  const renderItem = ({ item }: { item: Launch }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: getLaunchImage(item) }}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LaunchDetail', { launch: item })}
      >
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Launches</Text>
        <TextInput
          placeholder="Search Launches"
          style={styles.textinput}
          placeholderTextColor={'#000'}
          onChangeText={handleSearch}
          value={query}
        />
        <FlatList
          data={filteredLaunches}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
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
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 40 },
});

export default LaunchesList;
