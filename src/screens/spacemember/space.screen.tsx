import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// @ts-ignore
import Background from '../../assets/bg/bg2.jpg';
const SpaceScreen = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Background}
        resizeMode={'cover'}
        style={styles.background}>
        <Text style={styles.title}>
          Bienvenue dans ton application d'évenements
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('login')}>
            <Text style={styles.btnTxt}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('register')}>
            <Text style={styles.btnTxt}>S' inscrire</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  background: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  btns: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  btn: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
    padding: 10,
  },
  btnTxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
export default SpaceScreen;
