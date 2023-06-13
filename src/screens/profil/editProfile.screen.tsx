import React, {useContext, useState} from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import userContext from '../../context/user.context';
// @ts-ignore
import {API_STATIC, API_URL} from '@env';
import {Icon} from '@rneui/themed';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios/index';

const apiStatic = API_STATIC;
const apiUrl = API_URL;

const EditProfileScreen = ({navigation}) => {
  const user = useContext(userContext);
  const [newPseudo, setNewPseudo] = useState(user.userData.pseudo);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState('image');
  const [newBio, setNewBio] = useState(
    user.userData.bio?.length > 0 ? user.userData.bio : 'Aucune bio',
  );


  const handleCancel = () => {
    setNewImage(null);
    setNewImageName('');
    setNewPseudo(user.userData.pseudo);
    setNewBio(user.userData.bio?.length > 0 ? user.userData.bio : 'Aucune bio');
  };
  const handleChangeProfilePicture = () => {
    launchImageLibrary(
      {selectionLimit: 1, mediaType: 'photo', maxHeight: 500, maxWidth: 300},
      img => {
        if (img) {
          console.log(img);
          console.log('------------------');
          console.log();
          console.log('------------------');
          setNewImageName(img.assets[0].fileName);

          setNewImage(img.assets[0].uri);
        }
      },
    );
  };

  const handleConfirmChange = async () => {
    const token = await AsyncStorage.getItem('@access_token');
    const formData = new FormData();
    console.log(newImage, newImageName);
    formData.append('newprofileimage', {
      uri: newImage,
      type: 'image/jpeg',
      name: newImageName,
    });

    const aditionalData = {
      pseudo: newPseudo,
      bio: newBio,
    };

    Object.keys(aditionalData).forEach(key => {
      formData.append(key, aditionalData[key]);
    });

    console.log('token', token);
    axios
      .patch(`${apiUrl}/user/${user.userData.id}/profile`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
      })
      .then(res => {
        console.log(res.data);
        const {id, pseudo, bio, avatar, email} = res.data.updatedUser;
        user.setUserData({id, pseudo, bio, avatar, email});
        navigation.goBack()
      })
      .catch(err => {
        console.log(err.response)
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#202020', padding: 10, gap: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Image
          source={{
            uri: newImage
              ? newImage
              : `${apiStatic}/profile/${user.userData.avatar}.png`,
          }}
          resizeMode={'cover'}
          style={{borderRadius: 500, height: 100, width: 100}}
        />
        <TouchableOpacity onPress={handleChangeProfilePicture}>
          <Icon name={'edit'} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={{gap: 5}}>
        <Text style={{color: 'white'}}>Changer votre pseudo</Text>
        <View
          style={{
            backgroundColor: '#323232',
            borderRadius: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextInput
            inputMode={'text'}
            value={newPseudo}
            onChangeText={text => setNewPseudo(text)}
            style={{
              height: 40,
              color: 'white',
              paddingHorizontal: 10,
              flex: 1,
            }}
          />
          <Icon name={'people'} color={'white'} />
        </View>
      </View>
      <View style={{gap: 5}}>
        <Text style={{color: 'white'}}>Changer votre bio</Text>
        <View
          style={{
            backgroundColor: '#323232',
            borderRadius: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextInput
            inputMode={'text'}
            value={newBio}
            onChangeText={text => setNewBio(text)}
            style={{
              height: 40,
              color: 'white',
              paddingHorizontal: 10,
              flex: 1,
            }}
          />
          <Icon name={'text-fields'} color={'white'} />
        </View>
      </View>
      <Button
        title={'Valider mon profile'}
        onPress={handleConfirmChange}
        color={'rgba(214,48,49,0.46)'}
      />
      <Button
        title={'Annulez les changement'}
        onPress={handleCancel}
        color={'rgba(214,48,49,0.46)'}
      />
    </View>
  );
};

export default EditProfileScreen;
