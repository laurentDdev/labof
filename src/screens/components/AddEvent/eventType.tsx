import React from 'react';
import {Text, TouchableOpacity} from 'react-native';


type props = {
    text: string,
    eventType: string,
    setEventType: Function
}
const EventType = ({text, eventType, setEventType}: props) => {
  return (
    <TouchableOpacity style={eventType === text ? {borderWidth: 2, paddingHorizontal: 10, borderColor: 'rgba(214,48,49,0.46)', borderRadius: 9999} : {borderRadius: 9999,borderWidth: 1,paddingHorizontal: 10}} onPress={() => setEventType(text)}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default EventType;
