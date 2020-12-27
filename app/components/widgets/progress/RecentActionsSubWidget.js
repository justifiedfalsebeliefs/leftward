import React from "react";
import { observer } from "mobx-react-lite";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function RecentActionsSubWidget({ userStatistics }) {
  const theme = useTheme();
  return (
    <>
      <Text category="h2" style={{ fontWeight: "bold", marginBottom: 15 }}>
        Personal progress
      </Text>
      <Layout
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 6,
          paddingHorizontal: 6,
        }}
      >
        <Text category="s1" style={{ fontWeight: "bold" }}>
          {"Recent Actions"}
        </Text>
        <Text category="c2" style={{ color: theme["color-basic-600"] }}>
          - Signed petition
        </Text>
        <Text category="c2" style={{ color: theme["color-basic-600"] }}>
          - Attended rally
        </Text>
        <Text category="c2" style={{ color: theme["color-basic-600"] }}>
          - Signed petition
        </Text>
        <Text category="c2" style={{ color: theme["color-basic-600"] }}>
          - Phone banked
        </Text>
      </Layout>
    </>
  );
}

export default observer(RecentActionsSubWidget);
