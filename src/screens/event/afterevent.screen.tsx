import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userContext from '../../context/user.context';
import eventContext from '../../context/event.context';
import Event from '../components/event';
import {BottomSheet, ListItem, Button} from '@rneui/themed';
import Contact from "../components/contact";

const apiUrl = API_URL;
const AfterEventScreen = () => {
  const user = useContext(userContext);
  const events = useContext(eventContext);

  const [isLoading, setIsLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem('@access_token').then(token => {
      axios
        .get(`${apiUrl}/event/all`, {
          headers: {
            authorization: token,
          },
        })
        .then(res => {
          console.log(res.data.events);
          events.setEvents(res.data.events);

          setIsLoading(false);
          console.log('test');
        })
        .catch(err => {
          user.setLogin(false);
          console.log(err);
        });
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{padding: 15}}>
          {events.events.length > 0 ? (
            <FlatList
              contentContainerStyle={{gap: 10}}
              data={events.events}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Event {...item} openModal={setIsVisible} />}
            />
          ) : (
            <Text style={{color: 'white', textAlign: 'center'}}>
              Aucun évènement a venir
            </Text>
          )}
        </View>
      )}
      <Text style={{color: 'white'}}>{isVisible}</Text>
      <BottomSheet onBackdropPress={() => setIsVisible(false)} modalProps={{}} isVisible={isVisible}>
        
      </BottomSheet>
    </View>
  );
};

export default AfterEventScreen;
