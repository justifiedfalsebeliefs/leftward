import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import CampaignDetailsScreen from "../screens/CampaignDetailsScreen";
import OrganizationDetailsScreen from "../screens/OrganizationDetailsScreen";

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="CampaignDetails" component={CampaignDetailsScreen} />
    <Stack.Screen
      name="OrganizationDetails"
      component={OrganizationDetailsScreen}
    />
  </Stack.Navigator>
);

export default DashboardNavigator;
