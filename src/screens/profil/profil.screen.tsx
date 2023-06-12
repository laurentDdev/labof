import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import userContext from '../../context/user.context';

// @ts-ignore
import {API_STATIC, API_URL} from '@env';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = API_URL;

const apiStatic = API_STATIC
const ProfilScreen = ({navigation}: any) => {
  const {userData,setLogin}: any = useContext(userContext);
  const [myEvent, setMyEvent] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@access_token').then(token => {
      axios.get(`${apiUrl}/event/my`, {
        headers: {
          authorization: token
        }
      })
        .then(res => {
          setMyEvent(res.data.events)
        }).catch(err => {
          console.log(err);
          setLogin(false)
      })
    })

  }, [])

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <View style={styles.profileHeader}>
        <View>
          <Image
            source={{uri: `${apiStatic}/profile/${userData.avatar}.png`}}
            resizeMode={'cover'}
            style={styles.profileHeaderImage}
          />
          <Text style={styles.profileHeaderText}>{userData.pseudo}</Text>
        </View>
        <View style={{gap: 10}}>
          <Text style={{color: '#bfbfbf'}}>
            {userData.bio && userData.bio.length > 0
              ? userData.bio
              : 'Aucune biographie'}
          </Text>
          <Button
            title={'Modifier mon profile'}
            onPress={() => navigation.navigate('edit-profile')}
            color={'rgba(214,48,49,0.46)'}
          />
        </View>
      </View>
      <View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    padding: 40,
    gap: 10,
  },
  profileHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileHeaderImage: {
    width: 70,
    height: 70,
  },
});

export default ProfilScreen;
