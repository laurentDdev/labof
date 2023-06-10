import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = API_URL;
const AfterEventScreen = () => {
  useEffect(() => {
    AsyncStorage.getItem('@access_token').then(token => {
      axios
        .get(`${apiUrl}/event/all`, {
          headers: {
            authorization: token,
          },
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <Text style={{color: 'white'}}>After</Text>
    </View>
  );
};

export default AfterEventScreen;
