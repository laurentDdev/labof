import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import EventType from '../components/AddEvent/eventType';
import {Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import DayBtn from '../components/AddEvent/dayBtn';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userContext from '../../context/user.context';
import eventContext from "../../context/event.context";

const apiUrl = API_URL;

const AddEventScreen = ({navigation}) => {
  const [eventType, setEventType] = useState('Festival');
  const [day, setDay] = useState('Lundi');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState(0);

  const user = useContext(userContext);
  const events = useContext(eventContext)
  const [loading, setLoading] = useState(false);

  const resetData = () => {
    setEventType('Festival');
    setDay('Lundi');
    setImage(null);
    setImageName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setName('');
    setDesc('');
    setPlace(0);

  }

  const handleSendImage = () => {
    launchImageLibrary(
      {selectionLimit: 1, mediaType: 'photo', maxHeight: 500, maxWidth: 300},
      img => {
        console.log(img);
        setImage(img.assets[0].uri);
        setImageType(img.assets[0].type);
        setImageName(img.assets[0].fileName);
      },
    );
  };

  const handleConfirmEvent = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('@access_token');
    const formData = new FormData();
    formData.append('eventimage', {
      uri: image,
      type: 'image/jpeg',
      name: imageName,
    });

    const aditionalData = {
      name: name,
      desc: desc,
      eventType: eventType,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      repeatDay: day,
      place: place,
      userId: user.userData.id,
    };

    Object.keys(aditionalData).forEach(key => {
      formData.append(key, aditionalData[key]);
    });

    axios
      .post(`${apiUrl}/event/create`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
      })
      .then(res => {
        console.log('ok');
        events.setEvents([...events.events, res.data.event]);
        setLoading(false);
        navigation.navigate('after');
        resetData();

      })
      .catch(err => {
        console.log(err);
        user.setLogin(false)
        setLoading(false)
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#202020',
        paddingVertical: 30,
        paddingHorizontal: 20,
        gap: 10,
      }}>
      <View>
        {loading && <ActivityIndicator/>}
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
          Evenement
        </Text>
      </View>
      <ScrollView
        bounces={true}
        style={{
          flex: 1,
          backgroundColor: '#323232',
          borderRadius: 9,
          padding: 20,
        }}>
        <Text
          style={{
            color: '#BFBFBF',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 15,
          }}>
          Crée un événement
        </Text>
        <Text style={{color: '#BFBFBF', marginBottom: 10}}>
          Type dévenement
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{gap: 20, marginBottom: 10}}>
          <EventType
            text={'Festival'}
            eventType={eventType}
            setEventType={setEventType}
          />
          <EventType
            text={'Musique'}
            eventType={eventType}
            setEventType={setEventType}
          />
          <EventType
            text={'Restaurant'}
            eventType={eventType}
            setEventType={setEventType}
          />
        </ScrollView>
        <View style={{gap: 5}}>
          <Text style={{color: '#BFBFBF'}}>Nom de l'évenement</Text>
          <TextInput
            inputMode={'text'}
            value={name}
            onChangeText={text => setName(text)}
            style={{
              backgroundColor: '#202020',
              borderRadius: 6,
              height: 35,
              color: 'white',
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{gap: 5}}>
          <Text style={{color: '#BFBFBF'}}>Description de l'évenement</Text>
          <TextInput
            inputMode={'text'}
            value={desc}
            onChangeText={text => setDesc(text)}
            style={{
              backgroundColor: '#202020',
              borderRadius: 6,
              height: 35,
              color: 'white',
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{gap: 5, marginBottom: 5}}>
          <Text style={{color: '#BFBFBF'}}>Photos</Text>
          <TouchableOpacity
            onPress={handleSendImage}
            style={{
              borderStyle: 'dashed',
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 9,
              height: 170,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {image ? (
              <Image
                source={{uri: image}}
                style={{height: '100%', width: '100%', borderRadius: 9}}
                resizeMode={'cover'}
              />
            ) : (
              <Icon name={'image-search'} color={'white'} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{gap: 5}}>
          <Text style={{color: '#BFBFBF'}}>Date de début</Text>
          <TouchableOpacity
            onPress={() => setStartDateOpen(true)}
            style={{
              flexDirection: 'row',
              backgroundColor: '#202020',
              borderRadius: 6,
              alignItems: 'center',
              padding: 10,
            }}>
            <DatePicker
              confirmText={'Confirmer'}
              cancelText={'Annuler'}
              title={'Date de départ'}
              locale={'fr'}
              mode={'date'}
              androidVariant={'iosClone'}
              minimumDate={new Date()}
              style={{flex: 1}}
              modal
              open={startDateOpen}
              date={startDate}
              onConfirm={date => {
                setStartDateOpen(false);
                setStartDate(date);
              }}
              onCancel={() => setStartDateOpen(false)}
            />
            <Text style={{color: '#bfbfbf', flex: 1}}>
              {startDate.toLocaleDateString('fr-Fr')}
            </Text>
            <Icon name={'date-range'} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{gap: 5, marginBottom: 10}}>
          <Text style={{color: '#BFBFBF'}}>Date de fin</Text>
          <TouchableOpacity
            onPress={() => setEndDateOpen(true)}
            style={{
              flexDirection: 'row',
              backgroundColor: '#202020',
              borderRadius: 6,
              alignItems: 'center',
              padding: 10,
            }}>
            <DatePicker
              confirmText={'Confirmer'}
              cancelText={'Annuler'}
              title={'Date de fin'}
              locale={'fr'}
              mode={'date'}
              androidVariant={'iosClone'}
              minimumDate={new Date()}
              style={{flex: 1}}
              modal
              open={endDateOpen}
              date={endDate}
              onConfirm={date => {
                setEndDateOpen(false);
                setEndDate(date);
              }}
              onCancel={() => setEndDateOpen(false)}
            />
            <Text style={{color: '#bfbfbf', flex: 1}}>
              {endDate.toLocaleDateString('fr-Fr')}
            </Text>
            <Icon name={'date-range'} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: '#BFBFBF', marginBottom: 10}}>
            Jours de répétition
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{gap: 20, marginBottom: 10}}>
            <DayBtn text={'Lundi'} day={day} setDay={setDay} />
            <DayBtn text={'Mardi'} day={day} setDay={setDay} />
            <DayBtn text={'Mercredi'} day={day} setDay={setDay} />
            <DayBtn text={'Jeudi'} day={day} setDay={setDay} />
            <DayBtn text={'Vendredi'} day={day} setDay={setDay} />
            <DayBtn text={'Samedi'} day={day} setDay={setDay} />
            <DayBtn text={'Dimanche'} day={day} setDay={setDay} />
          </ScrollView>
        </View>
        <View style={{gap: 5}}>
          <Text style={{color: '#BFBFBF'}}>Nombre de place</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#202020',
              borderRadius: 6,
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginBottom: 50,
            }}>
            <TextInput
              inputMode={'numeric'}
              value={place.toString()}
              onChangeText={text => setPlace(Number(text))}
              style={{
                flex: 1,
                height: 35,
                color: 'white',
                paddingHorizontal: 10,
              }}
            />
            <Icon name={'format-list-numbered'} color={'white'} />
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={handleConfirmEvent}
        title={"Ajoutez l'évenement"}
        color={'rgba(214,48,49,0.46)'}
        disabled={loading}
      />
    </View>
  );
};

export default AddEventScreen;
