import React, { useContext, useState } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { StyleSheet, View } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";
import getWeekNumber from "../utility/getWeekNumber";
import useAuth from "../auth/useAuth";
import { Auth } from "aws-amplify";
import telemetry from "../analytics/telemetry";
import uuidv4 from "../utility/uuid";
import AuthForm from "../components/AuthForm";
import Screen from "../components/Screen";

function RegisterScreen({ route, navigation }) {
  const things = useContext(RootStoreContext);
  const [error, setError] = useState();
  const auth = useAuth();
  const userGuid = uuidv4();

  useMountEffect(() => {
    Amplitude.setUserIdAsync(userGuid);
    Amplitude.setUserPropertiesAsync({ cohortId: getWeekNumber(new Date()) });
    telemetry("ViewRegisterScreen");
  });

  const handleSubmit = async (userInfo) => {
    try {
      things.updateIsLoading(true);
      telemetry("PressRegister");
      await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
          "custom:causes": "none",
          "custom:userGuid": userGuid,
        },
      });
      await Auth.signIn(userInfo.username, userInfo.password);
      await Auth.currentSession().then((data) => {
        auth.logIn(data, true);
      });
      things.updateAppStateShouldUpdate(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Screen style={styles.container} paddingHorizontal={20}>
        <AuthForm
          fields={["username", "email", "password", "passwordConfirmation"]}
          onSubmit={handleSubmit}
          submitTitle={"Register"}
          error={error}
          style={{ paddingTop: 20 }}
        ></AuthForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
  },
});

export default RegisterScreen;
