import React from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { Layout } from "@ui-kitten/components";

function WidgetContainer({ children, style }) {
  return (
    <Layout level={"1"} style={[styles.widgetContainer, style]}>
      {children}
    </Layout>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    borderRadius: 30,
    padding: 12,
  },
});

export default observer(WidgetContainer);
