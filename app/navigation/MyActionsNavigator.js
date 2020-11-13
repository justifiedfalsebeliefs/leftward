import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActionDetailsScreen from "../screens/ActionDetailsScreen";
import CampaignDetailsScreen from "../screens/CampaignDetailsScreen";
import OrganizationDetailsScreen from "../screens/OrganizationDetailsScreen";
import MyActionsScreen from "../screens/MyActionsScreen";

const Stack = createStackNavigator();

const MyActionsNavigator = () => (
  <Stack.Navigator mode="modal" 
  screenOptions={{headerShown: false}}>
    <Stack.Screen name="My Actions" component={MyActionsScreen} />
    <Stack.Screen name="Action Details" component={ActionDetailsScreen} />
    <Stack.Screen name="Campaign Details" component={CampaignDetailsScreen} />
    <Stack.Screen
      name="Organization Details"
      component={OrganizationDetailsScreen}
    />
  </Stack.Navigator>
);

export default MyActionsNavigator;
