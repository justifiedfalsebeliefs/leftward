import React, { useEffect, useState} from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import ActionList from "../components/ActionList"
import fetchDashboardListings from "../data/fetchDashboardListings"
import useAuth from "../auth/useAuth";

import debug from "../utility/debug"


function DashboardScreen({ navigation }) {
  const [actions, setActions] = useState();
  const { user, logOut } = useAuth();

  useEffect(() => {
    fetchDashboardListings(setActions, user.attributes["custom:GQLuserID"]);
  }, []);

  return (
      <Screen style={styles.screen}>
        <AppButton
          title={"debug printer"}
          onPress={() => debug(actions)} />
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => fetchDashboardListings(setActions, user.attributes["custom:GQLuserID"])}/>
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  }
});

export default DashboardScreen;
