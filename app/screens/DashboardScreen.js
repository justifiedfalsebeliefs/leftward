import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext"
import { observer } from "mobx-react-lite"
import telemetry from "../analytics/telemetry"
import useMountEffect from "../hooks/useMountEffect"
import Screen from "../components/Screen";
import ActionList from "../components/ActionList";
import LevelWidget from "../components/widgets/LevelWidget";


function DashboardScreen({ navigation }) {
  const things = useContext(RootStoreContext)

  async function refreshDashboard(){
    things.updateDashboardActionListingsShouldUpdate(true)
    things.updateUserStatisticsShouldUpdate(true)
    }

  useMountEffect(() => {
    telemetry(eventTitle='viewDashboard');
    !things.dashboardActionListings || !things.userStatistics ? refreshDashboard() : null;
  })
  
  return (
      <Screen>
        <LevelWidget userStatistics={things.userStatistics}/>
        <ActionList
          height = '80%'
          itemList={things.dashboardActionListings}
          navigation={navigation}
          doOnRefresh={() => refreshDashboard()}
          title={"Actions"}/>
      </Screen>
  );
}

export default observer(DashboardScreen);
