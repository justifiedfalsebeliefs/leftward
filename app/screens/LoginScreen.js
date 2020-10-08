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
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signIn(userInfo.username, userInfo.password);
      Auth.currentSession().then((data) => {
        auth.logIn(data.accessToken.jwtToken);
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Please try again", error.message, [
        { text: "Cancel", style: "cancel" },
        { text: "OK" },
      ]);
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
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Log In" />
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

export default LoginScreen;
