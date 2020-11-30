import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "rgba(52, 52, 52, 0.0)",
  iconColor = "black",
  alignItems = "center"
}) { 
  switch (name){
    case 'Environmental Justice':
      var iconName = "leaf"
    break;
    case 'Legal Justice':
      var iconName = 'scale-balance'
    break;
    case 'Economic Justice':
      var iconName = 'tools'
    break;
    case 'Racial Justice':
      var iconName = 'equalizer-outline'
    break;
    case 'Gender and LGBTQ+ Justice':
      var iconName = 'flag-plus'
    break;
    default:
      var iconName = name
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: alignItems,
      }}
    >
      <MaterialCommunityIcons name={iconName} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
