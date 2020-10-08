import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { listActions } from "../../graphql/queries";
import colors from "../config/colors";

async function getActions() {
  try {
    const result = await API.graphql(graphqlOperation(listActions));
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

function TestingScreen() {
  getActions();
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default TestingScreen;
