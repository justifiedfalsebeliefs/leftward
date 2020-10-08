import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterCauseScreen from "../screens/RegisterCauseScreen";
import RegisterActScreen from "../screens/RegisterActScreen";
import RegisterConfirmScreen from "../screens/RegisterConfirmScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterCause" component={RegisterCauseScreen} />
      <Stack.Screen name="RegisterAct" component={RegisterActScreen} />
      <Stack.Screen name="RegisterConfirm" component={RegisterConfirmScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
