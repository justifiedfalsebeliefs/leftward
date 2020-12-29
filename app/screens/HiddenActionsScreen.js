import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import telemetry from "../analytics/telemetry";
import useMountEffect from "../hooks/useMountEffect";
import Screen from "../components/Screen";

function HiddenActionsScreen({ navigation }) {
  const things = useContext(RootStoreContext);

  async function refreshActions() {
    things.updateListingsHiddenShouldUpdate(true);
  }

  useMountEffect(() => {
    // telemetry((eventTitle = "viewHiddenActionsScreen"));
    !things.listingsHidden ? refreshActions() : null;
  });

  return <Screen></Screen>;
}

export default observer(HiddenActionsScreen);
