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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AfterEventScreen from "./src/screens/event/afterevent.screen";
import TrackEventScreen from "./src/screens/event/trackEvent.screen";

function App(): JSX.Element {
  const apiUrl = API_URL;
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Topbar = createMaterialTopTabNavigator();

  const [loading, setLoading] = useState(true);
  const {login, setLogin} = useContext(userContext);

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
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkIsConnecting();
  }, []);

  const MyTopBar = () => (
    <Topbar.Navigator initialRouteName={'afterevent'} screenOptions={{tabBarStyle: {backgroundColor: '#202020'}, tabBarIndicatorStyle: {backgroundColor: 'white'},tabBarLabelStyle: {fontWeight:'bold',fontSize: 14,color: '#bfbfbf',textTransform: 'capitalize'}}}>
      <Topbar.Screen name={'afterevent'}  component={AfterEventScreen} options={{tabBarLabel: 'A venir'}} />
      <Topbar.Screen name={'trackevent'} component={TrackEventScreen} options={{tabBarLabel: 'Suivie'}}/>
    </Topbar.Navigator>
  )

  return (
    <>
      <StatusBar backgroundColor={'#202020'} />
      {!login ? (
        <Stack.Navigator
          initialRouteName={'space'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={'space'}  component={SpaceScreen} />
          <Stack.Screen name={'login'} component={LoginScreen} />
          <Stack.Screen name={'register'} component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          initialRouteName={'topbar'}
          defaultStatus={'open'}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: 'white',
              zIndex: 100,
            },
            drawerPosition: 'left',
          }}>
          <Drawer.Screen name={'topbar'}  component={MyTopBar} />
          <Drawer.Screen name={'profil'} component={ProfilScreen} />

        </Drawer.Navigator>
      )}
    </>
  );
}

export default App;
