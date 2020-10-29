import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import AppText from "../components/AppText";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import * as Amplitude from 'expo-analytics-amplitude';


const menuItems = [
  {
    title: "Hidden Actions",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary
    },
    targetScreen: routes.HIDDENACTIONS,
  },
  {
    title: "Manage Account",
    icon: {
      name: "account-settings",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.SETTINGS,
  },
  {
    title: "Update Cause Preferences",
    icon: {
      name: "account-settings",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.UPDATECAUSE,
  },
  // {
  //   title: "Update Action Preferences",
  //   icon: {
  //     name: "account-settings",
  //     backgroundColor: colors.secondary,
  //   },
  //   targetScreen: routes.UPDATEACTION,
  // },
];

function AccountScreen({ navigation }) {
  // Analytics
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {Amplitude.logEvent('ViewAccount')});
  /////
  const { user, logOut } = useAuth();
  
  return (
    <Screen style={styles.screen}>
      <AppText style={styles.username}>{user.username}</AppText>

      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
  username: { marginHorizontal: 20 },
});

export default AccountScreen;
