import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { getSpotifyToken, saveSpotifyToken } from "../../utlity/keyChainUtil";

const SPOTIFY_CLIENT_ID = "78362941aec74e02ad4588986ea6c1f1";
const REDIRECT_URI = "melofy://callback";


export const melofyApi = createApi({
    reducerPath:'melofyApi',
    baseQuery: fetchBaseQuery({
       baseUrl:'https://accounts.spotify.com',
       prepareHeaders: async (headers) =>{
        const token = await getSpotifyToken(); 
        if(token) headers.set(`Authorization`,`Bearer ${token}`);
        return headers;
       },
    }),
    endpoints:(builder) =>({ 
        exchangeCodeForAccessToken: builder.mutation<{access_token:string , refresh_token :string , expires_in: number;},{code:string , verifier:string}>({
            query: ({code, verifier}) =>({
                url:'/api/token',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({
                    client_id:SPOTIFY_CLIENT_ID,
                    grant_type:'authorization_code',
                    code,
                    redirect_uri:REDIRECT_URI,
                    code_verifier:verifier,
                }).toString(),
            }),
            transformResponse: async (response :any) =>{

                if (!response.access_token) {
                    console.error('Access token missing from response',response);
                }

                const token = response.access_token;
                if(token){
                    await saveSpotifyToken(token);
                }
                
                return response;
            },
        }),
        refreshAccessToken: builder.mutation<{ access_token: string }, { refresh_token: string }>({
            query: ({ refresh_token }) => ({
                url: '/api/token',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token,
                client_id: SPOTIFY_CLIENT_ID,
            }).toString(),
            }),
            transformResponse: async (response: any) => {
                const { access_token, expires_in } = response;

                const expiryTimestamp = Date.now() + expires_in * 1000; // Storing in MilliSeconds

                await AsyncStorage.multiSet([
                    ['access_token', access_token],
                    ['access_token_expiry', expiryTimestamp.toString()],
                ]);

                console.log('Spotify Refresh Token: ',response);
                
            return response;
        },
        }),
    }),
}) 

export const {useExchangeCodeForAccessTokenMutation  , useRefreshAccessTokenMutation} = melofyApi;