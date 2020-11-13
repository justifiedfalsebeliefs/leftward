import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import UpdateCauseScreen from "../screens/UpdateCauseScreen";
// import UpdateActionScreen from "../screens/UpdateActionScreen";
import HiddenActionsScreen from "../screens/HiddenActionsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
  screenOptions={{headerShown: false}}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Settings" component={AccountSettingsScreen} />
    <Stack.Screen name="Update Cause" component={UpdateCauseScreen} />
    {/* <Stack.Screen name="UpdateAction" component={UpdateActionScreen} /> */}
    <Stack.Screen name="Hidden Actions" component={HiddenActionsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
