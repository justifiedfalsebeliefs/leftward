import React from "react";
import { observer } from "mobx-react-lite";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function ActionBadgesSummarySubWidget({ progression }) {
  return (
    <>
      <Text category="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
        Actions
      </Text>
      <Text
        category="h2"
        style={{ fontWeight: "bold", marginBottom: 15, textAlign: "center" }}
      >
        {progression.totalActionsCompletedCount}
      </Text>
      <Layout
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 6,
          paddingHorizontal: 6,
        }}
      >
        <Text category="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
          Badges
        </Text>
        <Text
          category="h2"
          style={{ fontWeight: "bold", marginBottom: 15, textAlign: "center" }}
        >
          Badge#
        </Text>
      </Layout>
    </>
  );
}

export default observer(ActionBadgesSummarySubWidget);
