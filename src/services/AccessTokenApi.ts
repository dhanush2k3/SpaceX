import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const CLIENT_ID = "CLIENT_ID";
const CLIENT_SECRET = "CLIENT_SECRET";

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
