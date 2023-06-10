import React from 'react';
import {Text, TouchableOpacity} from "react-native";


type props = {
    text: string,
    day: string,
    setDay: Function
}
const DayBtn = ({text, day, setDay}: props) => {
    return (
        <TouchableOpacity style={day === text ? {borderWidth: 2, paddingHorizontal: 10, borderColor: 'rgba(214,48,49,0.46)', borderRadius: 9999} : {borderRadius: 9999,borderWidth: 1,paddingHorizontal: 10}} onPress={() => setDay(text)}>
            <Text style={{color: 'white'}}>{text}</Text>
        </TouchableOpacity>
    );
};

export default DayBtn;
