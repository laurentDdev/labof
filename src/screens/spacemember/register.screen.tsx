import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// @ts-ignore
import Conffeti from '../../assets/auth/conffeti.png';
// @ts-ignore
import Trai from '../../assets/auth/trai.png';

import {Icon} from '@rneui/themed';
// @ts-ignore
import {API_URL} from '@env';
import axios from 'axios';
const RegisterScreen = ({navigation}: any) => {
  const [passwordView, setPasswordView] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messageError, setMessageError] = useState('');
  const url = API_URL;

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
        if (err.response.data.message) {
          setMessageError(err.response.data.message);
        }
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <Image
        source={Conffeti}
        resizeMode={'cover'}
        style={{transform: [{scaleX: -1}]}}
      />
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
            S'inscrire
          </Text>
          <Text style={{color: '#bfbfbf', fontWeight: 'bold', fontSize: 12}}>
            Veuillez vous inscrire pour continuer
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
          <Icon color={'#bfbfbf'} name={'perm-identity'} style={styles.icon} />
          <TextInput
            placeholderTextColor={'#bfbfbf'}
            placeholder={'Pseudo'}
            style={styles.input}
            value={pseudo}
            onChangeText={text => setPseudo(text)}
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
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
          }}
          onPress={() => handleSubmit()}>
          <Text style={styles.btnTxt}>S' inscrire</Text>
        </TouchableOpacity>
        {messageError.length > 0 && (
          <Text style={{color: 'red', fontSize: 20}}>{messageError}</Text>
        )}
      </View>
      <View style={{alignItems: 'flex-end', zIndex: -1}}>
        <Image
          source={Trai}
          resizeMode={'cover'}
          style={{transform: [{scaleX: -1}]}}
        />
      </View>
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
    color: '#bfbfbf',
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

export default RegisterScreen;
