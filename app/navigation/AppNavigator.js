import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import DashboardNavigator from "./DashboardNavigator";
import StatisticsNavigator from "./StatisticsNavigator"
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  
  <Tab.Navigator 
  screenOptions={{headerShown: false}}
    >  
        <Tab.Screen
      name="Dashboard"
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
        ),
      }}
    />
        <Tab.Screen
      name="Statistics"
      component={StatisticsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chart-areaspline" color={color} size={size} />
        ),
      }}
    />


    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
