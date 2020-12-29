import React, { useContext } from "react";
import { RootStoreContext } from "../../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout } from "@ui-kitten/components";
import ActionList from "./ActionList";
import SectionTitle from "../SectionTitle";

function DashboardActionsWidget({ navigation, style }) {
  const things = useContext(RootStoreContext);
  return (
    <Layout level="4" style={style}>
      <SectionTitle>For You</SectionTitle>
      <ActionList itemList={things.curated} navigation={navigation} />
    </Layout>
  );
}

export default observer(DashboardActionsWidget);
