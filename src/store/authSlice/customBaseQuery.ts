  import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
  import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
  } from '@reduxjs/toolkit/query';
  import { getSpotifyToken } from '../../utlity/keyChainUtil';

  const customBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  > = async (args, api, extraOptions) => {
    const token = await getSpotifyToken();

    const rawBaseQuery = fetchBaseQuery({
      baseUrl: 'https://api.spotify.com/v1',
      prepareHeaders: (headers) => {
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          console.log('Header set with token:', token);
        } else {
          console.warn('No token found for header');
        }
        return headers;
      },
    });

    const result = await rawBaseQuery(args, api, extraOptions);
    console.log('Raw base Query Result :',result);
    return result;
  };

  export default customBaseQuery;