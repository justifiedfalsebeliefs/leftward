import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import routes from "../navigation/routes";

import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).label("Code"),
});

const validationSchemaChangePassword = Yup.object().shape({
  currentPassword: Yup.string().required().min(4).label("Password"),
  newPassword: Yup.string().required().min(4).label("Password"),
  newPasswordConfirmation: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

function AccountSettingsScreen({ navigation }) {
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
        oldPassword: userInfo.currentPassword,
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
          <Form
            initialValues={{ code: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={error} visible={error} />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="code"
              placeholder="Confirmation Code"
            />
            <SubmitButton title="Confirm" />
            <AppButton
              title="Send Confirmation Code"
              onPress={() => Auth.verifyCurrentUserAttribute("email")}
            ></AppButton>
          </Form>
        )}
        <Form
          initialValues={{
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
          }}
          onSubmit={handleSubmitPassword}
          validationSchema={validationSchemaChangePassword}
        >
          <ErrorMessage error={error} visible={error} />
          <AppText>Change Password</AppText>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="currentPassword"
            placeholder="Current Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPassword"
            placeholder="New Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPasswordConfirmation"
            placeholder="Confirm"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Change Password" />
        </Form>
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
