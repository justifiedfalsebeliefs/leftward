import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import telemetry from "../analytics/telemetry";
import Screen from "../components/Screen";
import LevelWidget from "../components/widgets/progress/LevelWidget";
import CompletedActionsStack from "../components/stacks/CompletedActionsStack";
import SavedActionsStack from "../components/stacks/SavedActionsStack";
import BadgeSummaryWidget from "../components/widgets/badges/BadgeSummaryWidget";

function StatisticsScreen({ navigation }) {
  const things = useContext(RootStoreContext);
  telemetry((eventTitle = "viewStatisticsScreen"), (onMount = true));
  async function refresh() {
    things.updateAppStateShouldUpdate(true);
  }

  return (
    <Screen doOnRefresh={() => refresh()} scrolling={true}>
      <LevelWidget
        leftWidget="RecentActions"
        style={styles.widgetSpacerWithMargin}
      />
      {/* <BadgeSummaryWidget navigation={navigation} style={styles.widgetSpacer} /> */}
      <SavedActionsStack
        navigation={navigation}
        style={styles.widgetSpacerWithMargin}
      />
      <CompletedActionsStack
        navigation={navigation}
        style={styles.widgetSpacerWithMargin}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  widgetSpacerWithMargin: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  widgetSpacer: {
    marginBottom: 30,
  },
});
export default observer(StatisticsScreen);
