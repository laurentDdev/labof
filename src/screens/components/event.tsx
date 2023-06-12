import React, {useContext, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '@rneui/base';

type props = {
  name: string;
  author_id: number;
  desc: string;
  endEvent: string;
  id: number;
  image: string;
  nbPlace: number;
  repeatEvent: string;
  startEvent: string;
  type: string;
  openModal: any;
};

import {API_STATIC, API_URL} from '@env';
import userContext from '../../context/user.context';
import {Icon} from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import eventContext from '../../context/event.context';
const apiStatic = API_STATIC;
const apiUrl = API_URL;
const Event = ({
  id,
  name,
  desc,
  author_id,
  image,
  nbPlace,
  type,
  startEvent,
  endEvent,
  repeatEvent,
  openModal,
}: props) => {
  const user = useContext(userContext);
  const events = useContext(eventContext);
  const [editMode, setEditMode] = useState(false);
  const [newDesc, setNewDesc] = useState(desc);
  const [newName, setNewName] = useState(name);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    axios
      .delete(`${apiUrl}/event/${id}/${author_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(res => {
        events.setEvents(
          events.events.filter(
            event => Number(event.id) !== Number(res.data.id),
          ),
        );
      })
      .catch(err => {
        console.log(err);
        user.setLogin(false);
      });
  };

  const handleEdit = async () => {
    const token = await AsyncStorage.getItem('@access_token');

    setEditMode(prevState => !prevState);
    if (editMode) {
      axios
        .patch(
          `${apiUrl}/event/${id}`,
          {
            name: newName,
            desc: newDesc,
          },
          {
            headers: {
              authorization: token,
            },
          },
        )
        .then(res => {
          console.log(res);
          const currentEvent = events.events.find(event => event.id == id);
          currentEvent.name = newName;
          currentEvent.desc = newDesc;
          events.setEvents([...events.events]);
        })
        .catch(err => {
          console.log(err);
          user.setLogin(false);
        });
    }
  };

  return (
    <View
      style={{
        height: 400,
        width: '100%',
        backgroundColor: '#323232',
        padding: 10,
        borderRadius: 10,
      }}>
      <View>
        <Image
          style={{height: 200, width: '100%', borderRadius: 10}}
          source={{uri: `${apiStatic}/event/${image}.png`}}
          resizeMode={'cover'}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {editMode ? (
            <View>
              <Text style={{color: 'white'}}>Nouveau nom</Text>
              <TextInput
                value={editMode ? newName : name}
                onChangeText={text => setNewName(text)}
                style={{
                  color: '#bfbfbf',
                  borderColor: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                }}
              />
            </View>
          ) : (
            <Text style={styles.headerText}>{name}</Text>
          )}
          <View style={{flexDirection: 'row', gap: 5}}>
            {user.userData.id === author_id && (
              <>
                <TouchableOpacity onPress={handleEdit}>
                  <Icon
                    name={'edit'}
                    color={editMode ? 'crimson' : '#212020'}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                  <Icon name={'delete'} color={'#212020'} size={30} />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => openModal(true)}>
              <Icon name={'share'} color={'#212020'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {editMode ? (
            <View>
              <Text style={{color: 'white'}}>Nouvelle description</Text>
              <TextInput
                value={editMode ? newDesc : desc}
                onChangeText={text => setNewDesc(text)}
                style={{
                  color: '#bfbfbf',
                  borderColor: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                }}
              />
            </View>
          ) : (
            <Text style={{color: '#bfbfbf', fontSize: 15, fontWeight: 'bold'}}>
              {desc}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 5,
        }}>
        {!editMode && (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Icon name={'lock-clock'} color={'#bfbfbf'} />
            <Text style={{color: '#bfbfbf', width: '60%'}}>
              du {new Date(startEvent).toLocaleDateString()} au{' '}
              {new Date(endEvent).toLocaleDateString()}{' '}
              {new Date(startEvent).toLocaleDateString() !==
                new Date(endEvent).toLocaleDateString() &&
                `tous les ${repeatEvent}`}
            </Text>
          </View>
        )}
        {!editMode && (
          <TouchableOpacity
            style={{backgroundColor: '#D63031', padding: 10, borderRadius: 4}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Je participe
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Event;
