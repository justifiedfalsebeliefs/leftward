import React, { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout, Text } from "@ui-kitten/components";
import ActionListVertical from "../widgets/actions/ActionListVertical";
import SectionTitle from "../widgets/SectionTitle";

function SavedSactionsStack({ navigation, style }) {
  const things = useContext(RootStoreContext);
  if (
    things.listingsInProgress === undefined ||
    things.listingsInProgress.length == 0
  ) {
    return <></>;
  } else {
    return (
      <Layout level="4" style={style}>
        <SectionTitle>Saved Actions</SectionTitle>
        <ActionListVertical
          itemList={things.listingsInProgress}
          navigation={navigation}
        />
      </Layout>
    );
  }
}

export default observer(SavedSactionsStack);
