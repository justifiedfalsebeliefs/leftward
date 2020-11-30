import React, { useEffect, useState } from "react";
import eventHub from "../events/eventHub";
import { View } from "react-native";
import getData from "../data/getData";
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import BadgesWidget from "../components/widgets/BadgesWidget";

function StatisticsScreen({ navigation }) {
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewStatistics')
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
        <BadgesWidget badgesData={[]}></BadgesWidget>
        <View style={{height:20}}></View>
        <ActionList
          height= {"20%"}
          itemList={actionsInProgress}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}
          title={"In Progress"}
          icon={"clock-outline"}/>
        <View style={{height:20}}></View>
        <ActionList
          height = {"60%"}
          itemList={actionsCompleted}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}
          title={"Completed"}
          icon={"check-bold"}/>
      </Screen>
  );
}

export default StatisticsScreen;
