import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userContext from "../../context/user.context";
import eventContext from "../../context/event.context";
import Event from "../components/event";

const apiUrl = API_URL;
const AfterEventScreen = () => {

  const user = useContext(userContext);
  const events = useContext(eventContext);

  const [isLoading, setIsLoading] = useState(true)

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
          events.setEvents(res.data.events)

          setIsLoading(false)
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
      {isLoading ? <ActivityIndicator  /> : (
          <View style={{padding: 15}}>
            {events.events.length > 0 ? (
              <FlatList data={events.events} keyExtractor={(item) => item.id} renderItem={({item}) => <Event {...item} />} />

            ): (
              <Text style={{color: 'white', textAlign: 'center'}}>Aucun évènement a venir</Text>
            )}
          </View>
        )}
      </View>
  );
};

export default AfterEventScreen;
