import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import useAuth from "../auth/useAuth";
import { Auth } from "aws-amplify";
import callApi from "../data/callApi";
import telemetry from "../analytics/telemetry";
import uuidv4 from "../utility/uuid";
import AuthForm from "../components/AuthForm";
import Screen from "../components/Screen";

function RegisterScreen({ route, navigation }) {
  // telemetry("ViewRegisterScreen");
  const [error, setError] = useState();
  const auth = useAuth();
  const userGuid = uuidv4();

  // useMountEffect(() => {
  //   Amplitude.setUserIdAsync(uuid);
  //   Amplitude.setUserPropertiesAsync({ cohortId: getWeekNumber(new Date()) });
  //   Amplitude.logEventAsync("ViewRegisterCauseScreem");
  // });

  const handleSubmit = async (userInfo) => {
    try {
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
      const user = await Auth.currentSession();
      await callApi(user.idToken.jwtToken, "createNewUser");
      // telemetry("PressRegister");
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
        <View style={styles.progressBackground}>
          <View style={styles.progressFill}></View>
        </View>
        <View style={{ height: 20 }}></View>
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
  progressBackground: {
    backgroundColor: "blue",
    height: 20,
    borderRadius: 12,
  },
  progressFill: {
    backgroundColor: "blue",
    borderRadius: 12,
    flex: 1,
    width: `100%`,
  },
});

export default RegisterScreen;
