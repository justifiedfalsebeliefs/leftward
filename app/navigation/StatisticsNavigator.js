import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActionDetailsScreen from "../screens/ActionDetailsScreen";
import OrganizationDetailsScreen from "../screens/OrganizationDetailsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Stack = createStackNavigator();

const StatisticsNavigator = () => (
  <Stack.Navigator mode="modal" 
  screenOptions={{headerShown: false}}>
    <Stack.Screen name="Statistics" component={StatisticsScreen} />
    <Stack.Screen name="Action Details" component={ActionDetailsScreen} />
    <Stack.Screen
      name="Organization Details"
      component={OrganizationDetailsScreen}
    />
  </Stack.Navigator>
);

export default StatisticsNavigator;
