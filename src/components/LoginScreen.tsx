import React from 'react';
import { useEffect } from 'react';
import { getSpotifyToken } from '../utlity/keyChainUtil';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { redirectToSpotifyLogin } from '../store/authSlice/redirectToSpotifyLogin';

const LoginScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    await redirectToSpotifyLogin();
    console.log('Login button pressed');
  };

  useEffect(() => {
  const checkToken = async () => {
    const token = await getSpotifyToken();
    if (token) {
      console.log('Token found in Keychain:', token);
      navigation.navigate('UserProfile');
    } else {
      console.log('No token found, stay on login screen');
    }
  };
  checkToken();
}, []);


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.title}>Welcome to Spotify Connect</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login with Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
