import React, { useState } from "react";
import { StyleSheet, View} from "react-native";
import useAuth from "../auth/useAuth";
import { Auth } from "aws-amplify";
import pushData from "../data/pushData";
import * as Amplitude from 'expo-analytics-amplitude';
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"
import colors from "../config/colors"
import AuthForm from "../components/AuthForm";
import Screen from "../components/Screen";

function RegisterScreen({ route, navigation }) {
  logAmplitudeEventOnMount('ViewRegister')
  const [error, setError] = useState();
  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    try {
      Amplitude.logEvent('PressRegister')
      await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
          "custom:causes": route.params.causes,
          "custom:userGuid": route.params.guid},});
      await Auth.signIn(
        userInfo.username,
        userInfo.password);
      Auth.currentSession().then((data) => {auth.logIn(data);});
      await pushData("pushNewUserGuid", params=[{key:"newGuid", value:route.params.guid}])
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <Screen style={styles.container}>
      <View style={styles.progressBackground}>
            <View style={styles.progressFill}></View>
          </View>
          <View style={{height:20}}></View>
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
  },
  progressBackground:{
    backgroundColor: colors.levelBarBackground,
    height: 20,
    borderRadius: 12,
  },
  progressFill:{
      backgroundColor: colors.levelBarFill,
      borderRadius: 12,
      flex: 1,
      width: `100%`,
  },
});

export default RegisterScreen;
