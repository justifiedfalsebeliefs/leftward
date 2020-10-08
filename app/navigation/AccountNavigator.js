import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import CampaignScreen from "../screens/CampaignScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Campaign" component={CampaignScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
