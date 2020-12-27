import React, { useContext } from "react";
import { RootStoreContext } from "../../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout } from "@ui-kitten/components";
import WidgetContainer from "../WidgetContainer";
import ProgressSubWidget from "./ProgressSubWidget";
import RecentActionsSubWidget from "./RecentActionsSubWidget";
import ActionBadgesSummarySubWidget from "./ActionBadgesSummarySubWidget";

function LevelWidget({ leftWidget, style }) {
  const things = useContext(RootStoreContext);
  const userStatistics = things.userStatistics;
  const progress =
    ((userStatistics.pointsEarnedTotal -
      userStatistics.currentLevelPointsRequired) /
      (userStatistics.nextLevelPointsRequired -
        userStatistics.currentLevelPointsRequired)) *
    100;
  return (
    <WidgetContainer style={style}>
      <Layout style={{ flexDirection: "row", padding: 3, height: 225 }}>
        <Layout style={{ flex: 1 }}>
          {leftWidget == "RecentActions" && (
            <RecentActionsSubWidget userStatistics={userStatistics} />
          )}
          {leftWidget == "ActionBadgesSummary" && (
            <ActionBadgesSummarySubWidget userStatistics={userStatistics} />
          )}
        </Layout>
        <ProgressSubWidget
          level={userStatistics.levelNumber}
          progress={progress}
          pointsEarnedTotal={userStatistics.pointsEarnedTotal}
          nextLevelPointsRequired={userStatistics.nextLevelPointsRequired}
        />
      </Layout>
    </WidgetContainer>
  );
}

export default observer(LevelWidget);
