import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchMyActions from "../data/fetchMyActions"
import useAuth from "../auth/useAuth";


function MyActionsScreen({ navigation }) {
  const [actions, setActions] = useState();
  const { user, logOut } = useAuth();

  useEffect(() => {
    fetchMyActions(setActions, user.attributes["custom:GQLuserID"]);
  }, []);

  return (
      <Screen style={styles.screen}>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => fetchMyActions(setActions, user.attributes["custom:GQLuserID"])}/>
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default MyActionsScreen;
