import { useEffect } from "react";
import { Linking  } from "react-native";
// import { exchangeCodeForToken } from "../../auth/callBackHandler";
import { saveSpotifyToken } from "../../utlity/keyChainUtil";
import { fetchSpotifyUserProfile } from "../../auth/spotify";
import { RootStackParamList } from "../../types/types";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { melofyApi, useExchangeCodeForAccessTokenMutation } from "./melofyApi";
import { useDispatch, UseDispatch } from "react-redux";
import scheduleTokenRefresh from "./scheduleTokenRefresh";
import { useGetSpotifyUserQuery } from "./spotifyUserApi";

const useSpotifyRedirectHandler = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [ exchangeCodeForAccessToken ] = useExchangeCodeForAccessTokenMutation();
    const dispatch = useDispatch();
    // const { data: user, isLoading, isSuccess } = useGetSpotifyUserQuery();

    
   useEffect(() => {
    const handleurl = async ({ url }: { url: string }) => {
        const codeMatch = url.match(/code=([^&]+)/);
        const code = codeMatch?.[1];

        if (code) {
            const verifier = await AsyncStorage.getItem('verifier');
            console.log('verifier', verifier);
            if (!verifier) {
                console.error('Missing code verifier');
                return;
            }

            const tokenResponse = await exchangeCodeForAccessToken({ code, verifier }).unwrap();
            const { access_token, refresh_token, expires_in } = tokenResponse;

            if (access_token) {
                await AsyncStorage.multiSet([
                    ['access_token', access_token],
                    ['refresh_token', refresh_token],
                    ['access_token_expiry', (Date.now() + expires_in * 1000).toString()],
                ]);
                console.log('Access token:', access_token);
                console.log('Refresh token:', refresh_token);
                await saveSpotifyToken(access_token);
                // const user = await fetchSpotifyUserProfile();
                navigation.navigate('UserProfile');
            }
            await scheduleTokenRefresh(dispatch);
        }
    };

    const subscription = Linking.addEventListener('url', handleurl);

    return () => {
        subscription.remove();
    };
}, []);

}

export default useSpotifyRedirectHandler;