import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { StyleSheet } from "react-native";
import telemetry from "../analytics/telemetry";
import { Text } from "@ui-kitten/components";
import Screen from "../components/Screen";
import ActionListVertical from "../components/widgets/actions/ActionListVertical";

function ActionListingsScreen({ route, navigation }) {
  const things = useContext(RootStoreContext);
  async function refreshScreen() {}

  useMountEffect(() => {
    telemetry((eventTitle = "viewActionListingsScreen")); // update with source button
    !things.dashboardActionListings || !things.userStatistics
      ? refreshScreen()
      : null;
  });
  return (
    <Screen scrolling={false} back={true} navigation={navigation}>
      <Text
        category="h1"
        style={{
          textAlign: "center",
          marginVertical: 20,
          fontWeight: "bold",
        }}
      >
        {route.params}
      </Text>
      <ActionListVertical
        itemList={things.dashboardActionListings}
        navigation={navigation}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default ActionListingsScreen;
