import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/Text";
import * as Amplitude from 'expo-analytics-amplitude';


function OrganizationDetailsScreen({ route, navigation }) {
  const organization = route.params;
  Amplitude.logEvent('ViewOrganizationDetails')
  return (
    <View>
      {/* <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Organization Details Screen</Text>
        <Text style={styles.org}>{organization.title}</Text>

        <Text style={styles.description}>{organization.description}</Text>
        <Text style={styles.description}>{organization.contact}</Text>
        <View style={styles.userContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "500",
  },
  org: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default OrganizationDetailsScreen;
