import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActionDetailsScreen from "../screens/ActionDetailsScreen";
import CampaignDetailsScreen from "../screens/CampaignDetailsScreen";
import OrganizationDetailsScreen from "../screens/OrganizationDetailsScreen";
import MyActionsScreen from "../screens/MyActionsScreen";

const Stack = createStackNavigator();

const MyActionsNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyActions" component={MyActionsScreen} />
    <Stack.Screen name="ActionDetails" component={ActionDetailsScreen} />
    <Stack.Screen name="CampaignDetails" component={CampaignDetailsScreen} />
    <Stack.Screen
      name="OrganizationDetails"
      component={OrganizationDetailsScreen}
    />
  </Stack.Navigator>
);

export default MyActionsNavigator;
