import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const CLIENT_ID = "6389c0b253bf40938d767d188caacaa3";
const CLIENT_SECRET = "792d8196f9aa4a2394214b123de93ebc";

export const AccessTokenApi =  createApi({
    reducerPath:"AccessTokenApi",
    baseQuery: fetchBaseQuery({baseUrl:'https://accounts.spotify.com/api/'}),
    endpoints:(builder) => ({
        getAccessToken: builder.query<{access_token:string},void>({
            query:() => ({
                url:'token',
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:`grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            })
        }) 
    })
})

export  const {useGetAccessTokenQuery} = AccessTokenApi;