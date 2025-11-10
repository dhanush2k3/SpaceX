import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
// import {SPOTIFY_CLIENT_ID , SPOTIFY_CLIENT_SECRET } from  '@env';

const CLIENT_ID = "6389c0b253bf40938d767d188caacaa3";
const CLIENT_SECRET = "792d8196f9aa4a2394214b123de93ebc";

export const fetchAccessToken = createAsyncThunk('Melofy/fetchAccessToken', async ()=>{
    const response = await fetch('https://accounts.spotify.com/api/token',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    })
    const data = await response.json();
    console.log(data);
    return data.access_token as string;
})

export const fetchArtistById = createAsyncThunk('Melofy/fetchArtistById',async (artistId:string , {getState})=>{
    const state = getState() as RootState;
    const token = state.Melofy.token;
    if(!token) throw new Error("No access token Available");

    const response  = await fetch(`https://api.spotify.com/v1/artists/${artistId}`,{
        headers:{
            Authorization : `Bearer ${token}`,
        },
    });

    const artistData = await response.json();
    console.log(artistData);
    return artistData;
})


interface MelofyState {
  token: string | null;
  artist: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MelofyState = {
  token: null,
  artist:null,
  status: 'idle',
};

const MelofySlice = createSlice({
    name : 'Melofy',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchAccessToken.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchAccessToken.fulfilled , (state , action) =>{
            state.status = 'succeeded';
            state.token =action.payload;
        })
        .addCase(fetchAccessToken.rejected , (state) => {
            state.status = 'failed';
            state.token = null;
        })
        .addCase(fetchArtistById.fulfilled , (state ,action)=> {
            state.artist=action.payload
        })
    },
})


export const SelectMelofyToken = (state : RootState) => state.Melofy.token;
export const SelectArtist = (state:RootState) => state.Melofy.artist;
export default MelofySlice.reducer;