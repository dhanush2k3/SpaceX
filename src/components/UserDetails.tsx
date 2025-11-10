import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>

interface Props {
    route: HomeScreenRouteProp;
}

const UserDetails:React.FC<Props> = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.images[0]?.url }} style={styles.avatar} />
      <Text style={styles.name}>{user.display_name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#ccc',
  },
});