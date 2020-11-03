import React, { useEffect, useState } from "react";
import { StyleSheet, Text} from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchMyActions from "../data/fetchMyActions"
import useAuth from "../auth/useAuth";
import * as Amplitude from 'expo-analytics-amplitude';



function MyActionsScreen({ navigation }) {
  // Analytics
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {Amplitude.logEvent('ViewMyActions')});
  /////
  
  const [actions, setActions] = useState([]);
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
  return (
      <Screen style={styles.screen}>
        {!actions.length  && ( <Text>Your in progress actions will show up here! {"\n"} Add some from the dashboard screen.</Text> )}

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
