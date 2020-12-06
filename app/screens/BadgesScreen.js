import React from "react";
import telemetry from "../analytics/telemetry"
import { View } from "react-native";
import Screen from "../components/Screen";
import BadgesWidget from "../components/widgets/BadgesWidget";
import CauseActionBreakdownWidget from "../components/widgets/CauseActionBreakdownWidget";

function StatisticsScreen({ navigation }) {
  telemetry(eventTitle='viewBadges')

  return (
      <Screen>
        <BadgesWidget badgesData={[]}></BadgesWidget>
        <View style={{height:20}}></View>
        {/* <CauseActionBreakdownWidget userExperience={userExperience} navigation={navigation}/> */}
      </Screen>
  );
}

export default StatisticsScreen;
