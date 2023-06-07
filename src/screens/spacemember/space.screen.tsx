import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import Logo from '../../assets/logo.png';
const SpaceScreen = ({navigation}: any) => {
  return (
    <View style={{flex: 1, backgroundColor: '#202020', alignItems: 'center'}}>
      <View style={{height: 400, justifyContent: 'center'}}>
        <Image source={Logo} resizeMode={'cover'} />
      </View>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 40,
            textAlign: 'center',
          }}>
          FestiMate
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center',
            width: 250,
            color: '#BFBFBF',
          }}>
          Découvrer notre app d’évènement et connectez-vous
        </Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={{
            ...styles.btn,
            borderTopStartRadius: 10,
            borderBottomEndRadius: 10,
          }}
          onPress={() => navigation.navigate('login')}>
          <Text style={styles.btnTxt}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.btn,
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
          }}
          onPress={() => navigation.navigate('register')}>
          <Text style={styles.btnTxt}>S' inscrire</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  btns: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    padding: 35,
  },
  btn: {
    backgroundColor: 'rgba(214,48,49,0.46)',
    padding: 10
  },
  btnTxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
});
export default SpaceScreen;
