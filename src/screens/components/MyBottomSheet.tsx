import React, {useEffect, useRef, useState} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import {ActivityIndicator, FlatList, Image, Text, TextInput, View} from "react-native";
import axios from "axios";
import { API_URL, API_STATIC } from '@env'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Icon} from "@rneui/themed";

const apiUrl = API_URL
const apiStatic = API_STATIC

const MyBottomSheet = ({isVisible, setIsVisible}) => {
    const bottomSheetRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [filtre, setFiltre] = useState('');

    useEffect(() => {
        if (isVisible) {
            openBottomSheet()
            AsyncStorage.getItem('@access_token').then(token => {
                axios.get(`${apiUrl}/user/all`, {
                    headers: {
                        authorization: token
                    }
                }).then(res => {
                    console.log(res.data.users)
                    setUsers(res.data.users)
                    setIsLoading(false)
                }).catch(err => {
                    console.log(err)
                })
            })
        }
    },[isVisible])

    const openBottomSheet = () => {
        bottomSheetRef.current.open();
    };

    const RenderUser = ({pseudo, avatar}) => (
        <View style={{backgroundColor: '#323232', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Image style={{height: 50, width: 50}} resizeMode={'cover'} source={{uri: `${apiStatic}/profile/${avatar}.png`}} />
                <Text style={{color: 'white', fontWeight: 'bold'}}>{pseudo}</Text>
            </View>
            <Icon  name={'send'} color={'white'} />
        </View>
    )


    return (
        <RBSheet closeOnDragDown={true} customStyles={{container: {backgroundColor: '#202020', borderRadius: 15}}} onClose={() => setIsVisible(false)} ref={bottomSheetRef} height={600}>
            <View style={{ flex: 1, padding: 15, gap: 10}}>
                {isLoading ? <ActivityIndicator /> : (
                    <>
                        <View style={{backgroundColor: '#323232', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', paddingHorizontal: 15}}>

                            <TextInput style={{color: 'white', fontWeight: 'bold'}} value={filtre} placeholderTextColor={'white'} placeholder={'Recherchez'} onChangeText={text => setFiltre(text)} />
                            <Icon  name={'search'} color={'white'}/>
                        </View>
                        <FlatList data={users.filter(u => u.pseudo.includes(filtre))}  renderItem={({item}) => <RenderUser {...item} />} keyExtractor={(item) => item.id} />
                    </>
                )}
            </View>
        </RBSheet>
    );
};

export default MyBottomSheet;
