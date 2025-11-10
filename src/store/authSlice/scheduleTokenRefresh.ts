import { melofyApi } from "./melofyApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../store";

const scheduleTokenRefresh = async (dispatch: AppDispatch) => {
  const expiry = await AsyncStorage.getItem('access_token_expiry');
  const refresh_token = await AsyncStorage.getItem('refresh_token');

    console.log("Refresh Token : " , refresh_token);

  if (!expiry || !refresh_token) return;

  const timeUntilRefresh = parseInt(expiry) - Date.now() - 5 * 60 * 1000;

  if (timeUntilRefresh > 0) {
    setTimeout(() => {
      dispatch(melofyApi.endpoints.refreshAccessToken.initiate({ refresh_token }));
    }, timeUntilRefresh);
  } else {
    // Token already expired or close to expiry, refresh immediately
    dispatch(melofyApi.endpoints.refreshAccessToken.initiate({ refresh_token }));
  }
};

export default scheduleTokenRefresh;