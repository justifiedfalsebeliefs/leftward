import React from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { Layout } from "@ui-kitten/components";

function BadgeContainer({ children }) {
  return (
    <Layout level={"1"} style={styles.BadgeContainer}>
      {children}
    </Layout>
  );
}

const styles = StyleSheet.create({
  BadgeContainer: {
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    padding: 12,
  },
});

export default observer(BadgeContainer);
