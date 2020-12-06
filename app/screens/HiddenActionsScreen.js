import React, { useEffect, useState } from "react";
import telemetry from "../analytics/telemetry"
import getData from "../data/getData";
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"

function HiddenActionsScreen({ navigation }) {
  telemetry(eventTitle='viewHiddenActions')
  const [actions, setActions] = useState([]);

  async function refreshActions(){
    const listings = await getData("fetchHiddenActions");
    setActions(listings);}

  useEffect(() => {refreshActions();}, []);
  
  return (
      <Screen>
        <ActionList
          title="Hidden Actions"
          icon={"archive"}
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}/>
      </Screen>
  );
}

export default HiddenActionsScreen;
