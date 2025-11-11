import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CLIENT_ID = "CLIENT_ID";
const CLIENT_SECRET = "CLIENT_SECRET";

export interface Melofy{
    token: string | null;
    artist: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const SpotifyApi = createApi({
    reducerPath:'SpotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://api.spotify.com/v1/' , 
        prepareHeaders:async (headers) =>{
            const tokenRes = await fetch('https://accounts.spotify.com/api/token',{
                method:'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            }) 
            const tokenData = await tokenRes.json();
            console.log(tokenData);
            headers.set('Authorization',`Bearer ${tokenData.access_token}`);
            return headers;
        },
    }),
    endpoints:(builder) =>( {
        getArtistById: builder.query<any,String>({
            query: (artistId) =>  `artists/${artistId}`
        }),
    })
})

export const { useGetArtistByIdQuery  } = SpotifyApi;
