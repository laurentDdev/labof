import React, {useState} from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet, Text,
  TextInput,
  View
} from "react-native";
// @ts-ignore
import Background from '../../assets/bg/bg1.jpg';
import {Icon} from '@rneui/themed';

const LoginScreen = () => {
  const [passwordView, setPasswordView] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Bienvenue</Text>
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
        <Button title={'Se connecter'} color={'#6c5ce7'} />
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

export default LoginScreen;
