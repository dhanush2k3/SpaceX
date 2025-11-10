import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { generatePkcePair } from './pkceUtils';

export async function redirectToSpotifyLogin() {
    const { codeVerifier, codeChallenge } = generatePkcePair();

    if (!codeVerifier || !codeChallenge) {
        throw new Error('PKCE generation failed!');
    }

    await AsyncStorage.setItem('verifier', codeVerifier);

    const params = new URLSearchParams({
        client_id : "78362941aec74e02ad4588986ea6c1f1",
        response_type : 'code',
        redirect_uri : 'melofy://callback',
        code_challenge_method: 'S256',
        code_challenge : codeChallenge,
        scope: 'user-read-private user-read-email',
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`
    Linking.openURL(authUrl);
}
