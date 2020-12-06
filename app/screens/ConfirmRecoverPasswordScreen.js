import React, { useState } from "react";
import telemetry from "../analytics/telemetry"
import { Alert } from "react-native";
import routes from "../navigation/routes";
import AuthForm from "../components/AuthForm";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";


function ConfirmRecoverPasswordScreen({ navigation }) {
  telemetry(eventTitle='viewConfirmRecoverPassword')

  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      await Auth.forgotPasswordSubmit(
        userInfo.username,
        userInfo.code,
        userInfo.password
      );
      Alert.alert("Success!", "Password updated. Continue to login.", [
        { text: "OK" },
      ]);
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <Screen>
        <AuthForm
          fields={["username", "code", "password", "passwordConfirmation"]}
          onSubmit={handleSubmit}
          submitTitle={"Change Password"}
          error={error}
        ></AuthForm>
      </Screen>
    </>
  );
}

export default ConfirmRecoverPasswordScreen;
