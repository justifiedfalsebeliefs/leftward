import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext"
import { observer } from "mobx-react-lite"
import telemetry from "../analytics/telemetry"
import { View } from "react-native";
import useMountEffect from "../hooks/useMountEffect"
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"

function StatisticsScreen({ navigation }) {
  const things = useContext(RootStoreContext)

  async function refreshActions(){
    things.updateListingsInProgressShouldUpdate(true)
    things.updateListingsCompletedShouldUpdate(true)
    }

  useMountEffect(() => {
    telemetry(eventTitle='viewStatistics');
    !things.listingsInProgress || !things.listingsCompleted ? refreshActions() : null;
  })

  return (
      <Screen>
        <ActionList
          height= {"30%"}
          itemList={things.listingsInProgress}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}
          title={"In Progress"}
          icon={"clock-outline"}/>
        <View style={{height:20}}></View>
        <ActionList
          height = {"60%"}
          itemList={things.listingsCompleted}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}
          title={"Completed"}
          icon={"check-bold"}/>
      </Screen>
  );
}

export default observer(StatisticsScreen);
