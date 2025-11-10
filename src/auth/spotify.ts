import { getSpotifyToken } from "../utlity/keyChainUtil";

export const fetchSpotifyUserProfile = async () => {
  try{

    const accessToken = await getSpotifyToken(); 

    console.log('access token from profile fetch', accessToken)

    if(accessToken === null){
      console.log('no access token in keychain')
      return
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      const text = await response.text(); 
      console.error('Spotify API error:', text);
      return;
    }

    const data = await response.json();
    console.log('Spotify profile response:', data);
    return data;
  }
  catch(err){
    console.log('This is the error from profile fetch',err)
  }
};