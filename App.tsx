/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpaceScreen from './src/screens/spacemember/space.screen';
import LoginScreen from './src/screens/spacemember/login.screen';
import RegisterScreen from './src/screens/spacemember/register.screen';
import {StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import userContext from './src/context/user.context';

// @ts-ignore
import {API_URL} from '@env';
import ProfilScreen from './src/screens/profil/profil.screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AfterEventScreen from './src/screens/event/afterevent.screen';
import TrackEventScreen from './src/screens/event/trackEvent.screen';
import SplashScreen from './src/screens/splash.screen';
import DrawerNavigation from './src/screens/navigation/drawer.navigation';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Topbar = createMaterialTopTabNavigator();
function App(): JSX.Element {
  const apiUrl = API_URL;

  const [loading, setLoading] = useState(true);
  const {login, setLogin, setUserData} = useContext(userContext);

  const checkIsConnecting = async () => {
    const token = await AsyncStorage.getItem('@access_token');

    console.log(token);
    if (!token) {
      setLogin(false);
      setLoading(false);
      return;
    }

    axios
      .post(
        `${apiUrl}/auth/autologin`,
        {},
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then(res => {
        setLoading(false);
        setLogin(true);
        setUserData(res.data.user);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setLogin(false);
      });
  };

  useEffect(() => {
    checkIsConnecting();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'#202020'} />
      <NavigationContainer>
        {loading ? (
          <SplashScreen />
        ) : !login ? (
          <Stack.Navigator
            initialRouteName={'space'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name={'space'} component={SpaceScreen} />
            <Stack.Screen name={'login'} component={LoginScreen} />
            <Stack.Screen name={'register'} component={RegisterScreen} />
          </Stack.Navigator>
        ) : (
          <DrawerNavigation />
        )}
      </NavigationContainer>
    </>
  );
}

export default App;
