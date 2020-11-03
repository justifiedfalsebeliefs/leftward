import React, { useEffect, useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import ActionList from "../components/ActionList"
import LevelWidget from "../components/widgets/LevelWidget"
import CauseExpBreakdownWidget from "../components/widgets/CauseExpBreakdownWidget"
import CauseActionBreakdownWidget from "../components/widgets/CauseActionBreakdownWidget";
import fetchDashboardListings from "../data/fetchDashboardListings"
import fetchUserExperience from "../data/fetchUserExperience"
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

import * as Amplitude from 'expo-analytics-amplitude';


function DashboardScreen({ navigation }) {


  const { user, logOut } = useAuth();
  const [userExperience, setUserExperience] = useState();
  const [actions, setActions] = useState();

  async function getExperience(){
    const exp = await fetchUserExperience(user.attributes["custom:GQLuserID"]);
    setUserExperience(exp);
  }

  async function getListings(){
    const listings = await fetchDashboardListings(user.attributes["custom:GQLuserID"], user.attributes["custom:causes"]);
    setActions(listings);
  }

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      getListings()
      getExperience()
      return refresh
    });
  }, [navigation]);

  // Analytics
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {
    Amplitude.setUserId(user.attributes["custom:GQLuserID"]);
    Amplitude.logEvent('ViewDashboard');
  });
  /////

  function refreshFunction() {
    getListings()
    getExperience()
  }
  
  return (
      <Screen style={styles.screen}>
        <LevelWidget userExperience={userExperience} navigation={navigation}/>
        <CauseActionBreakdownWidget userExperience={userExperience} navigation={navigation}/>
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
    paddingHorizontal: 10,
    backgroundColor: colors.light,
  }
});

export default DashboardScreen;
