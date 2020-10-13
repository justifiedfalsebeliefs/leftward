import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import routes from "../navigation/routes";

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  return (
    <View>
      {/* <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>Points{listing.points}</Text>
        <Text style={styles.title}>{listing.title}</Text>

        <Text style={styles.description}>{listing.description}</Text>
        <Text
          style={styles.org}
          onPress={() =>
            navigation.navigate(routes.CAMPAIGN_DETAILS, listing.partofCampaign)
          }
        >
          Campaign: {listing.partofCampaign.title}
        </Text>
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

export default ListingDetailsScreen;
