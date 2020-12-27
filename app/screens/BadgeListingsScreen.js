import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { View, StyleSheet, Linking, ScrollView } from "react-native";
import telemetry from "../analytics/telemetry";
import { Layout, Text, useTheme, Button } from "@ui-kitten/components";
import Screen from "../components/Screen";
import BadgeList from "../components/widgets/badges/BadgeList";

function BadgeListingsScreen({ route, navigation }) {
  const things = useContext(RootStoreContext);

  useMountEffect(() => {
    telemetry((eventTitle = "viewBadgeListingsScreen"));
  });

  const fakeBadges = [
    {
      badgeId: 1,
      title: "Big boy badge",
      description: "Awarded for being super great",
    },
    {
      badgeId: 2,
      title: "Big dingus badge",
      description: "Awarded for being super great",
    },
    {
      badgeId: 3,
      title: "Big testero badge",
      description: "Awarded for being super great",
    },
    {
      badgeId: 4,
      title: "Big crungus badge",
      description: "Awarded for being super great",
    },
  ];

  return (
    <Screen scrolling={false} back={true} navigation={navigation}>
      <BadgeList
        title={"Badge Category"}
        itemList={fakeBadges}
        style={styles.widgetSpacerPrimary}
      ></BadgeList>
      <BadgeList
        title={"Badge Category"}
        itemList={fakeBadges}
        style={styles.widgetSpacerPrimary}
      ></BadgeList>
      <BadgeList
        title={"Badge Category"}
        itemList={fakeBadges}
        style={styles.widgetSpacerPrimary}
      ></BadgeList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  widgetSpacerPrimary: {
    marginBottom: 30,
  },
});

export default BadgeListingsScreen;
