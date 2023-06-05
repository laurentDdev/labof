import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// @ts-ignore
import Background from '../../assets/bg/bg3.jpg';
import {Icon} from '@rneui/themed';

import {API_URL} from '@env';
import axios from 'axios';
const RegisterScreen = ({navigation}: any) => {
  const [passwordView, setPasswordView] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messageError, setMessageError] = useState('');
  const url = API_URL

  const handleSubmit = () => {
    if (email.length < 5) {
      return setMessageError('Email invalide');
    }
    if (pseudo.length < 3) {
      return setMessageError('Pseudo invalide');
    }
    if (password.length < 5) {
      return setMessageError('Mot de passe trop court');
    }
    setMessageError('');

    axios
      .post(`${url}/auth/register`, {
        email,
        password,
        pseudo,
      })
      .then(res => {
        if (res.status === 200) {
          setMessageError('');

          navigation.navigate('login');
        }
      })
      .catch(err => {
        if (err.message) {
          setMessageError(err.message);
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Background}
        resizeMode={'cover'}
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 15,
          paddingHorizontal: 15,
        }}>
        <View style={styles.inputView}>
          <Icon name={'perm-identity'} style={styles.icon} />
          <TextInput
            placeholder={'Pseudo'}
            style={styles.input}
            value={pseudo}
            onChangeText={text => setPseudo(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon name={'outgoing-mail'} style={styles.icon} />
          <TextInput
            placeholder={'Email'}
            style={styles.input}
            inputMode={'email'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            name={passwordView ? 'lock-open' : 'lock'}
            style={styles.icon}
            onPress={() => setPasswordView(prevState => !prevState)}
          />
          <TextInput
            placeholder={'Mot de passe'}
            style={styles.input}
            inputMode={'text'}
            secureTextEntry={!passwordView}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <Button title={"S'inscrire"} color={'#6c5ce7'} onPress={handleSubmit} />
        {messageError.length > 0 && (
          <Text style={{color: 'red', fontSize: 20}}>{messageError}</Text>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#424242',
  },
  icon: {
    padding: 10,
  },
});

export default RegisterScreen;
