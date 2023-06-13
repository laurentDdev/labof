import React, { useContext, useEffect, useRef, useState } from "react";
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_STATIC} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/themed';
import emailjs from '@emailjs/browser';
import userContext from "../../context/user.context";
const apiUrl = API_URL;
const apiStatic = API_STATIC;

const MyBottomSheet = ({isVisible, setIsVisible, event}) => {
  const user = useContext(userContext)
  const bottomSheetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
      AsyncStorage.getItem('@access_token').then(token => {
        axios
          .get(`${apiUrl}/user/all`, {
            headers: {
              authorization: token,
            },
          })
          .then(res => {
            console.log(res.data.users);
            setUsers(res.data.users);
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }, [isVisible]);

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };


  const RenderUser = ({pseudo, avatar, email}) => {
    const [isSend, setIsSend] = useState(false);const handleSendEmail = (userMail: string, pseudo: string) => {
      const to = userMail;
      const paramData = {
        to_email: userMail,
        by_pseudo: user.userData.pseudo,
        to_name: pseudo,
        message: `tu a été invité a l'evenement ${event.name} par ${user.userData.pseudo} le ${new Date(event.startEvent).toLocaleDateString()}`
      }

      emailjs.send('service_vqq7j1e','template_de7ltt7',paramData,'CC65Jr390ZTa5m4pK').then(res =>  {
        console.log('ok', res);
        setIsSend(true);
      }).catch(err => {
        console.log(err);
      })

    };




    return (
      <View
        style={{
          backgroundColor: '#323232',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Image
            style={{height: 50, width: 50}}
            resizeMode={'cover'}
            source={{uri: `${apiStatic}/profile/${avatar}.png`}}
          />
          <Text style={{color: 'white', fontWeight: 'bold'}}>{pseudo}</Text>
        </View>
        <TouchableOpacity disabled={isSend} onPress={() => handleSendEmail(email, pseudo)}>
          <Icon name={'send'} color={isSend ? 'crimson': 'white'} />
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <RBSheet
      animationType={'slide'}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {backgroundColor: 'transparent'},
        container: {backgroundColor: '#202020', borderRadius: 15},
      }}
      onClose={() => setIsVisible(false)}
      ref={bottomSheetRef}
      height={600}>
      <View style={{flex: 1, padding: 15, gap: 10}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View
              style={{
                backgroundColor: '#323232',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
              }}>
              <TextInput
                style={{color: 'white', fontWeight: 'bold'}}
                value={filtre}
                placeholderTextColor={'white'}
                placeholder={'Recherchez'}
                onChangeText={text => setFiltre(text)}
              />
              <Icon name={'search'} color={'white'} />
            </View>
            <FlatList
              contentContainerStyle={{gap: 10}}
              data={users.filter(u => u.pseudo.toLowerCase().includes(filtre.toLowerCase()))}
              renderItem={({item}) => <RenderUser {...item} />}
              keyExtractor={item => item.id}
            />
          </>
        )}
      </View>
    </RBSheet>
  );
};

export default MyBottomSheet;
