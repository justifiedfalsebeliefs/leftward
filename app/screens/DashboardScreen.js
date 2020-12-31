import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { StyleSheet, Image } from "react-native";
import { observer } from "mobx-react-lite";
import telemetry from "../analytics/telemetry";
import Screen from "../components/Screen";
import useMountEffect from "../hooks/useMountEffect";
import DashboardActionsWidget from "../components/widgets/actions/DashboardActionsWidget";
import ActionsByTypeStack from "../components/stacks/ActionsByTypeStack";
import ActionsByCauseStack from "../components/stacks/ActionsByCauseStack";
import ActionsByOtherStack from "../components/stacks/ActionsByOtherStack";

function DashboardScreen({ navigation }) {
  const things = useContext(RootStoreContext);
  telemetry((eventTitle = "viewDashboardScreen"), (onMount = true));
  async function refresh() {
    things.updateAppStateShouldUpdate(true);
  }
  useMountEffect(() => {
    things.updateIsLoading(false);
  });

  return (
    <Screen doOnRefresh={() => refresh()} scrolling={true}>
      <Image
        source={require("../assets/leftward_logo_horizontal.png")}
        style={styles.logo}
      ></Image>
      <DashboardActionsWidget
        navigation={navigation}
        style={styles.widgetSpacer}
      />
      <ActionsByTypeStack
        navigation={navigation}
        style={styles.widgetSpacerWithMargin}
      />
      <ActionsByCauseStack
        navigation={navigation}
        style={styles.widgetSpacerWithMargin}
      />
      <ActionsByOtherStack
        navigation={navigation}
        style={styles.widgetSpacerWithMargin}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "90%",
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  widgetSpacerWithMargin: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  widgetSpacer: {
    marginBottom: 30,
  },
});

export default observer(DashboardScreen);
