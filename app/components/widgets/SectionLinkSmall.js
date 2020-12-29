import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import WidgetContainer from "./WidgetContainer";
import AppIcon from "../AppIcon";

function SectionLink({ image, title, buttonTitle, onPress }) {
  return (
    <WidgetContainer>
      <Layout style={{ alignItems: "center", height: 160, flex: 1 }}>
        <Layout
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
            borderRadius: 45,
            padding: 15,
          }}
        >
          <Text
            category="h3"
            style={{
              width: "75%",
              textAlign: "left",
              marginVertical: 20,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
          <AppIcon name="no-image" size="small" />
        </Layout>
        <Button onPress={() => onPress()}>{buttonTitle}</Button>
      </Layout>
    </WidgetContainer>
  );
}

export default SectionLink;
