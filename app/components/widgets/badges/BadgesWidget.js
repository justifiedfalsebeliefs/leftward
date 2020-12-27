import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "../../Icon";
import WidgetContainer from "../WidgetContainer";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function BadgesWidget({ badgesData, height = 100 }) {
  return (
    <WidgetContainer>
      <Layout style={{ height: height }}>
        <Layout style={styles.titleContainer}>
          <Icon name={"trophy"} size={40}></Icon>
          <Text style={{ marginHorizontal: 10 }} category="h4">
            {"Badges"}
          </Text>
        </Layout>
      </Layout>
    </WidgetContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
});

export default BadgesWidget;
