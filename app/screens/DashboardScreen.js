import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "../components/Text";
import ActionCard from "../components/ActionCard";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import initialActions from "../values/initialActions"

function DashboardScreen({ navigation }) {
  const [actions, setActions] = useState();
  //const nowEpoch = Math.round(Date.now() / 1000);
  const { user, logOut } = useAuth();
  useEffect(() => {
    fetchActions();
  }, []);

  async function fetchActions() {
    try {
      setActions(initialActions);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDebugPrint() {
    console.log(user)
  }
  

  return (
    <>
      <Screen style={styles.screen}>
        <Text>{"Dashboard"}</Text>
        <AppButton
          title={"debug printer"}
          onPress={handleDebugPrint}
        ></AppButton>
        <FlatList
          style={styles.list}
          data={actions}
          keyExtractor={(item) => item.actionId.toString()}
          renderItem={({ item }) => (
            <ActionCard
              title={item.actionTitle}
              description={item.actionDescription}
              //imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.ACTION_DETAILS, item)}
              cause={item.causeTitle}
              reward={item.reward}
              actionType={item.actionType}
              organization={item.organizationTitle}
              //thumbnailUrl
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  list: {
    height: 50,
  },
  levelcontainer: {
    flexDirection: "row",
    padding: 20,
    overflow: "hidden",
  },
  levelText: { paddingHorizontal: 10 },
  levelbarexp: {
    backgroundColor: "blue",
    width: "30%",
  },
  levelbarremain: {
    backgroundColor: "lightblue",
    width: "70%",
  },
});

export default DashboardScreen;
