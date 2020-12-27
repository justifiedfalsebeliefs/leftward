import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { StyleSheet, Linking } from "react-native";
import telemetry from "../analytics/telemetry";
import routes from "../navigation/routes";
import { Layout, Button } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ActionCompleteURLScreen({ route, navigation }) {
  const things = useContext(RootStoreContext);
  const action = route.params;
  telemetry(
    ((eventTitle = "viewActionCompleteURLScreen"),
    { actionId: action.actionId, actionTitle: action.actionTitle })
  );

  const confirmComplete = async () => {
    telemetry((eventTitle = "confirmActionComplete"), {
      actionId: action.actionId,
      actionTitle: action.actionTitle,
    });
    things.updateActionStatus("COMPLETE", action.actionId);
    navigation.navigate(routes.DASHBOARD);
  };

  const handleCompleteInBrowserPress = async () => {
    telemetry((eventTitle = "completeInBrowserPress"), {
      actionId: action.actionId,
      actionTitle: action.actionTitle,
    });
    Linking.openURL(action.actionUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <Screen back={true} navigation={navigation}>
        <Layout level="4" style={{ alignItems: "center", paddingBottom: 30 }}>
          <MaterialCommunityIcons
            name="image-size-select-large"
            size={300}
            color="black"
          />
          <Button
            status="success"
            onPress={() => handleCompleteInBrowserPress()}
          >
            Complete in Browser
          </Button>

          <Button status="success" onPress={() => confirmComplete()}>
            Confirm complete
          </Button>
        </Layout>
      </Screen>
    </Layout>
  );
}

export default ActionCompleteURLScreen;
