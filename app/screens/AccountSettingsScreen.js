import React, { useState, useEffect } from "react";
import telemetry from "../analytics/telemetry"
import { StyleSheet, Alert } from "react-native";
import Screen from "../components/Screen";
import AuthForm from "../components/AuthForm";
import { Auth } from "aws-amplify";
import Button from "../components/Button";


function AccountSettingsScreen({ navigation }) {
  telemetry(eventTitle='viewAccountSettings')

  const [error, setError] = useState();
  const [emailVerified, setEmailVerified] = useState();
  const [cognitoUser, setCognitoUser] = useState();
  const useMountEffect = (fun) => useEffect(fun, [])
  const checkVerification = async () => {
    const response = await Auth.currentAuthenticatedUser()
    setCognitoUser(response);
    setEmailVerified(response.signInUserSession.idToken.payload.email_verified);
  };
  useMountEffect(() => {checkVerification()})

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        userInfo.code
      );
      Alert.alert("Success!", "Email confirmed.", [{ text: "OK" }]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitPassword = async (userInfo) => {
    try {
      await Auth.changePassword(cognitoUser, userInfo.password, userInfo.newPassword);
      Alert.alert("Success!", "Password Changed.", [{ text: "OK" }]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  
  return (
    <>
      <Screen>
        {!emailVerified && (
          <AuthForm
            fields={["code"]}
            onSubmit={handleSubmit}
            submitTitle={"Confirm"}
            error={error}
          ></AuthForm>
        )}

        {!emailVerified &&  (<Button
          title="Send Confirmation Code"
          onPress={() => Auth.verifyCurrentUserAttribute("email")}
          color="secondary"
        ></Button>)}

        <AuthForm
          fields={["password", "newPassword", "newPasswordConfirmation"]}
          onSubmit={handleSubmitPassword}
          submitTitle={"Change Password"}
          error={error}
        ></AuthForm>
      </Screen>
    </>
  );
}

export default AccountSettingsScreen;
