import React from "react";
import { Button, Text, View } from "react-native";

const ProfilScreen = ({navigation}) => {
  console.log(navigation);
  return (
    <View>
      <Text>Profil</Text>
      <Button title={"open drawer"} onPress={() => navigation.openDrawer()}></Button>
    </View>
  );
};

export default ProfilScreen;
