import React from "react";
import { Text } from "@ui-kitten/components";

function SectionTitle({ children }) {
  return (
    <Text
      category="h1"
      style={{
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
      }}
    >
      {children}
    </Text>
  );
}

export default SectionTitle;
