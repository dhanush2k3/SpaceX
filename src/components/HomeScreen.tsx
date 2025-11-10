import  { useEffect , useState} from "react";
import React from "react";
import {View , Text , StyleSheet , Image , Button} from 'react-native';
import { useAppDispatch , useAppSelector } from "../hook/hooks";
import { fetchAccessToken , fetchArtistById, SelectArtist, SelectMelofyToken } from "../slices/MelofySlice";
import { useGetArtistByIdQuery } from "../services/SpotifyApi";
import { getSpotifyToken, saveSpotifyToken } from "../utlity/keyChainUtil";
import { useGetAccessTokenQuery } from "../services/AccessTokenApi";

const HomeScreen = () =>{
    // const dispatch = useAppDispatch();

    // const token = useAppSelector(SelectMelofyToken);
    // const artist = useAppSelector(SelectArtist);
    
    // useEffect(()=>{
    //     const loadArtist = async ()=>{
    //         await dispatch(fetchArtistById('7dGJo4pcD2V6oG8kP0tJRR'));
    //     }
    //     loadArtist();
    // },[dispatch]);

    // useEffect(() => {
    //     dispatch(fetchAccessToken());
    // } , [dispatch]) 

    // console.log(artist)
    // console.log(token);

    const {data : token , isSuccess } = useGetAccessTokenQuery();
    console.log('Token:', token);

    console.log('Fetched token from RTK Query:', token?.access_token);
    console.log(token?.access_token);
    const [storedToken , setStoredToken] = useState<string | null>(null);

useEffect(() => {
  const saveToken = async () => {
    if (isSuccess && token?.access_token) {
      console.log('Saving token:', token.access_token);
      await saveSpotifyToken(token.access_token);
    }
  };
  saveToken();
}, [isSuccess, token]);

useEffect(() => {
  const loadToken = async () => {
    const stored = await getSpotifyToken();
    console.log('Loaded token from Keychain:', stored);
    setStoredToken(stored);
  };
  loadToken();
}, []);

    const {data: artist , isLoading , error } = useGetArtistByIdQuery('7dGJo4pcD2V6oG8kP0tJRR');

    if(isLoading)return <Text>Loading...</Text>;
    if(error) return <Text>Error fetching artist</Text>;

    return (
        <View style={styles.container}>
            <Text>Spotify Token :</Text>
            <Text selectable>{storedToken === null ? 'Loading token...' : storedToken}
</Text>
            {artist ? (
        <>
          <Text>{artist.name}</Text>
          <Text>Genres: {artist.genres.join(', ')}</Text>
          <Text>Followers: {artist.followers.total}</Text>
          <Image source={{ uri: artist.images[0].url }} style={{ width: 200, height: 200 }} />
        </>
      ) : (
        <Text>Loading artist...</Text>
      )}
        {/* <Button
  title="Test Keychain"
  onPress={async () => {
    await saveSpotifyToken('test-token');
    const token = await getSpotifyToken();
    console.log('Manual test token:', token);
  }}
/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        padding: 20,
    }
})

export default HomeScreen;