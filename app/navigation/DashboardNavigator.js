import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActionDetailsScreen from "../screens/ActionDetailsScreen";
import CampaignDetailsScreen from "../screens/CampaignDetailsScreen";
import OrganizationDetailsScreen from "../screens/OrganizationDetailsScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator mode="modal" 
   screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Action Details" component={ActionDetailsScreen} />
    <Stack.Screen name="Campaign Details" component={CampaignDetailsScreen} />
    <Stack.Screen
      name="Organization Details"
      component={OrganizationDetailsScreen}
    />
  </Stack.Navigator>
);

export default DashboardNavigator;
