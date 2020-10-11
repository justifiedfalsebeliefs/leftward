import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import CampaignScreen from "../screens/CampaignScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import UpdateCauseScreen from "../screens/UpdateCauseScreen";
import UpdateActionScreen from "../screens/UpdateActionScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Campaign" component={CampaignScreen} />
    <Stack.Screen name="Settings" component={AccountSettingsScreen} />
    <Stack.Screen name="UpdateCause" component={UpdateCauseScreen} />
    <Stack.Screen name="UpdateAction" component={UpdateActionScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
