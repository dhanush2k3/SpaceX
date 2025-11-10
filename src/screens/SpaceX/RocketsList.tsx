import React, { useCallback, useState } from 'react';
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
import { useGetRocketsQuery } from '../../store/SpaceXQuery/spacexApi';
import { Rocket } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import { debounce } from '../../services/debounce';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RocketsList'
>;

const RocketsList = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: rockets = [], error, isLoading } = useGetRocketsQuery();

  const [query, setQuery] = useState('');
  const [filteredRockets, setFilteredRockets] = useState<Rocket[]>(rockets);

  
  const filterRockets = (text: string) => {
    const filtered = rockets.filter(rocket =>
      rocket.name?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredRockets(filtered);
  };

  const debouncedFilter = useCallback(debounce(filterRockets), [rockets]);

  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedFilter(text);
  };

  const getRocketImage = (item: Rocket) =>
    item.flickr_images?.[0] ?? 'https://via.placeholder.com/300';

  const handleRocket = (rocket: Rocket) => {
    navigation.navigate('RocketDetail', { rocket });
  };

  const renderItem = ({ item }: { item: Rocket }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: getRocketImage(item) }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.name}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRocket(item)}
      >
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Rockets</Text>

        <TextInput
          placeholder="Search Rockets"
          style={styles.textinput}
          placeholderTextColor="#000"
          onChangeText={handleSearch}
          value={query}
        />

        {isLoading && (
          <ActivityIndicator size="large" style={styles.centered} />
        )}
        {error && <Text style={styles.error}>Error loading rockets</Text>}

        <FlatList
          data={filteredRockets}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
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
    marginHorizontal: 25,
    marginBottom: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    color: '#000',
  },
  listContent: { paddingHorizontal: CARD_MARGIN, paddingBottom: 30 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 15 },
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
  cardImage: { width: '100%', height: 140 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#000',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 40 },
});

export default RocketsList;
