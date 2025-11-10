import { configureStore } from "@reduxjs/toolkit";
import { spacexApi } from "./SpaceXQuery/spacexApi";


export const store = configureStore({
    reducer:{
        [spacexApi.reducerPath] : spacexApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(spacexApi.middleware)
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;