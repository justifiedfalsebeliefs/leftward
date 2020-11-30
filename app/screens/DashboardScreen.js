import React, { useEffect, useState} from "react";
import eventHub from "../events/eventHub";
import { View } from "react-native";
import getData from "../data/getData";
import Screen from "../components/Screen";
import ActionList from "../components/ActionList";
import LevelWidget from "../components/widgets/LevelWidget";
import wait from "../utility/wait"


function DashboardScreen({ navigation }) {
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
      wait(1000).then(() => refreshDashboard());
      return refresh
    });
  }, [navigation]);

  return (
      <Screen>
        <LevelWidget userExperience={userExperience} navigation={navigation}/>
        <View style={{height:20}}></View>
        <ActionList
          height = '80%'
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => refreshDashboard()}
          title={"Actions"}/>
      </Screen>
  );
}

export default DashboardScreen;
