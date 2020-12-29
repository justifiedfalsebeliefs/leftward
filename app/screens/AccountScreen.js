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
  // telemetry((eventTitle = "viewAccountScreen"));
  const { user, logOut } = useAuth();
  const things = useContext(RootStoreContext);

  const handleButtonPress = async (buttonCommand) => {
    if (buttonCommand.doThis == "navigate") {
      navigation.navigate(buttonCommand.target);
    }
    if (buttonCommand.doThis == "link") {
      Linking.openURL(buttonCommand.target).catch((err) =>
        console.error("Couldn't load page", err)
      );
    }
    if (buttonCommand.doThis == "share") {
      await Share.share({
        message: "Checkout the site Leftward.app",
      });
    }
  };
  return (
    <Screen>
      <WidgetContainer>
        {/* <FlatList
          style={{ paddingBottom: 50 }}
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => handleButtonPress(item.buttonCommand)}
            />
          )}
        /> */}
        <Button onPress={() => logOut()}>Log Out</Button>
        <Button onPress={things.toggleTheme}>Toggle Theme</Button>
      </WidgetContainer>
    </Screen>
  );
}

export default AccountScreen;
