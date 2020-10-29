import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import UpdateCauseScreen from "../screens/UpdateCauseScreen";
// import UpdateActionScreen from "../screens/UpdateActionScreen";
import HiddenActionsScreen from "../screens/HiddenActionsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Settings" component={AccountSettingsScreen} />
    <Stack.Screen name="UpdateCause" component={UpdateCauseScreen} />
    {/* <Stack.Screen name="UpdateAction" component={UpdateActionScreen} /> */}
    <Stack.Screen name="HiddenActions" component={HiddenActionsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
