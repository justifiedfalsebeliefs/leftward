import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "../components/Text";
import routes from "../navigation/routes";

function CampaignDetailsScreen({ route, navigation }) {
  const campaign = route.params;
  return (
    <View>
      {/* <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Campaign Details Screen</Text>
        <Text style={styles.title}>{campaign.title}</Text>

        <Text style={styles.description}>{campaign.description}</Text>
        <Text
          style={styles.org}
          onPress={() =>
            navigation.navigate(
              routes.ORGANIZATION_DETAILS,
              campaign.organization
            )
          }
        
        >
          Organization: {campaign.organization.title}
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
    flexWrap: "wrap"
  },
  description: {
    fontSize: 12,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default CampaignDetailsScreen;
