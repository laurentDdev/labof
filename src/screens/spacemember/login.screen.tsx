import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';
// @ts-ignore

import Conffeti from '../../assets/auth/conffeti.png';
// @ts-ignore
import Trai from '../../assets/auth/trai.png';

// @ts-ignore
import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userContext from "../../context/user.context";
const LoginScreen = () => {
  const [passwordView, setPasswordView] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messageError, setMessageError] = useState('');
  const user = useContext(userContext);
  const apiurl = API_URL;
  const handleLogin = () => {
    axios
      .post(`${apiurl}/auth/login`, {
        email,
        password,
      })
      .then(async res => {
        try {
          const token = res.headers.authorization;
          console.log(token);
          await AsyncStorage.setItem('@access_token', token);
          setMessageError('');
          user.setLogin(true)
        } catch (e) {
          console.log(e);
          setMessageError('Veuillez tentez de vous reconnecter');
        }
      })
      .catch(err => {
        console.log(err.response.data);
        if (err.response.data.message) {
          setMessageError(err.response.data.message);
        }
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <View style={{alignItems: 'flex-end'}}>
        <Image source={Conffeti} resizeMode={'cover'} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          gap: 17,
          padding: 35,
          marginTop: 10,
        }}>
        <View>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
            Se connecter
          </Text>
          <Text style={{color: '#bfbfbf', fontWeight: 'bold', fontSize: 12}}>
            Veuillez vous connecter pour continuer
          </Text>
        </View>
        <View style={styles.inputView}>
          <Icon color={'#bfbfbf'} name={'outgoing-mail'} style={styles.icon} />
          <TextInput
            placeholderTextColor={'#bfbfbf'}
            placeholder={'Email'}
            style={styles.input}
            inputMode={'email'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Icon
            color={'#bfbfbf'}
            name={passwordView ? 'lock-open' : 'lock'}
            style={styles.icon}
            onPress={() => setPasswordView(prevState => !prevState)}
          />
          <TextInput
            placeholderTextColor={'#bfbfbf'}
            placeholder={'Mot de passe'}
            style={styles.input}
            inputMode={'text'}
            secureTextEntry={!passwordView}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.btn,
            borderTopStartRadius: 10,
            borderBottomEndRadius: 10,
          }}
          onPress={() => handleLogin()}>
          <Text style={styles.btnTxt}>Se connecter</Text>
        </TouchableOpacity>
        {messageError.length > 0 && (
          <Text style={{color: 'red', fontSize: 20}}>{messageError}</Text>
        )}
      </View>
      <Image source={Trai} resizeMode={'cover'} style={{zIndex: -1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#bfbfbf',
  },
  icon: {
    padding: 10,
  },
  btn: {
    backgroundColor: 'rgba(214,48,49,0.46)',
    padding: 10,
  },
  btnTxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LoginScreen;
