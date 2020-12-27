import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import ActionCardVertical from "./ActionCardVertical";
import routes from "../../../navigation/routes";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function ActionListVertical({ itemList, navigation }) {
  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={itemList}
      keyExtractor={(item) => item.actionId.toString()}
      renderItem={({ item }) => (
        <ActionCardVertical
          title={item.actionTitle}
          description={item.actionDescription}
          onPress={() => navigation.navigate(routes.ACTION_DETAILS, item)}
        />
      )}
      ItemSeparatorComponent={() => <Layout level="4" style={{ height: 20 }} />}
    />
  );
}

const styles = StyleSheet.create({});

export default ActionListVertical;
