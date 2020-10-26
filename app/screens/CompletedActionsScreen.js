import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchCompletedActions from "../data/fetchCompletedActions"
import useAuth from "../auth/useAuth";
import * as Amplitude from 'expo-analytics-amplitude';



function CompletedActionsScreen({ navigation }) {
  const [actions, setActions] = useState();
  const { user, logOut } = useAuth();

  useEffect(() => {
    fetchCompletedActions(setActions, user.attributes["custom:GQLuserID"]);
  }, []);
  Amplitude.logEvent('ViewCompletedActions')
  return (
      <Screen style={styles.screen}>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => fetchCompletedActions(setActions, user.attributes["custom:GQLuserID"])}/>
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default CompletedActionsScreen;
