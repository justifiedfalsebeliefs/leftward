import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Text from "./Text";
import colors from "../config/colors";
import CauseIcon from "./CauseIcon";

function ActionCard({
  title,
  description,
  imageUrl,
  onPress,
  cause,
  reward,
  actionType,
  organization,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {/* <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        /> */}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.orgContainer}>
          <Text style={styles.organization}>{organization}</Text>

          {/* <CauseIcon style={styles.icon} cause={cause}></CauseIcon> */}
        </View>
        <View style={styles.rewardContainer}>
          <Text style={styles.actionType}>{actionType}</Text>
          <Text style={styles.reward}>{reward}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  orgContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingEnd: 20,
  },
  rewardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  image: {
    width: "100%",
    height: 100,
  },

  organization: {
    color: colors.primary,
    fontWeight: "bold",
    textAlignVertical: "center",
    paddingEnd: 20,
  },
  reward: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 12,
  },
  opportunityType: {
    alignSelf: "flex-start",
    color: colors.secondary,
    fontSize: 12,
  },
  title: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default ActionCard;
