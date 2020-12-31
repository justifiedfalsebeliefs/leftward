import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Amplify, { Auth } from "aws-amplify";
import AppLoading from "expo-app-loading";
import amplifyConfig from "./app/auth/amplifyConfig";
import amplitudekey from "./app/analytics/amplitudeconfig";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import RootStore from "./app/store/RootStore";
import { RootStoreContext } from "./app/store/RootStoreContext";
import ModalManager from "./app/components/modals/ModalManager";
import * as Amplitude from "expo-analytics-amplitude";
import ThemeAndIconProvider from "./app/store/ThemeAndIconProvider";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);
Amplify.configure(amplifyConfig);
Amplitude.initializeAsync(amplitudekey());
const things = new RootStore();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUserSession();
    if (user) {
      await Auth.currentSession() // refreshes token
        .then((data) => {
          setUser(data); // sets variable to render correct screens
          authStorage.storeSession(data); // saves token in secure storage
          console.log("user restored!");
        });
      things.updateAppStateShouldUpdate(true); // waits until above completes to make authenticated API call
      Amplitude.setUserIdAsync(user.idToken.payload["custom:userGuid"]); // analytics
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

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
