import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import Amplify, { Auth } from 'aws-amplify';
import amplifyConfig from "./app/auth/amplifyConfig";
import amplitudekey from "./app/data/amplitudeconfig";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import RootStore from "./app/store/RootStore";
import { RootStoreContext } from "./app/store/RootStoreContext";

import * as Amplitude from 'expo-analytics-amplitude';

Amplify.configure(amplifyConfig);
Amplitude.initialize(amplitudekey())

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  
  const restoreUser = async () => {
    const user = await authStorage.getUserSession();
    if (user) {
      Auth.currentSession().then((data) => {setUser(data); authStorage.storeSession(data)})
    }
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RootStoreContext.Provider value={new RootStore()}>
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </RootStoreContext.Provider>
    </AuthContext.Provider>
  );
}