import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Amplify, { Auth } from "aws-amplify";
import AppLoading from "expo-app-loading";
import amplifyConfig from "./app/auth/amplifyConfig";
import amplitudekey from "./app/data/amplitudeconfig";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import RootStore from "./app/store/RootStore";
import { RootStoreContext } from "./app/store/RootStoreContext";
import ModalManager from "./app/components/modals/ModalManager";
import * as Amplitude from "expo-analytics-amplitude";
import ThemeAndIconProvider from "./app/store/ThemeAndIconProvider";

Amplify.configure(amplifyConfig);
Amplitude.initializeAsync(amplitudekey());

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const things = new RootStore();

  const restoreUser = async () => {
    const user = await authStorage.getUserSession();
    if (user) {
      Auth.currentSession().then((data) => {
        setUser(data);
        authStorage.storeSession(data);
      });
    }
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <RootStoreContext.Provider value={things}>
      <ThemeAndIconProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <ModalManager>
            <NavigationContainer>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </ModalManager>
        </AuthContext.Provider>
      </ThemeAndIconProvider>
    </RootStoreContext.Provider>
  );
}
