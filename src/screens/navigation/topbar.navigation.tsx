import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AfterEventScreen from "../event/afterevent.screen";
import TrackEventScreen from "../event/trackEvent.screen";

const TopbarNavigation = () => {

  const TopBar = createMaterialTopTabNavigator()

  return (
    <TopBar.Navigator screenOptions={{tabBarStyle: {backgroundColor: '#202020'}, tabBarLabelStyle: {color: 'white',textTransform: 'lowercase', fontWeight: 'bold', fontSize: 14}}}>
      <TopBar.Screen name={'after'} options={{tabBarLabel: 'A Venir'}} component={AfterEventScreen} />
      <TopBar.Screen name={'track'} options={{tabBarLabel: 'Suivie'}} component={TrackEventScreen} />
    </TopBar.Navigator>
  );
};

export default TopbarNavigation;
