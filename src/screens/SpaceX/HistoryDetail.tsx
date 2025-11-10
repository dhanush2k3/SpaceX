import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import CustomHeader from '../../components/CustomHeader';

type Props = {
  route: RouteProp<RootStackParamList, 'HistoryDetail'>;
};

const HistoryDetail = ({ route }: Props) => {
  const { history } = route.params;
  const articleUrl = history.links?.article;

  return (
    <View style={styles.container}>
      <CustomHeader/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{history.title}</Text>

        <View style={styles.card}>
          <Text style={styles.date}>
            Published date:{' '}
            {new Date(history.event_date_utc!).toLocaleDateString()}
          </Text>

          <Text style={styles.details}>
            {history.details ?? 'No details available'}
          </Text>

          {articleUrl && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(articleUrl)}
            >
              <Text style={styles.buttonText}>Read full article</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // centers vertically
    alignItems: 'center', // centers horizontally
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // for Android shadow
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  details: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HistoryDetail;
