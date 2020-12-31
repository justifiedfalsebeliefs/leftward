import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AccountNavigator from "./AccountNavigator";
import DashboardNavigator from "./DashboardNavigator";
import StatisticsNavigator from "./StatisticsNavigator";
import routes from "./routes";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

const { Navigator, Screen } = createBottomTabNavigator();
const DashboardIcon = (props) => <Icon {...props} name="home" />;
const StatisticsIcon = (props) => <Icon {...props} name="person" />;
const AccountIcon = (props) => <Icon {...props} name="settings-outline" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={DashboardIcon} />
    <BottomNavigationTab icon={StatisticsIcon} />
    <BottomNavigationTab icon={AccountIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Dashboard" component={DashboardNavigator} />
    <Screen name="Statistics" component={StatisticsNavigator} />
    <Screen name="Account" component={AccountNavigator} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer
    independent={true}
    // theme={{ colors: { background: "#000" } }}
  >
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
