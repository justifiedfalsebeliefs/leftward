import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "../components/Text";
import ActionCard from "../components/ActionCard";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { API, graphqlOperation } from "aws-amplify";
import { listActions } from "../../graphql/queries";
import { BarChart, Grid } from "react-native-svg-charts";

const fill = "rgb(134, 65, 244)";
const bardata = [50, 10, 40, 95, 50];

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState();

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const result = await API.graphql(graphqlOperation(listActions));
      setListings(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  //console.log(listings.data.listActions.items);
  const tmplistings = [
    {
      id: 1,
      organization: "Action Network",
      opportunityType: "Phone Bank",
      cause: "vote",
      reward: "100 Points",
      title: "Wisconsin get out the vote",
      description: "longform description here",
    },
    {
      id: 4,
      organization: "Climate Saviors",
      opportunityType: "Protest",
      cause: "environment",
      reward: "1000 Points",
      title: "March for the Earth",
      description: "longform description here",
    },
    {
      id: 3,
      organization: "Judicial Reform Group",
      opportunityType: "Phone Bank",
      cause: "justice",
      reward: "10 Points",
      title: "Call to stop death penalty bill",
      description: "longform description here",
    },
    {
      id: 2,
      organization: "Judicial Reform Group",
      opportunityType: "Phone Bank",
      cause: "justice",
      reward: "10 Points",
      title: "Call to stop death penalty bill",
      description: "longform description here",
    },
    {
      id: 5,
      organization: "Judicial Reform Group",
      opportunityType: "Phone Bank",
      cause: "justice",
      reward: "10 Points",
      title: "Call to stop death penalty bill",
      description: "longform description here",
    },
    {
      id: 6,
      organization: "Climate Saviors",
      opportunityType: "Protest",
      cause: "environment",
      reward: "1000 Points",
      title: "March for the Earth",
      description: "longform description here",
    },
  ];
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
          data={tmplistings}
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
              //onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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
