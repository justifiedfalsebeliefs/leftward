import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Size categories to change it all here in one spot.
// Name/Size/Color-primary? contrast?
function AppIcon({ name, size }) {
  var renderSize = 0;
  switch (size) {
    case "quick-hit":
      renderSize = 30;
      break;
    case "miniscule":
      renderSize = 28;
      break;
    case "tiny":
      renderSize = 75;
      break;
    case "small":
      renderSize = 100;
      break;
    case "small-medium":
      renderSize = 150;
      break;
  }

  switch (name) {
    case "no-image":
      return (
        <MaterialCommunityIcons
          name="image-size-select-large"
          size={renderSize}
          color="black"
        />
      );
    case "star":
      return (
        <MaterialCommunityIcons name="star" size={renderSize} color="black" />
      );
    case "star-outline":
      return (
        <MaterialCommunityIcons
          name="star-outline"
          size={renderSize}
          color="black"
        />
      );
    case "people":
      return <Ionicons name="md-people" size={renderSize} color="black" />;
  }
}

export default AppIcon;
