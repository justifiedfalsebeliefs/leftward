import React, { useEffect, useState } from "react";
import eventHub from "../events/eventHub";
import getData from "../data/getData";
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"

function HiddenActionsScreen({ navigation }) {
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewHiddenActions')
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
