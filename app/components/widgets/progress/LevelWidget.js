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
  const progression = things.progression;
  const progress =
    ((progression.pointsEarnedTotal - progression.currentLevelPointsRequired) /
      (progression.nextLevelPointsRequired -
        progression.currentLevelPointsRequired)) *
    100;
  return (
    <WidgetContainer style={style}>
      <Layout style={{ flexDirection: "row", padding: 3, height: 225 }}>
        <Layout style={{ flex: 1 }}>
          {leftWidget == "RecentActions" && (
            <RecentActionsSubWidget progression={progression} />
          )}
          {leftWidget == "ActionBadgesSummary" && (
            <ActionBadgesSummarySubWidget progression={progression} />
          )}
        </Layout>
        <ProgressSubWidget
          level={progression.levelNumber}
          progress={progress}
          pointsEarnedTotal={progression.pointsEarnedTotal}
          nextLevelPointsRequired={progression.nextLevelPointsRequired}
        />
      </Layout>
    </WidgetContainer>
  );
}

export default observer(LevelWidget);
