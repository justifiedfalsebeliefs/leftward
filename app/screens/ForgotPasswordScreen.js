import React, { useState } from "react";
import telemetry from "../analytics/telemetry";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import AuthForm from "../components/AuthForm";

function ForgotPasswordScreen({ navigation }) {
  // telemetry((eventTitle = "viewForgotPasswordScreen"));

  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      Auth.forgotPassword((username = userInfo.username));
      navigation.navigate(routes.CONFIRMRECOVERPASSWORD);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Screen>
        <AuthForm
          fields={["username", "email"]}
          onSubmit={handleSubmit}
          submitTitle={"Set new password"}
          error={error}
        ></AuthForm>
      </Screen>
    </>
  );
}

export default ForgotPasswordScreen;
