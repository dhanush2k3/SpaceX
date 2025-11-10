import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from './customBaseQuery';

export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
}

export const spotifyUserApi = createApi({
  reducerPath: 'spotifyUserApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getSpotifyUser: builder.query<SpotifyUser, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      transformResponse: (response: SpotifyUser) => {
          console.log('Raw Spotify response:', response);
          const user = response as SpotifyUser;
          return user;
      },
    }),
  }),
});

export const { useGetSpotifyUserQuery } = spotifyUserApi;