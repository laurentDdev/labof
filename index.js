/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from "@react-navigation/native";

import userContext from "./src/context/user.context";
import { useState } from "react";

const myApp = () => {

  const [login, setLogin] = useState(false);

  return (
    <userContext.Provider value={{login: login, setLogin: setLogin}}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </userContext.Provider>
  )
}
AppRegistry.registerComponent(appName, () => myApp);
