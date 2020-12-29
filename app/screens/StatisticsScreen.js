import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { RootStoreContext } from "../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import telemetry from "../analytics/telemetry";
import useMountEffect from "../hooks/useMountEffect";
import Screen from "../components/Screen";
import LevelWidget from "../components/widgets/progress/LevelWidget";
import CompletedActionsStack from "../components/stacks/CompletedActionsStack";
import SavedActionsStack from "../components/stacks/SavedActionsStack";
import BadgeSummaryWidget from "../components/widgets/badges/BadgeSummaryWidget";

function StatisticsScreen({ navigation }) {
  const things = useContext(RootStoreContext);

  async function refreshData() {
    things.updateSavedShouldUpdate(true);
    things.updateCompletedShouldUpdate(true);
  }

  useMountEffect(() => {
    // telemetry((eventTitle = "viewStatisticsScreen"));
  });

  return (
    <Screen doOnRefresh={refreshData} scrolling={true}>
      <LevelWidget
        leftWidget="ActionBadgesSummary"
        style={styles.widgetSpacerPrimary}
      />
      <BadgeSummaryWidget
        navigation={navigation}
        style={styles.widgetSpacerPrimary}
      />
      <SavedActionsStack
        navigation={navigation}
        style={styles.widgetSpacerPrimary}
      />
      <CompletedActionsStack
        navigation={navigation}
        style={styles.widgetSpacerPrimary}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  widgetSpacerPrimary: {
    marginBottom: 30,
  },
});
export default observer(StatisticsScreen);
