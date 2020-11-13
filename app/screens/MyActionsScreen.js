import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View} from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchMyActions from "../data/fetchMyActions"
import fetchCompletedActions from "../data/fetchCompletedActions"
import useAuth from "../auth/useAuth";
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"
import BadgesWidget from "../components/widgets/BadgesWidget";



function MyActionsScreen({ navigation }) {
  logAmplitudeEventOnMount('ViewMyActions')
  const { user, logOut } = useAuth();

  const [actionsInProgress, setActionsInProgress] = useState([]);
  const [actionsCompleted, setActionsCompleted] = useState([]);

  async function getInProgressListings(){
    const listings = await fetchMyActions(user.attributes["custom:GQLuserID"]);
    setActionsInProgress(listings);
  }

  async function getCompletedListings(){
    const listings = await fetchCompletedActions(user.attributes["custom:GQLuserID"]);
    setActionsCompleted(listings);
  }

  useEffect(() => {
    const refresh = navigation.addListener("focus", () =>{
      getInProgressListings()
      getCompletedListings()
      return refresh
    });
  }, [navigation]);
  return (
      <Screen title={"My Actions"} >
        <ActionList
          itemList={actionsInProgress}
          navigation={navigation}
          doOnRefresh={() => getInProgressListings()}
          height={200}
          title={"In Progress"}
          icon={"clock-outline"}/>
        <View style={{height:20}}></View>
        <ActionList
          itemList={actionsCompleted}
          navigation={navigation}
          doOnRefresh={() => getCompletedListings()}
          height={200}
          title={"Completed"}
          icon={"check-bold"}/>
          <View style={{height:20}}></View>
          <BadgesWidget badgesData={[]}></BadgesWidget>
      </Screen>
  );
}

const styles = StyleSheet.create({

});

export default MyActionsScreen;
