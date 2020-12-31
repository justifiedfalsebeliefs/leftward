import React, { useContext } from "react";
import { FlatList } from "react-native";
import { RootStoreContext } from "../../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function RecentActionsSubWidget({}) {
  const theme = useTheme();
  const things = useContext(RootStoreContext);
  return (
    <>
      <Text category="h2" style={{ fontWeight: "bold", marginBottom: 15 }}>
        Personal progress
      </Text>
      <Layout
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 6,
          paddingHorizontal: 6,
        }}
      >
        <Text category="s1" style={{ fontWeight: "bold" }}>
          {"Recent Actions"}
        </Text>
        <FlatList
          style={{ flexGrow: 0 }}
          data={things.completed.slice(0, 4)}
          keyExtractor={(item) => item.actionId.toString()}
          renderItem={({ item }) => (
            <Text category="c2" style={{ color: theme["color-basic-600"] }}>
              - {item.actionType}
            </Text>
          )}
        />
      </Layout>
    </>
  );
}

export default observer(RecentActionsSubWidget);
