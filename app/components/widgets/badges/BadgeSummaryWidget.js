import React, { useContext } from "react";
import { RootStoreContext } from "../../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout } from "@ui-kitten/components";
import BadgeList from "./BadgeList";
import SectionTitle from "../SectionTitle";

function CompletedActionsWidget({ navigation, style }) {
  const things = useContext(RootStoreContext);
  const dummyBadges = [
    {
      badgeId: 1,
      title: "Mega Crusher",
      description: "Awarded to the coolest people",
    },
    {
      badgeId: 2,
      title: "Another Badge",
      description: "You are the best in the whole world",
    },
    {
      badgeId: 3,
      title: "Big Winner",
      description: "u won nice jorb get at it some more ",
    },
  ];
  return (
    <Layout level="4" style={style}>
      <SectionTitle>My Badges</SectionTitle>
      <BadgeList itemList={dummyBadges} navigation={navigation} />
    </Layout>
  );
}

export default observer(CompletedActionsWidget);
