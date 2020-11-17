import React, { useEffect, useState } from "react";
import callApi from "../data/callApi";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"

function HiddenActionsScreen({ navigation }) {
  logAmplitudeEventOnMount('ViewHiddenActions')
  const [actions, setActions] = useState([]);
  const { user } = useAuth();

  async function refreshActions(){
    const listings = await callApi(user, "fetchHiddenActions");
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
