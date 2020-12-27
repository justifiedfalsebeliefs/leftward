import React, { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout } from "@ui-kitten/components";
import SectionLinkSmall from "../widgets/SectionLinkSmall";
import SectionLink from "../widgets/SectionLink";
import SectionTitle from "../widgets/SectionTitle";
import routes from "../../navigation/routes";

function ActionsByTypeStack({ navigation, style }) {
  const things = useContext(RootStoreContext);
  async function handleSectionButtonPress(title) {
    navigation.navigate(routes.ACTIONLISTING, title);
  }
  return (
    <Layout level="4" style={style}>
      <SectionTitle>More ways to get involved</SectionTitle>
      <SectionLink
        title="Engagements"
        buttonTitle="Get deeply involved"
        onPress={() => handleSectionButtonPress("Engagements")}
      />
      <Layout level="4" style={style} />
      <SectionLinkSmall
        title="Browse all actions"
        buttonTitle="See all actions"
        onPress={() => handleSectionButtonPress("All actions")}
      />
    </Layout>
  );
}

export default observer(ActionsByTypeStack);
