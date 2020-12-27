import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { RootStoreContext } from "../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import telemetry from "../analytics/telemetry";
import useMountEffect from "../hooks/useMountEffect";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import LevelWidget from "../components/widgets/progress/LevelWidget";
import DashboardActionsWidget from "../components/widgets/actions/DashboardActionsWidget";
import ActionsByTypeStack from "../components/stacks/ActionsByTypeStack";
import ActionsByCauseStack from "../components/stacks/ActionsByCauseStack";
import ActionsByOtherStack from "../components/stacks/ActionsByOtherStack";

function DashboardScreen({ navigation }) {
  const things = useContext(RootStoreContext);

  async function refreshData() {
    things.updateDashboardActionListingsShouldUpdate(true);
    things.updateUserStatisticsShouldUpdate(true);
  }

  useMountEffect(() => {
    telemetry((eventTitle = "viewDashboardScreen"));
    !things.dashboardActionListings || !things.userStatistics
      ? refreshData()
      : null;
  });

  async function handleSectionButtonPress(title) {
    navigation.navigate(routes.ACTIONLISTING, title);
  }

  return (
    <Screen doOnRefresh={refreshData} scrolling={true}>
      <LevelWidget
        leftWidget="RecentActions"
        style={styles.widgetSpacerPrimary}
      />
      <DashboardActionsWidget
        navigation={navigation}
        style={styles.widgetSpacerPrimary}
      />
      <ActionsByTypeStack
        navigation={navigation}
        style={styles.widgetSpacerPrimary}
      />
      <ActionsByCauseStack
        navigation={navigation}
        style={styles.widgetSpacerPrimary}
      />
      <ActionsByOtherStack
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

export default observer(DashboardScreen);
