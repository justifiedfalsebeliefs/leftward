import React, { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Layout, Text } from "@ui-kitten/components";
import ActionListVertical from "../widgets/actions/ActionListVertical";
import SectionTitle from "../widgets/SectionTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CompletedActionsStack({ navigation, style }) {
  const things = useContext(RootStoreContext);
  const actionsByCause = JSON.parse(things.userStatistics.actionsByCause);
  return (
    <Layout level="4" style={style}>
      <SectionTitle>Completed Actions</SectionTitle>
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 40,
        }}
      >
        <Text category="h5" style={{ marginRight: 20, fontWeight: "bold" }}>
          Total Actions
        </Text>
        <MaterialCommunityIcons
          name="summit"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text category="h3">
          {things.userStatistics.totalActionsCompletedCount}
        </Text>
      </Layout>
      <Layout
        level="2"
        style={{
          width: "80%",
          height: 1,
          alignSelf: "center",
        }}
      ></Layout>
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 40,
        }}
      >
        <Text category="h5" style={{ marginRight: 20 }}>
          Environmental Justice
        </Text>
        <MaterialCommunityIcons
          name="summit"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text category="h3">
          {actionsByCause["Environmental Justice"].count}
        </Text>
      </Layout>
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 40,
        }}
      >
        <Text category="h5" style={{ marginRight: 20 }}>
          Criminal Justice Reform
        </Text>
        <MaterialCommunityIcons
          name="summit"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text category="h3">{actionsByCause["Legal Justice"].count}</Text>
      </Layout>
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 40,
        }}
      >
        <Text category="h5" style={{ marginRight: 20 }}>
          LGBTQ+ Justice
        </Text>
        <MaterialCommunityIcons
          name="summit"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text category="h3">
          {actionsByCause["Gender and LGBTQ+ Justice"].count}
        </Text>
      </Layout>
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 40,
        }}
      >
        <Text category="h5" style={{ marginRight: 20 }}>
          Racial Justice
        </Text>
        <MaterialCommunityIcons
          name="summit"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text category="h3">{actionsByCause["Racial Justice"].count}</Text>
      </Layout>
      <Layout
        level="4"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 40,
        }}
      >
        <Text category="h5" style={{ marginRight: 20 }}>
          Economic Justice
        </Text>
        <MaterialCommunityIcons
          name="summit"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text category="h3">{actionsByCause["Economic Justice"].count}</Text>
      </Layout>
      <ActionListVertical
        itemList={things.listingsCompleted}
        navigation={navigation}
      />
    </Layout>
  );
}

export default observer(CompletedActionsStack);
