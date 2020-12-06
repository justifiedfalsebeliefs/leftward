import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext"
import { observer } from "mobx-react-lite"
import telemetry from "../analytics/telemetry"
import useMountEffect from "../hooks/useMountEffect"
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"

function HiddenActionsScreen({ navigation }) {
  const things = useContext(RootStoreContext)

  async function refreshActions(){
    things.updateListingsHiddenShouldUpdate(true)
    }

  useMountEffect(() => {
    telemetry(eventTitle='viewHiddenActions')
    !things.listingsHidden ? refreshActions() : null;
  })
  
  return (
      <Screen>
        <ActionList
          title="Hidden Actions"
          icon={"archive"}
          itemList={things.listingsHidden}
          navigation={navigation}
          doOnRefresh={() => refreshActions()}/>
      </Screen>
  );
}

export default observer(HiddenActionsScreen);
