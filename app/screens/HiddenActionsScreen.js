import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchHiddenActions from "../data/fetchHiddenActions"



function HiddenActionsScreen({ navigation }) {
  const [actions, setActions] = useState();
  
  useEffect(() => {
    fetchHiddenActions(setActions);
  }, []);

  return (
      <Screen style={styles.screen}>
        <ActionList
          itemList={actions}
          navigation={navigation}/>
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default HiddenActionsScreen;
