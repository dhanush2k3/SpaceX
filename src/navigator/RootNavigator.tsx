import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import HomePage from '../screens/SpaceX/HomePage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import RocketDetail from '../screens/SpaceX/RocketDetail';
import LaunchesList from '../screens/SpaceX/LaunchesList';
import LaunchDetail from '../screens/SpaceX/LaunchDetail';
import HistoryList from '../screens/SpaceX/HistoryList';
import HistoryDetail from '../screens/SpaceX/HistoryDetail';
import RocketsList from '../screens/SpaceX/RocketsList';


const Stack = createNativeStackNavigator<RootStackParamList>();

console.log('Registered screens: HomePage and RocketDetail');
console.log('RootNavigator mounted. Stack screens:', Stack);
const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RocketDetail"
            component={RocketDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LaunchesList"
            component={LaunchesList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LaunchDetail"
            component={LaunchDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HistoryList"
            component={HistoryList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HistoryDetail"
            component={HistoryDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='RocketsList' 
            component={RocketsList}
            options={{headerShown : false}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
