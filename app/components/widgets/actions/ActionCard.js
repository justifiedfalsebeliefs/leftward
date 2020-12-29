import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import AppIcon from "../../AppIcon";
import WidgetContainer from "../WidgetContainer";

function ActionCard({ title, onPress }) {
  return (
    <WidgetContainer>
      <TouchableWithoutFeedback onPress={onPress}>
        <Layout
          level={"1"}
          style={{ width: 140, height: 175, alignItems: "center" }}
        >
          <AppIcon name="no-image" size="small" />
          <Text
            category="s1"
            style={{ fontWeight: "bold", marginHorizontal: 5 }}
          >
            {title}
          </Text>
        </Layout>
      </TouchableWithoutFeedback>
    </WidgetContainer>
  );
}

export default ActionCard;
