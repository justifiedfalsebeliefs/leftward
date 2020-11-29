import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import fonts from "../config/fonts"
import CauseIcon from "./CauseIcon";
import Swipeable from "react-native-gesture-handler/Swipeable";

function ActionCard({
  title,
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
        <View style={styles.cardContainer}>
          <View style={styles.titleBar}>
            <CauseIcon style={styles.icon} cause={cause} size={35}></CauseIcon>
            <Text style={styles.actionTypeText}>{actionType}</Text>
            <Text style={styles.rewardText}>{`${reward} pts`}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.orgText}>{organization}</Text>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    borderColor: colors.subComponentBorder,
    borderWidth: 1.5,
    backgroundColor: colors.subComponentBackground,
    marginBottom: 13,
    overflow: "hidden",
  },
  titleBar:{
    backgroundColor: colors.componentHighlightBackground,
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  actionTypeText:{
    fontSize: 12,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    fontFamily: fonts.type
  },
  rewardText: {
      color: colors.dark,
      fontWeight: "bold",
      fontSize: 12,
      marginLeft: "auto",
      paddingHorizontal: 5,
      fontFamily: fonts.type

  },
  contentContainer:{
    padding: 10
  },
  orgText: {
    fontWeight: "bold",
    textAlignVertical: "center",
    fontSize: 12,
    paddingBottom: 5,
    fontFamily: fonts.subTitle
  },

  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    fontFamily: fonts.condensed
  },



});

export default ActionCard;
