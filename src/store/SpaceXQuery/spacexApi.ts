import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Launch,  Rocket , History  } from "../../types/types";

export const spacexApi = createApi({
    reducerPath : 'spacexApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://api.spacexdata.com/v4/',
    }),
    endpoints:(builder) =>({
        getLaunches : builder.query<Launch[] , void>({
         query: () => '/launches',
        }),
        getLaunchById: builder.query<Launch , void>({
            query: (id) => `launches/${id}`
        }),
        getRockets : builder.query<Rocket[] , void>({
            query: () => 'rockets',
        }),
        getHistory: builder.query<History[] , void>({
            query: () => 'history'
        })
    }),
});


export const {
     useGetLaunchesQuery ,
     useGetLaunchByIdQuery ,
     useGetRocketsQuery,
    useGetHistoryQuery} = spacexApi