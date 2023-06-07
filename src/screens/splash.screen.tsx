import React from "react";
import { Image, Text, View } from "react-native";
import Logo from "../assets/logo.png";

const SplashScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#202020',alignItems: 'center', justifyContent: 'center'}}>
      <Image source={Logo} resizeMode={'cover'} />
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 50}}>FestiMate</Text>
    </View>
  );
};

export default SplashScreen;
