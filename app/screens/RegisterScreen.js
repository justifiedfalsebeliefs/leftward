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
  AppButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signUp({
        username: userInfo.name,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
        },
      });
      console.log(result);
      Alert.alert("Registration success!", "Continue to confirmation", [
        {
          text: "OK",
          onPress: () => navigation.navigate(routes.REGISTERCONFIRM),
        },
      ]);
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
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
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
