import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import Screen from "../components/Screen";
import AuthForm from "../components/AuthForm";
import { Auth } from "aws-amplify";
import AppButton from "../components/AppButton";
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"


function AccountSettingsScreen({ navigation }) {
  logAmplitudeEventOnMount('ViewAccountSettings')
  
  const { user, logOut } = useAuth();
  const [error, setError] = useState();
  const [emailVerified, setEmailVerified] = useState();

  const checkVerification = async () => {
    const isverified = await Auth.currentAuthenticatedUser();
    setEmailVerified(
      isverified.signInUserSession.idToken.payload.email_verified
    );
  };
  checkVerification();

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
      const cognitoUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword({
        user: cognitoUser,
        oldPassword: userInfo.password,
        newPassword: userInfo.newPassword,
      });
      Alert.alert("Success!", "Password Changed.", [{ text: "OK" }]);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  
  return (
    <>
      <Screen style={styles.container}>
        {!emailVerified && (
          <AuthForm
            fields={["code"]}
            onSubmit={handleSubmit}
            submitTitle={"Confirm"}
            error={error}
          ></AuthForm>
        )}

        {!emailVerified &&  (<AppButton
          title="Send Confirmation Code"
          onPress={() => Auth.verifyCurrentUserAttribute("email")}
        ></AppButton>)}

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

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default AccountSettingsScreen;
