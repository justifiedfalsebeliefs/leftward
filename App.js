import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import Amplify, { Auth } from "aws-amplify";
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
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as mapping } from "./app/config/themeMapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as dark } from "./app/config/dark.json";
import { default as light } from "./app/config/light.json";
import { ThemeContext } from "./app/config/theme-context";

Amplify.configure(amplifyConfig);
Amplitude.initialize(amplitudekey());

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    const nextTheme = theme === light ? dark : light;
    setTheme(nextTheme);
  };

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
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApplicationProvider {...eva} customMapping={mapping} theme={theme}>
        <IconRegistry icons={EvaIconsPack} />
        <AuthContext.Provider value={{ user, setUser }}>
          <RootStoreContext.Provider value={new RootStore()}>
            <ModalManager>
              <NavigationContainer>
                {user ? <AppNavigator /> : <AuthNavigator />}
              </NavigationContainer>
            </ModalManager>
          </RootStoreContext.Provider>
        </AuthContext.Provider>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}
