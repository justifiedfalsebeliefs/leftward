import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, ImageBackground} from "react-native";
import { Image } from "react-native-expo-image-cache";
import Text from "./Text";
import colors from "../config/colors";
import CauseIcon from "./CauseIcon";
import Swipeable from "react-native-gesture-handler/Swipeable";

function ActionCard({
  title,
  description,
  imageUrl,
  onPress,
  cause,
  reward,
  actionType,
  organization,
  renderRightActions
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <View style={styles.orgContainer}>
                <Text style={styles.organization}>{organization}</Text>
                <CauseIcon style={styles.icon} cause={cause} size={35}></CauseIcon>
              </View>
              <Text style={styles.tagline} numberOfLines={3}>
                {description}
              </Text>

              <View style={styles.rewardContainer}>
                <Text style={styles.actionType}>{actionType}</Text>
                <Text style={styles.reward}>{`Reward: ${reward} points`}</Text>
              </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionType:{
    fontSize: 12,
    fontStyle: 'italic'},
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  icon:{

  },
  detailsContainer: {
    padding: 20,
  },
  imagefilter:{
    backgroundColor: colors.black,
    opacity: 0.5,
    flex: 1
  },
  orgContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 20,
    paddingEnd: 10,
    padding: 2,
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
    fontSize: 16,
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
    paddingTop: 7,
    paddingHorizontal: 7,
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold"
  },
  tagline:{
    paddingHorizontal: 7,
    fontSize: 12,
  }
});

export default ActionCard;
