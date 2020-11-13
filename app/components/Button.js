import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import fonts from "../config/fonts"
import colors from "../config/colors";

function Button({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 8,
    width: "90%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: fonts.subTitle
  },
});

export default Button;
