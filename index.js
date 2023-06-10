/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import userContext from "./src/context/user.context";
import eventContext from "./src/context/event.context";
import { useState } from "react";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MyApp = () => {

  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const {events, setEvents} = useState({})

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <userContext.Provider value={{login: login, setLogin: setLogin,userData: userData, setUserData: setUserData}}>
         <eventContext.Provider value={{events: events,setEvents: setEvents}}>
             <App />
         </eventContext.Provider>
      </userContext.Provider>
    </GestureHandlerRootView>
  )
}
AppRegistry.registerComponent(appName, () => MyApp);
