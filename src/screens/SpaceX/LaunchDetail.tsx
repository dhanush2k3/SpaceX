import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import CustomHeader from '../../components/CustomHeader';

type LaunchDetailRouteProp = RouteProp<RootStackParamList, 'LaunchDetail'>;

const screenWidth = Dimensions.get('window').width;

const LaunchDetail = () => {
  const route = useRoute<LaunchDetailRouteProp>();
  const { launch } = route.params;
  const articleUrl = launch.links?.article;
  const wikipediaUrl = launch.links?.wikipedia;

  console.log(launch);

  const getLaunchImage = () =>
    launch.links?.patch?.large ||
    launch.links?.patch?.small ||
    launch.links?.flickr?.original?.[0] ||
    'https://via.placeholder.com/300';

  return (
    <View style={styles.mainContainer}>
      <CustomHeader />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: getLaunchImage() }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{launch.name}</Text>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.infoDetail}>
          <Text style={styles.detail}>
            {launch.details || 'No details available'}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.value}>
              {' '}
              {launch.date_utc
                ? new Date(launch.date_utc).toLocaleDateString()
                : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Window: </Text>
            <Text style={styles.value}>{launch.window ?? 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Auto Update: </Text>
            <Text style={styles.value}>
              {launch.auto_update ? 'Yes' : 'No'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Upcoming: </Text>
            <Text style={styles.value}>{launch.upcoming ? 'Yes' : 'No'}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Fairings</Text>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Reused: </Text>
            <Text style={styles.value}>
              {launch.fairings?.reused !== null &&
              launch.fairings?.reused !== undefined
                ? launch.fairings.reused
                  ? 'Yes'
                  : 'No'
                : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Recovery Attempted: </Text>
            <Text style={styles.value}>
              {launch.fairings?.recovery_attempt !== null &&
              launch.fairings?.recovery_attempt !== undefined
                ? launch.fairings.recovery_attempt
                  ? 'Yes'
                  : 'No'
                : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Recovered: </Text>
            <Text style={styles.value}>
              {launch.fairings?.recovered !== null &&
              launch.fairings?.recovered !== undefined
                ? launch.fairings.recovered
                  ? 'Yes'
                  : 'No'
                : 'N/A'}
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Failures</Text>
        <View style={styles.section}>
          {launch.failures && launch.failures.length > 0 ? (
            launch.failures.map((failure, index) => (
              <View key={index} style={styles.failureItem}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Time: </Text>
                  <Text style={styles.value}>
                    {failure.time !== null && failure.time !== undefined
                      ? failure.time
                      : 'N/A'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Reason: </Text>
                  <Text style={styles.value}>{failure.reason || 'N/A'}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.value}>No failures reported</Text>
          )}
        </View>
        <Text style={styles.sectionTitle}>Publications</Text>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Article : </Text>
            {articleUrl ? (
              <TouchableOpacity onPress={() => Linking.openURL(articleUrl)}>
                <Text style={[styles.value, styles.link]}>Read more</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.value}>N/A</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Wikipedia : </Text>
            {wikipediaUrl ? (
              <TouchableOpacity onPress={() => Linking.openURL(wikipediaUrl)}>
                <Text style={[styles.value, styles.link]}>Read more</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.value}>N/A</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, marginBottom: 16, marginTop: 30 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    marginBottom: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  label: { fontSize: 16, fontWeight: '600', color: '#333' },
  value: { fontSize: 16, color: '#555', marginTop: 2 },
  detail: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoDetail: {
    padding: 5,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  failureItem: { marginBottom: 10 },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default LaunchDetail;
