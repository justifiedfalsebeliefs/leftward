import React from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View } from "react-native";

function CauseIcon({
  cause = "default",
  size = 40,
  backgroundColor = "rgba(52, 52, 52, 0.1)",
}) {
  switch (cause) {
    case "Environment Protection":
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="earth" color="green" size={size * 0.5} />
        </View>
      );
    case "Criminal Justice Reform":
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="balance-scale" color="black" size={size * 0.5} />
        </View>
      );
    case "vote":
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="vote" color="blue" size={size * 0.5} />
        </View>
      );
    case "labor":
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="worker"
            color="blue"
            size={size * 0.5}
          />
        </View>
      );
    case "peace":
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="peace" color="blue" size={size * 0.5} />
        </View>
      );
    case "default":
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="exclamationcircle" color="black" size={size * 0.5} />
        </View>
      );
  }
}

export default CauseIcon;
