import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActionDetailsScreen from "../screens/ActionDetailsScreen";
import ActionCompleteURLScreen from "../screens/ActionCompleteURLScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ActionListingsScreen from "../screens/ActionListingsScreen";

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Action Listings" component={ActionListingsScreen} />
    <Stack.Screen name="Action Details" component={ActionDetailsScreen} />
    <Stack.Screen
      name="Action Complete URL"
      component={ActionCompleteURLScreen}
    />
  </Stack.Navigator>
);

export default DashboardNavigator;
