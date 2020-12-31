import React from "react";
import { observer } from "mobx-react-lite";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function ProgressSubWidget({
  level,
  progress,
  pointsEarnedTotal,
  nextLevelPointsRequired,
  style,
}) {
  const theme = useTheme();
  return (
    <Layout style={[{ flex: 1, alignItems: "center" }, style]}>
      <AnimatedCircularProgress
        style={{ paddingBottom: 22, marginTop: 6 }}
        size={150}
        width={2}
        rotation={0}
        fill={progress}
        lineCap={"butt"}
        tintColor={theme["color-basic-1100"]}
        backgroundColor={theme["color-basic-500"]}
      >
        {(fill) => (
          <>
            <Text category="h6">Level</Text>
            <Text category="h2" style={{ fontWeight: "bold" }}>
              {level}
            </Text>
          </>
        )}
      </AnimatedCircularProgress>
      <Text style={{ textAlign: "center", fontWeight: "bold" }} category="s2">
        Total points: {pointsEarnedTotal}
        {"\n"}
        Next level: {nextLevelPointsRequired}
      </Text>
    </Layout>
  );
}

export default observer(ProgressSubWidget);
