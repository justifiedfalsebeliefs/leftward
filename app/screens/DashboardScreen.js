import React, { useEffect, useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import ActionList from "../components/ActionList"
import LevelWidget from "../components/widgets/LevelWidget"
import CauseExpBreakdownWidget from "../components/widgets/CauseExpBreakdownWidget"
import fetchDashboardListings from "../data/fetchDashboardListings"
import fetchUserExperience from "../data/fetchUserExperience"
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

import * as Amplitude from 'expo-analytics-amplitude';

function DashboardScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [userExperience, setUserExperience] = useState();
  const [actions, setActions] = useState();

  Amplitude.setUserId(user.attributes["custom:GQLuserID"])
  
  async function getExperience(){
    const exp = await fetchUserExperience(user.attributes["custom:GQLuserID"]);
    setUserExperience(exp);
  }

  async function getListings(){
    const listings = await fetchDashboardListings(user.attributes["custom:GQLuserID"]);
    setActions(listings);
  }

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      getListings()
      getExperience()
      Amplitude.logEvent('ViewDashboard')
      return refresh
    });
  }, [navigation]);


  function refreshFunction() {
    getListings()
    getExperience()
  }

  return (
      <Screen style={styles.screen}>
        <Text>{"Dashboard"}</Text>
        <LevelWidget userExperience={userExperience} navigation={navigation}/>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => refreshFunction()}/>
      {/* <CauseExpBreakdownWidget userExperience={userExperience} navigation={navigation}/> */}
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default DashboardScreen;
