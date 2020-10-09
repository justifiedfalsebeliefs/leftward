import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  AppButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function RegisterScreen({ navigation }) {
  const [error, setError] = useState();
  const auth = useAuth();
  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
        },
      });
      const loginresult = await Auth.signIn(
        userInfo.username,
        userInfo.password
      );
      Auth.currentSession().then((data) => {
        auth.logIn(data.accessToken.jwtToken);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Screen style={styles.container}>
        <Form
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="username"
            placeholder="Username"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="passwordConfirmation"
            placeholder="Confirm"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
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

export default RegisterScreen;
