import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterCauseScreen from "../screens/RegisterCauseScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ConfirmRecoverPasswordScreen from "../screens/ConfirmRecoverPasswordScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterCause" component={RegisterCauseScreen} />
      <Stack.Screen name="RecoverPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="ConfirmRecoverPassword"
        component={ConfirmRecoverPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
