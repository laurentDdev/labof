import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eventContext from '../../context/event.context';
import userContext from '../../context/user.context';
import { Calendar } from 'react-native-big-calendar'

const events = [
    {
        title: 'Meeting',
        start: new Date(2020, 1, 11, 10, 0),
        end: new Date(2020, 1, 11, 10, 30),
    },
    {
        title: 'Coffee break',
        start: new Date(2020, 1, 11, 15, 45),
        end: new Date(2020, 1, 11, 16, 30),
    },
]

const apiUrl = API_URL;

const TrackEventScreen = () => {
  const eventTrack = useContext(eventContext);
  const user = useContext(userContext);
  const [eventCalendar, setEventCalendar] = useState([]);

  useEffect(() => {
      console.log(eventTrack.eventTrack)
      eventTrack.eventTrack.forEach(ev => {
          setEventCalendar([...eventCalendar, {title: ev.name, start : new Date(ev.startEvent), end: new Date(ev.endEvent)}])
      })
  }, [eventTrack])

  useEffect(() => {
    AsyncStorage.getItem('@access_token').then(token => {
      axios
        .get(`${apiUrl}/event/track`, {
          headers: {
            authorization: token,
          },
        })
        .then(res => {
          console.log(res.data);
          eventTrack.setEventTrack(res.data.trackedEvent);
        })
        .catch(err => {
          console.log(err);
          user.setLogin(false);
        });
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
        <Calendar bodyContainerStyle={styles.calendar} showTime={false} ampm={true} swipeEnabled={true} mode={'month'} events={eventCalendar} height={600} />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        marginBottom: 10,
    },
});
export default TrackEventScreen;
