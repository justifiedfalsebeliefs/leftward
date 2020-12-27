import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WidgetContainer from "../WidgetContainer";

function ActionCard({ title, onPress }) {
  return (
    <WidgetContainer>
      <TouchableWithoutFeedback onPress={onPress}>
        <Layout
          level={"1"}
          style={{ width: 140, height: 175, alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="image-size-select-large"
            size={100}
            color="black"
          />
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
