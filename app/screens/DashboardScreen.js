import React, { useEffect, useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import ActionList from "../components/ActionList"
import LevelWidget from "../components/widgets/LevelWidget"
import fetchDashboardListings from "../data/fetchDashboardListings"
import fetchUserExperience from "../data/fetchUserExperience"
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";



function DashboardScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [userExperience, setUserExperience] = useState();
  const [actions, setActions] = useState();

  async function getExperience(){
    const exp = await fetchUserExperience(user.attributes["custom:GQLuserID"]);
    setUserExperience(exp);
  }

  useEffect(() => {
    fetchDashboardListings(setActions, user.attributes["custom:GQLuserID"]);
  }, []);

  useEffect(() => {
    getExperience()
  }, []);

  function refreshFunction() {
    fetchDashboardListings(setActions, user.attributes["custom:GQLuserID"])
    getExperience()
  }

  return (
      <Screen style={styles.screen}>
        <Text>{"Dashboard"}</Text>
        <LevelWidget userExperience={userExperience}/>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => refreshFunction()}/>
        <AppButton
          title={"Completed Actions"}
          onPress={() => navigation.navigate(routes.COMPLETEDACTIONS)} />
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default DashboardScreen;
