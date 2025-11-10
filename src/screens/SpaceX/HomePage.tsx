import React, { useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import {
  useGetRocketsQuery,
  useGetLaunchesQuery,
  useGetHistoryQuery,
} from '../../store/SpaceXQuery/spacexApi';
import { Rocket, Launch } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import CustomHeader from '../../components/CustomHeader';
const HEADER_HEIGHT = 800;
const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;

const historyImages = [
  require('../../assets/historyImages/img1.jpg'),
  require('../../assets/historyImages/img2.jpg'),
  require('../../assets/historyImages/img3.jpg'),
  require('../../assets/historyImages/img4.jpg'),
  require('../../assets/historyImages/img5.jpg'),
  require('../../assets/historyImages/img6.jpg'),
];

const HomePage = () => {

  const navigation = useNavigation<NavigationProp>();

  const { data: rockets = [], error, isLoading } = useGetRocketsQuery();
  const { data: launches = [] } = useGetLaunchesQuery();
  const { data: history = [] } = useGetHistoryQuery();
  const scrollY = useRef(new Animated.Value(0)).current;

  if (isLoading)
    return <ActivityIndicator size="large" style={styles.centered} />;

  if (error) return <Text style={styles.error}>Error loading rockets</Text>;

  if (rockets.length === 0)
    return <Text style={styles.empty}>No Rockets found</Text>;

  const getRocketImage = (item: Rocket) =>
    item.flickr_images?.[0] ?? 'https://via.placeholder.com/300';

  const getLaunchImage = (item: Launch) => {
    console.log(item.links?.patch?.small);
    return (
      item.links?.patch?.small ||
      item.links?.patch?.large ||
      item.links?.flickr?.original?.[0] ||
      'https://images.unsplash.com/photo-1761872936204-07e2bbe1990b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'
    );
  };

  const handleRocket = (rocket: Rocket) => {
    navigation.navigate('RocketDetail', { rocket });
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader/>
      <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ height: HEADER_HEIGHT, overflow: 'hidden' }}>
          <Animated.View
            style={[
              styles.parallaxImage,
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                      outputRange: [
                        -HEADER_HEIGHT / 2,
                        0,
                        HEADER_HEIGHT * 0.75,
                      ],
                    }),
                  },
                  {
                    scale: scrollY.interpolate({
                      inputRange: [-HEADER_HEIGHT, 0],
                      outputRange: [2, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                  
                ],
              },
            ]}
          >
            <ImageBackground
              source={{
                uri: 'https://sxcontent9668.azureedge.us/cms-assets/assets/Revolutionizing_Space_Tech_Mobile_45093b17b7.jpg',
              }}
              resizeMode="cover"
              style={{ flex: 1 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.parallaxText}>
                  Revolutionizing space technology
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </View>

        <Text style={styles.title}>Launches</Text>

        <View style={styles.cardContainer}>
          {launches.slice(0, 4).map((launch: Launch) => (
            <View key={launch.id} style={styles.card}>
              <Image
                source={{ uri: getLaunchImage(launch) }}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={styles.cardTitle}>{launch.name}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('LaunchDetail', { launch: launch })
                }
              >
                <Text style={styles.buttonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.viewMorebutton}
          onPress={() => {
            console.log('Navigating to LaunchesList...');
            navigation.navigate('LaunchesList');
          }}
        >
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>

        <View style={styles.historySection}>
          <Text style={styles.title}>History</Text>

          <FlatList
            data={historyImages}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={styles.historyImage}
                resizeMode="cover"
              />
            )}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate={'fast'}
          />

          <Text style={styles.historyText}>
            Born from a bold dream to make life multiplanetary, SpaceX has
            transformed the future of space exploration. From humble beginnings
            in a small workshop to launching rockets that pierce the edge of the
            cosmos, its journey is one of relentless innovation and fearless
            ambition. Every launch tells a story of courage, every setback a
            lesson driving greater heights. With Falcon, Dragon, and now
            Starship, SpaceX continues to push boundaries, proving that the
            impossible is only the beginning.
          </Text>

          <Text style={styles.historyArticle}>Articles</Text>

          <View style={styles.historyContainer}>
            {history.slice(0, 3).map((item, index) => (
              <View
                key={`${item.event_date_unix ?? 'history'}-${index}`}
                style={styles.historyCard}
              >
                <Text style={styles.historycardTitle}>
                  {item.title ?? 'Untitled Event'}
                </Text>
                <Text style={styles.historycardDetails}>
                  {' '}
                  {item.details
                    ? item.details.length > 100
                      ? item.details.slice(0, 100) + '...'
                      : item.details
                    : 'No details available'}
                </Text>
                <TouchableOpacity
                  style={styles.historybutton}
                  onPress={() => {
                    navigation.navigate('HistoryDetail', { history: item });
                  }}
                >
                  <Text style={styles.buttonText}>Read More</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.viewMorebutton}
            onPress={() => {
              console.log('Navigate to history Page...');
              navigation.navigate('HistoryList');
            }}
          >
            <Text style={styles.buttonText}>View More</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Rockets</Text>

        <FlatList
          data={rockets}
          keyExtractor={item => item.id}
          numColumns={2}
          nestedScrollEnabled
          columnWrapperStyle={styles.RocketColumnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.RocketListContent}
          renderItem={({ item: rocket }) => (
            <View style={styles.RocketCard}>
              <Image
                source={{ uri: getRocketImage(rocket) }}
                style={styles.RocketCardImage}
                resizeMode="cover"
              />
              <View style={styles.RocketCardContent}>
                <Text style={styles.RocketName}>{rocket.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.RocketButton}
                onPress={() => handleRocket(rocket)}
              >
                <Text style={styles.RocketButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.viewMorebutton}
          onPress={() => {
            console.log('Navigating to RocketList');
            navigation.navigate('RocketsList');
          }}
        >
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingHorizontal: CARD_MARGIN,
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  historyContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  historySection: {
    backgroundColor: '#EDEDED',
    paddingVertical: 20,
    marginTop: 20,
  },

  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  historycardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },

  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  historyImage: {
    width: screenWidth,
    height: 350,
    marginBottom: 10,
    padding: 20,
  },
  historyText: {
    color: '#1a1a1a',
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '700',
    letterSpacing: 0.3,
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: 'justify',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
  },

  historyArticle: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 15,
    padding: 15,
  },
  cardDetails: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  historycardDetails: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  viewMorebutton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 30,
    marginRight: 20,
  },
  historybutton: {
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
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  empty: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'left',
    color: '#1a1a1a',
    marginVertical: 30,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    padding: 15,
  },
  RocketListContent: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  RocketColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  RocketCard: {
    width: (screenWidth - 30) / 2,
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
  RocketCardImage: {
    width: '100%',
    height: 140,
  },
  RocketCardContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  RocketName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 5,
  },
  RocketButton: {
    backgroundColor: '#000',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  RocketButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  parallaxContainer: {
    width: '100%',
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  parallaxImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  parallaxOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  parallaxText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    padding: 15,
  },
  overlay: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 2,
  },
});

export default HomePage;
