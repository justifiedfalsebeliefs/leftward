import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import routes from "../navigation/routes";
import AuthForm from "../components/AuthForm";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import useAuth from "../auth/useAuth";
import Button from "../components/Button";
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"

function LoginScreen({ navigation }) {
  logAmplitudeEventOnMount('ViewLogin')

  const auth = useAuth();
  const [error, setError] = useState();
  
  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signIn(userInfo.username, userInfo.password);
      Auth.currentSession().then((data) => {
        auth.logIn(data);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Screen style={styles.container}>
        <View>
          <AuthForm
            fields={["username", "password"]}
            onSubmit={handleSubmit}
            submitTitle={"Log In"}
            error={error}
          ></AuthForm>
         </View>
        <Button
          style={styles.forgot}
          title="Forgot Password?"
          onPress={() => navigation.navigate(routes.RECOVERPASSWORD)}
        ></Button>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "space-between"
  },
  forgot: {
    alignSelf: "flex-end",
  }
});

export default LoginScreen;
