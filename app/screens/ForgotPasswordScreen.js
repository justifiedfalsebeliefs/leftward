import React, { useState } from "react";
import { StyleSheet } from "react-native";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import AuthForm from "../components/AuthForm";
import useAuth from "../auth/useAuth";
import * as Amplitude from 'expo-analytics-amplitude';


function ForgotPasswordScreen({ navigation }) {
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      Auth.forgotPassword((username = userInfo.username));
      navigation.navigate(routes.CONFIRMRECOVERPASSWORD);
    } catch (error) {
      setError(error.message);
    }
  };
  Amplitude.logEvent('ViewForgotPassword')
  return (
    <>
      <Screen style={styles.container}>
        <AuthForm
          fields={["username", "email"]}
          onSubmit={handleSubmit}
          submitTitle={"Set new password"}
          error={error}
        ></AuthForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ForgotPasswordScreen;
