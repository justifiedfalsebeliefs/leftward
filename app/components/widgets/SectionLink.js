import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import WidgetContainer from "./WidgetContainer";
import AppIcon from "../AppIcon";

function SectionLink({ image, title, buttonTitle, onPress }) {
  return (
    <WidgetContainer>
      <Layout style={{ alignItems: "center", height: 295 }}>
        <AppIcon name="no-image" size="small-medium" />
        <Text
          category="h1"
          style={{
            textAlign: "center",
            marginVertical: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <Button onPress={() => onPress()}>{buttonTitle}</Button>
      </Layout>
    </WidgetContainer>
  );
}

export default SectionLink;
