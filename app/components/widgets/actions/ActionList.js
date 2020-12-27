import React from "react";
import { FlatList } from "react-native";
import ActionCard from "./ActionCard";
import routes from "../../../navigation/routes";
import { Layout } from "@ui-kitten/components";

function ActionList({ itemList, navigation }) {
  return (
    <FlatList
      style={{ flexGrow: 0 }}
      horizontal={true}
      data={itemList}
      keyExtractor={(item) => item.actionId.toString()}
      renderItem={({ item }) => (
        <ActionCard
          title={item.actionTitle}
          onPress={() => navigation.navigate(routes.ACTION_DETAILS, item)}
        />
      )}
      ItemSeparatorComponent={() => <Layout level="4" style={{ width: 10 }} />}
    />
  );
}

export default ActionList;
