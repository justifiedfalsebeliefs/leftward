import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import telemetry from "../analytics/telemetry";
import { StyleSheet, View, FlatList, Linking, Share } from "react-native";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import WidgetContainer from "../components/widgets/WidgetContainer";
import { Button } from "@ui-kitten/components";

// const menuItems = [
// {
//   title: "Hidden Actions",
//   icon: {
//     name: "format-list-bulleted",
//   },
//   buttonCommand: { doThis: "navigate", target: routes.HIDDENACTIONS },
// },
//   {
//     title: "Manage Account",
//     icon: {
//       name: "account-settings",
//     },
//     buttonCommand: { doThis: "navigate", target: routes.SETTINGS },
//   },
//   {
//     title: "Our Values",
//     icon: {
//       name: "link",
//     },
//     buttonCommand: { doThis: "link", target: "https://leftward.app/" },
//   },
//   {
//     title: "Share Leftward!",
//     icon: {
//       name: "share",
//     },
//     buttonCommand: { doThis: "share" },
//   },
// ];

function AccountScreen({ navigation }) {
  telemetry("viewAccountScreen", true);
  const { user, logOut } = useAuth();
  const things = useContext(RootStoreContext);

  const handleValuesPress = async () => {
    Linking.openURL("https://leftward.app/").catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const handleSharePress = async () => {
    await Share.share({
      message: "Checkout the site Leftward.app",
    });
  };
  return (
    <Screen scrolling={false} paddingHorizontal={20}>
      <Button status={"info"} style={[styles.widgetSpacer, { marginTop: 50 }]}>
        Manage Account
      </Button>
      <Button
        status={"info"}
        onPress={() => handleValuesPress()}
        style={[styles.widgetSpacer]}
      >
        Our Values
      </Button>
      <Button status={"success"} onPress={() => handleSharePress()}>
        Share Leftward
      </Button>
      <Layout
        level="4"
        style={{ flex: 1, justifyContent: "flex-end", marginBottom: 40 }}
      >
        <Button status={"warning"} onPress={() => logOut()} style={{}}>
          Log Out
        </Button>
      </Layout>
      {/* <Button onPress={things.toggleTheme}>Toggle Theme</Button> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  widgetSpacer: {
    marginBottom: 30,
  },
});

export default AccountScreen;
