/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SpaceScreen from "./src/screens/spacemember/space.screen";
import LoginScreen from "./src/screens/spacemember/login.screen";
import RegisterScreen from "./src/screens/spacemember/register.screen";







function App(): JSX.Element {

  const Stack = createNativeStackNavigator()


  return (
    <Stack.Navigator initialRouteName={'space'} screenOptions={{headerShown: false}}>
      <Stack.Screen name={'space'} component={SpaceScreen} />
      <Stack.Screen name={'login'} component={LoginScreen} />
      <Stack.Screen name={'register'} component={RegisterScreen} />
    </Stack.Navigator>
  );
}


export default App;
