import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AfterEventScreen from '../event/afterevent.screen';
import ProfilScreen from '../profil/profil.screen';
import TopbarNavigation from './topbar.navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Button,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import EditProfileScreen from '../profil/editProfile.screen';
import AddEventScreen from '../event/addEvent.screen';
import userContext from '../../context/user.context';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = API_URL;

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();


const MyCustomStackHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={{alignItems: 'flex-start', backgroundColor: '#202020', height: 40}}>
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <Icon name={'arrow-back'} color={'white'} />
      </TouchableOpacity>
    </View>
  )
}

const MyStackProfile = () => (
  <Stack.Navigator initialRouteName={'profile'} >
    <Stack.Screen
      name={'profile'}
      component={ProfilScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name={'edit-profile'}  component={EditProfileScreen} options={{header: MyCustomStackHeader}}  />
  </Stack.Navigator>
);

const CustomDrawer = props => {
  const user = useContext(userContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@access_token');
    user.setLogin(false);
    user.setUserData({});
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{padding: 20}}>
          <Image
            source={{
              uri: `http://10.0.2.2:3000/profile/${user.userData.avatar}.png`,
            }}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {user.userData.pseudo}
          </Text>
        </View>
        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={handleLogout} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'logout'} color={'white'} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: 'white',
              }}>
              Se deconnecter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={'topbar'}
      defaultStatus={'closed'}
      screenOptions={{
        drawerType: 'slide',
        swipeEnabled: true,
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#323232',
        },
        drawerLabelStyle: {
          color: 'white',
        },
        drawerPosition: 'left',
      }}>
      <Drawer.Screen
        name={'topbar'}
        component={TopbarNavigation}
        options={{
          drawerLabel: 'A Venir',
          drawerIcon: ({color, focused, size}) => (
            <Icon
              color={focused ? 'rgb(214,48,49)' : 'white'}
              size={size}
              name={'calendar-today'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'add-event'}
        component={AddEventScreen}
        options={{
          drawerLabel: 'Ajoutez un event',
          drawerIcon: ({color, focused, size}) => (
            <Icon
              color={focused ? 'rgb(214,48,49)' : 'white'}
              size={size}
              name={'my-library-add'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'stackprofile'}
        component={MyStackProfile}
        options={{
          drawerLabel: 'Mon profil',
          drawerIcon: ({color, focused, size}) => (
            <Icon
              color={focused ? 'rgb(214,48,49)' : 'white'}
              size={size}
              name={'edit'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
