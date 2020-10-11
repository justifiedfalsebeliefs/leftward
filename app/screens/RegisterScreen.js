import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";

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
    padding: 10,
  },
});

export default RegisterScreen;
