import React, {useContext} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import userContext from '../../context/user.context';

// @ts-ignore
import {API_STATIC} from '@env';

const apiUrl = API_STATIC;
const ProfilScreen = ({navigation}: any) => {
  const {userData}: any = useContext(userContext);

  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <View style={styles.profileHeader}>
        <View>
          <Image
            source={{uri: `${apiUrl}/profile/${userData.avatar}.png`}}
            resizeMode={'cover'}
            style={styles.profileHeaderImage}
          />
          <Text style={styles.profileHeaderText}>{userData.pseudo}</Text>
        </View>
        <View style={{gap: 10}}>
          <Text style={{color: '#bfbfbf'}}>
            {userData.bio && userData.bio.length > 0
              ? userData.bio
              : 'Aucune biographie'}
          </Text>
          <Button
            title={'Modifier mon profile'}
            onPress={() => navigation.navigate('edit-profile')}
            color={'rgba(214,48,49,0.46)'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    padding: 40,
    gap: 10,
  },
  profileHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileHeaderImage: {
    width: 70,
    height: 70,
  },
});

export default ProfilScreen;
