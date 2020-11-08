import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import pushNewUserGuid from "../data/pushNewUserGuid"
import { ProgressBar, Colors } from 'react-native-paper';
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"
import * as Amplitude from 'expo-analytics-amplitude';

function RegisterScreen({ route, navigation }) {
  logAmplitudeEventOnMount('ViewRegister')
  const [error, setError] = useState();
  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
          "custom:causes": route.params.causes,
          "custom:GQLuserID": route.params.guid
        },
      });
      await pushNewUserGuid(route.params.guid)
      await Auth.signIn(
        userInfo.username,
        userInfo.password
      );
      Amplitude.logEvent('PressRegister')
      Auth.currentSession().then((data) => {
        auth.logIn(data);
      });
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <Screen style={styles.container}>
      <ProgressBar progress={1} color={"green"} height={20} />
        <AuthForm
          fields={["username", "email", "password", "passwordConfirmation"]}
          onSubmit={handleSubmit}
          submitTitle={"Register"}
          error={error}
        ></AuthForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 10,
  },
});

export default RegisterScreen;
