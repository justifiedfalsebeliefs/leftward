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

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  code: Yup.string().required().min(4).label("Code"),
});

function RegisterConfirmScreen({ navigation }) {
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.confirmSignUp(userInfo.username, userInfo.code);
      console.log(result);
      Alert.alert("Registration success!", "Continue to login", [
        {
          text: "OK",
          onPress: () => navigation.navigate(routes.LOGIN),
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
          initialValues={{ username: "", code: "" }}
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
            name="code"
            placeholder="Code"
            secureTextEntry
          />
          <SubmitButton title="Confirm" />
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

export default RegisterConfirmScreen;
