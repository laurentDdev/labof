import React, {useState} from 'react';
import {Button, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import EventType from "../components/AddEvent/eventType";
import {Icon} from "@rneui/themed";
import DatePicker from "react-native-date-picker";

const AddEventScreen = () => {

    const [eventType, setEventType] = useState('Festival');
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);

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
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
          Evenement
        </Text>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#323232', borderRadius: 9, padding: 20}} >
        <Text style={{color: '#BFBFBF', fontWeight: 'bold', fontSize: 16, marginBottom: 15}}>Crée un événement</Text>
        <Text style={{color: '#BFBFBF', marginBottom: 10}}>Type dévenement</Text>
        <ScrollView horizontal={true} contentContainerStyle={{gap: 20, marginBottom: 10}}>
            <EventType text={'Festival'} eventType={eventType} setEventType={setEventType} />
            <EventType text={'Musique'} eventType={eventType} setEventType={setEventType} />
            <EventType text={'Restaurant'} eventType={eventType} setEventType={setEventType} />
        </ScrollView>
          <View style={{gap: 5}}>
              <Text style={{color: '#BFBFBF'}}>Nom de l'évenement</Text>
              <TextInput inputMode={'text'} style={{backgroundColor: '#202020', borderRadius: 6, height: 35, color: 'white', paddingHorizontal: 10}}/>
          </View>
          <View style={{gap: 5, marginBottom: 5}}>
              <Text style={{color: '#BFBFBF'}}>Photos</Text>
              <View style={{borderStyle: 'dashed', borderColor: 'white',borderWidth: 1, borderRadius: 9, height: 170, alignItems: 'center', justifyContent: 'center'}}>
                  {
                      image ? <Image source={{uri: image}}/> : <Icon name={'image-search'} color={'white'}/>
                  }
              </View>
          </View>
          <View style={{gap: 5}}>
              <Text style={{color: '#BFBFBF'}}>Date de début</Text>
              <TouchableOpacity onPress={() => setStartDateOpen(true)} style={{flexDirection: 'row', backgroundColor: '#202020', borderRadius: 6, alignItems: 'center', padding: 10}}>
                  <DatePicker title={'Date de départ'} locale={'fr'} mode={'date'} androidVariant={'iosClone'} minimumDate={new Date()} style={{flex : 1}} modal open={startDateOpen} date={endDate} onConfirm={(date) => {
                      setStartDateOpen(false)
                      setStartDate(date)
                  }} onCancel={() => setStartDateOpen(false)} />
                  <Text style={{color: '#bfbfbf', flex: 1}}>{startDate.toLocaleDateString('fr-Fr')}</Text>
                  <Icon name={'date-range'} color={'white'}/>
              </TouchableOpacity>
          </View>
          <View style={{gap: 5}}>
              <Text style={{color: '#BFBFBF'}}>Date de fin</Text>
              <TouchableOpacity onPress={() => setEndDateOpen(true)} style={{flexDirection: 'row', backgroundColor: '#202020', borderRadius: 6, alignItems: 'center', padding: 10}}>
                  <DatePicker title={'Date de départ'} locale={'fr'} mode={'date'} androidVariant={'iosClone'} minimumDate={new Date()} style={{flex : 1}} modal open={endDateOpen} date={endDate} onConfirm={(date) => {
                      setEndDateOpen(false)
                      setEndDate(date)
                  }} onCancel={() => setEndDateOpen(false)} />
                  <Text style={{color: '#bfbfbf', flex: 1}}>{startDate.toLocaleDateString('fr-Fr')}</Text>
                  <Icon name={'date-range'} color={'white'}/>
              </TouchableOpacity>
          </View>
      </ScrollView>
      <Button title={"Ajoutez l'évenement"} color={'rgba(214,48,49,0.46)'} />
    </View>
  );
};

export default AddEventScreen;
