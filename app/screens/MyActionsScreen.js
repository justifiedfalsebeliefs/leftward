import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchMyActions from "../data/fetchMyActions"
import useAuth from "../auth/useAuth";
import * as Amplitude from 'expo-analytics-amplitude';



function MyActionsScreen({ navigation }) {
  const [actions, setActions] = useState();
  const { user, logOut } = useAuth();

  async function getListings(){
    const listings = await fetchMyActions(user.attributes["custom:GQLuserID"]);
    setActions(listings);
  }


  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      getListings()
      return refresh
    });
  }, [navigation]);
  Amplitude.logEvent('ViewMyActions')
  return (
      <Screen style={styles.screen}>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => getListings()}/>
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
