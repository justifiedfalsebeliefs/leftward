import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActionDetailsScreen from "../screens/ActionDetailsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import BadgeListingsScreen from "../screens/BadgeListingsScreen";

const Stack = createStackNavigator();

const StatisticsNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Statistics" component={StatisticsScreen} />
    <Stack.Screen name="Action Details" component={ActionDetailsScreen} />
    <Stack.Screen name="Badge Listings" component={BadgeListingsScreen} />
  </Stack.Navigator>
);

export default StatisticsNavigator;
