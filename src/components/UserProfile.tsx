import React from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { deleteSpotifyToken } from '../utlity/keyChainUtil';
import { useGetSpotifyUserQuery } from '../store/authSlice/spotifyUserApi';

function UserProfile() {
  
  const { data, error, isLoading } = useGetSpotifyUserQuery();

  console.log('Profile data is ', data);

  if (isLoading) return <ActivityIndicator size="large" color="#1DB954" />;

  if (error) return <Text>Error fetching profile</Text>;

  return (
    <View style={{ padding: 20 }}>
      <StatusBar barStyle={'dark-content'} />
      {data ? (
        <>
          <Text>Welcome, {data.display_name}</Text>
          {data.images?.[0]?.url && (
            <Image
              source={{ uri: data.images[0].url }}
              style={{ width: 100, height: 100 }}
            />
          )}
          <Text>Email: {data.email}</Text>
          <Text>Country: {data.country}</Text>
          <Text>Product: {data.product}</Text>
        </>
      ) : (
        <Text>Waiting for Spotify login...</Text>
      )}
      <TouchableOpacity onPress={deleteSpotifyToken}>
        <Text>Delete keys</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserProfile;
