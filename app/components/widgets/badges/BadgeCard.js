import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BadgeContainer from "./BadgeContainer";

function BadgeCard({ title, onPress }) {
  const cardSize = 120;
  return (
    <BadgeContainer>
      <TouchableWithoutFeedback onPress={onPress}>
        <Layout
          level={"1"}
          style={{ width: cardSize, height: cardSize, alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="trophy-award"
            size={cardSize}
            color="black"
          />
        </Layout>
      </TouchableWithoutFeedback>
    </BadgeContainer>
  );
}

const styles = StyleSheet.create({});

export default BadgeCard;
