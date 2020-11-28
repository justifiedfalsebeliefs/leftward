import React, { useEffect, useState } from "react";
import eventHub from "../events/eventHub";
import { View } from "react-native";
import getData from "../data/getData";
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import BadgesWidget from "../components/widgets/BadgesWidget";

function MyActionsScreen({ navigation }) {
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewMyActions')
  const [actionsInProgress, setActionsInProgress] = useState([]);
  const [actionsCompleted, setActionsCompleted] = useState([]);

  async function refreshActions(){
    const listingsInProgress = await getData("fetchMyActions");
    const listingsCompleted = await getData("fetchCompletedActions");
    setActionsInProgress(listingsInProgress);
    setActionsCompleted(listingsCompleted);}

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      refreshActions()
      return refresh
    });
  }, [navigation]);

  return (
      <Screen>
        <ActionList
          itemList={actionsInProgress}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}
          height={200}
          title={"In Progress"}
          icon={"clock-outline"}/>
        <View style={{height:20}}></View>
        <ActionList
          itemList={actionsCompleted}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}
          height={200}
          title={"Completed"}
          icon={"check-bold"}/>
          <View style={{height:20}}></View>
          <BadgesWidget badgesData={[]}></BadgesWidget>
      </Screen>
  );
}

export default MyActionsScreen;
