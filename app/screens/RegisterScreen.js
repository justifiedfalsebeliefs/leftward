import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../../graphql/mutations";
import uuidv4 from "../utility/uuid";

function RegisterScreen({ route, navigation }) {
  const [error, setError] = useState();
  const auth = useAuth();

  var causesOut = "";
  var actionsOut = "";
  for (var i = 0; i < route.params.causes.length; i++) {
    causesOut = causesOut.concat(route.params.causes[i].cause);
    causesOut = causesOut.concat(",");
  }

  actionsOut = actionsOut.concat(
    "donate:",
    route.params.actions.donateValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "march:",
    route.params.actions.marchValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "phone:",
    route.params.actions.phoneValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "share:",
    route.params.actions.shareValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "write:",
    route.params.actions.writeValue.toString(),
    ","
  );

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
          "custom:causes": causesOut,
          "custom:actions": actionsOut,
        },
      });
      const loginresult = await Auth.signIn(
        userInfo.username,
        userInfo.password
      );
      // Create a user in our graphQL db then save it in the user attributes
      const newuuid = uuidv4();
      const createGQLUserResult = await API.graphql(
        graphqlOperation(createUser, {
          createUserInput: {
            ownerId: "", //TBD - owner ID
            guid: newuuid,
          },
        })
      );
      const currentUser = await Auth.currentAuthenticatedUser();
      Auth.updateUserAttributes(currentUser, {
        "custom:GQLuserID": newuuid,
      });
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
