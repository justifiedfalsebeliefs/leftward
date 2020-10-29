import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import CauseIcon from "./CauseIcon";
import colors from "../config/colors";

function DraggableFlatListItem({
  title,
  onPress,
  onLongPress,
  color = "secondary",
  icon,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={styles.text}>{title}</Text>
      <CauseIcon cause={icon} style={styles.icon}></CauseIcon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingHorizontal: 20,
    // position: "absolute",
    // justifyContent: "center",
    // alignItems: "center",
  },
  icon: {},
});

export default DraggableFlatListItem;
