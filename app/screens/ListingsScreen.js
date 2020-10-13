import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "../components/Text";
import ActionCard from "../components/ActionCard";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { API, graphqlOperation } from "aws-amplify";
import { listActions } from "../../graphql/queries";
import { BarChart, Grid } from "react-native-svg-charts";
import routes from "../navigation/routes";

const fill = "rgb(134, 65, 244)";
const bardata = [50, 10, 40, 95, 50];

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState();
  const nowEpoch = Math.round(Date.now() / 1000);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const result = await API.graphql(
        graphqlOperation(listActions, {
          filter: {
            expireDate: { gt: nowEpoch },
            liveDate: { le: nowEpoch },
          },
        })
      );
      setListings(result.data.listActions.items);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Screen style={styles.screen}>
        <Text>{"Dashboard"}</Text>
        <View style={styles.levelcontainer}>
          <Text style={styles.levelText}>{"Level 4"}</Text>
          <View style={styles.levelbarexp}></View>
          <View style={styles.levelbarremain}></View>
        </View>

        <FlatList
          style={styles.list}
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ActionCard
              title={item.title}
              opportunityType={item.opportunityType}
              organization={item.organization}
              cause={item.cause}
              reward={item.reward}
              description={item.description}
              //imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              //thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
        <BarChart
          style={{ height: 200 }}
          data={bardata}
          svg={{ fill }}
          contentInset={{ top: 30, bottom: 30 }}
        >
          <Grid />
        </BarChart>
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

export default ListingsScreen;
