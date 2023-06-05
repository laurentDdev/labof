import React, {useState} from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Background from '../../assets/bg/bg3.jpg';
import {Icon} from '@rneui/themed';
const RegisterScreen = () => {
  const [passwordView, setPasswordView] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
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
        <Button title={"S'inscrire"} color={'#6c5ce7'} />
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
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
  icon: {
    padding: 10,
  },
});

export default RegisterScreen;
