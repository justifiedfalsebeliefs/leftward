import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BadgesScreen from "../screens/BadgesScreen";

const Stack = createStackNavigator();

const BadgesNavigator = () => (
  <Stack.Navigator mode="modal" 
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Badges" component={BadgesScreen} />
  </Stack.Navigator>
);

export default BadgesNavigator;
