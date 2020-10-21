import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchHiddenActions from "../data/fetchHiddenActions"
import useAuth from "../auth/useAuth";


function HiddenActionsScreen({ navigation }) {
  const [actions, setActions] = useState();
  const { user, logOut } = useAuth();

  useEffect(() => {
    fetchHiddenActions(setActions, user.attributes["custom:GQLuserID"]);
  }, []);

  return (
      <Screen style={styles.screen}>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => fetchHiddenActions(setActions, user.attributes["custom:GQLuserID"])}/>
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default HiddenActionsScreen;
