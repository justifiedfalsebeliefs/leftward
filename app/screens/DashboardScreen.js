import React, { useEffect, useState} from "react";
import { View } from "react-native";
import useAuth from "../auth/useAuth";
import callApi from "../data/callApi";
import * as Amplitude from 'expo-analytics-amplitude';
import useMountEffect from '../hooks/useMountEffect'
import refreshToken from '../auth/refreshToken'
import Screen from "../components/Screen";
import ActionList from "../components/ActionList";
import LevelWidget from "../components/widgets/LevelWidget";
import CauseActionBreakdownWidget from "../components/widgets/CauseActionBreakdownWidget";

function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [userExperience, setUserExperience] = useState();
  const [actions, setActions] = useState();

  async function refreshDashboard(){
    const exp = await callApi(user, "fetchUserExperience");
    const listings = await callApi(user, "fetchDashboardListings");
    setUserExperience(exp[0]);
    setActions(listings);}

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      refreshDashboard()
      return refresh
    });
  }, [navigation]);
  
  useMountEffect(() => {
    Amplitude.setUserId(user.idToken.payload["custom:userGuid"]);
    Amplitude.logEvent('ViewDashboard');
  });

  refreshToken();

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
