import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import uuidv4 from "../utility/uuid";
import pushNewUserGuid from "../data/pushNewUserGuid"
import getWeekNumber from "../utility/getWeekNumber"
import { ProgressBar, Colors } from 'react-native-paper';

import * as Amplitude from 'expo-analytics-amplitude';

function RegisterScreen({ route, navigation }) {
  // Analytics
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {Amplitude.logEvent('ViewRegister')});
  /////
  const [error, setError] = useState();
  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    try {
      const newuuid = uuidv4();
      const result = await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
          "custom:causes": route.params.causes,
          "custom:GQLuserID": newuuid
        },
      });

      await pushNewUserGuid(newuuid)
      await Auth.signIn(
        userInfo.username,
        userInfo.password
      );
      Amplitude.setUserId(newuuid)
      Amplitude.setUserProperties({cohortId: getWeekNumber(new Date())})
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
