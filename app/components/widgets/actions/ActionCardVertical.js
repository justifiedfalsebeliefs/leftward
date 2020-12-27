import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WidgetContainer from "../WidgetContainer";

function ActionCardVertical({ title, onPress }) {
  return (
    <WidgetContainer>
      <TouchableWithoutFeedback onPress={onPress}>
        <Layout
          level={"1"}
          style={{ flexDirection: "row", height: 115, alignItems: "center" }}
        >
          <Text
            category="h6"
            style={{ width: 200, fontWeight: "bold", marginHorizontal: 5 }}
          >
            {title}
          </Text>
          <MaterialCommunityIcons
            name="image-size-select-large"
            size={100}
            color="black"
          />
        </Layout>
      </TouchableWithoutFeedback>
    </WidgetContainer>
  );
}

const styles = StyleSheet.create({});

export default ActionCardVertical;
