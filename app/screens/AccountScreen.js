import React from "react";
import eventHub from "../events/eventHub"
import { StyleSheet, View, FlatList, Text} from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import fonts from "../config/fonts";


const menuItems = [
  {
    title: "Hidden Actions",
    icon: {
      name: "format-list-bulleted"
    },
    targetScreen: routes.HIDDENACTIONS,
  },
  {
    title: "Manage Account",
    icon: {
      name: "account-settings"
    },
    targetScreen: routes.SETTINGS,
  },
  {
    title: "Update Cause Preferences",
    icon: {
      name: "selection-ellipse-arrow-inside"
    },
    targetScreen: routes.UPDATECAUSE,
  }
];

function AccountScreen({ navigation }) {
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewAccount')
  const { user, logOut } = useAuth();
  
  return (
    <Screen>
      <Text style={styles.username}>{user.username}</Text>
      <View style={{height:20}}></View>
      <View style={{
      backgroundColor: colors.componentBackground,
      borderRadius: 15,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.26,
      shadowRadius: 6.68,
      elevation: 4,
    }}>
      <FlatList
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
            onPress={() => navigation.navigate(item.targetScreen)}
          />
        )}
      />
      <View style={{height:40}}></View>
          <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={colors.danger} />}
        onPress={() => logOut()}
      />
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  viewContainer:{
    alignSelf: "flex-end"
  },
  container: {
    marginVertical: 20,
  },
  username: { marginHorizontal: 20, fontFamily: fonts.componentTitle, fontSize:20 },
});

export default AccountScreen;
