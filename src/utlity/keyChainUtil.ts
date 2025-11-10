import * as keychain from 'react-native-keychain';

//Saving the token
export const saveSpotifyToken = async (token: string) => {
  try {
    const result = await keychain.setGenericPassword('access_token', token);
    console.log('Token saved to Keychain:', result);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

//Retriving the token 
export const getSpotifyToken = async (): Promise<string | null> => {
    const credentials = await keychain.getGenericPassword();
    console.log('Retrieved credentials:', credentials);
    if(credentials){
        return credentials.password
    }
    return null;
}


export const deleteSpotifyToken = async () => {
  console.log('called delete')
    await keychain.resetGenericPassword();
}