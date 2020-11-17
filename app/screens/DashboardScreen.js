import React, { useEffect, useState} from "react";
import { View } from "react-native";
import useAuth from "../auth/useAuth";
import callApi from "../data/callApi";
import * as Amplitude from 'expo-analytics-amplitude';
import Screen from "../components/Screen";
import ActionList from "../components/ActionList";
import LevelWidget from "../components/widgets/LevelWidget";
import CauseActionBreakdownWidget from "../components/widgets/CauseActionBreakdownWidget";

function DashboardScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const [userExperience, setUserExperience] = useState();
  const [actions, setActions] = useState();
  const useMountEffect = (fun) => useEffect(fun, [])

  async function refreshDashboard(){
    const exp = await callApi("fetchUserExperience");
    const listings = await callApi("fetchDashboardListings");
    setUserExperience(exp[0]);
    setActions(listings);}

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      refreshDashboard()
      return refresh
    });
  }, [navigation]);
  
  useMountEffect(() => {
    Amplitude.setUserId(user.attributes["custom:GQLuserID"]);
    Amplitude.logEvent('ViewDashboard');
  });

  return (
      <Screen>
        <LevelWidget userExperience={userExperience} navigation={navigation}/>
        <View style={{height:20}}></View>
        <CauseActionBreakdownWidget userExperience={userExperience} navigation={navigation}/>
        <View style={{height:20}}></View>
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => refreshDashboard()}
          title={"Actions"}/>
      </Screen>
  );
}

export default DashboardScreen;
