import React, { useEffect, useState} from "react";
import eventHub from "../events/eventHub";
import { View } from "react-native";
import getData from "../data/getData";
import refreshToken from '../auth/refreshToken'
import Screen from "../components/Screen";
import ActionList from "../components/ActionList";
import LevelWidget from "../components/widgets/LevelWidget";
import CauseActionBreakdownWidget from "../components/widgets/CauseActionBreakdownWidget";

function DashboardScreen({ navigation }) {
  refreshToken();
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewDashboard')

  const [userExperience, setUserExperience] = useState();
  const [actions, setActions] = useState();

  async function refreshDashboard(){
    const exp = await getData("fetchUserExperience");
    const listings = await getData("fetchDashboardListings");
    setUserExperience(exp[0]);
    setActions(listings);}

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      refreshDashboard()
      return refresh
    });
  }, [navigation]);

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
