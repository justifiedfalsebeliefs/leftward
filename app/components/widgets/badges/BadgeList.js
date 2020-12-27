import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import BadgeCard from "./BadgeCard";
import routes from "../../../navigation/routes";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function BadgeList({ itemList, title, style, navigation }) {
  return (
    <Layout level="4" style={style}>
      {title && (
        <Text category="h4" style={{ fontWeight: "bold", marginBottom: 5 }}>
          {title}
        </Text>
      )}
      <FlatList
        style={{ flexGrow: 0 }}
        horizontal={true}
        data={itemList}
        keyExtractor={(item) => item.badgeId.toString()}
        renderItem={({ item }) => (
          <BadgeCard onPress={() => navigation.navigate(routes.BADGELISTING)} />
        )}
        ItemSeparatorComponent={() => (
          <Layout level="4" style={{ width: 10 }} />
        )}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default BadgeList;
