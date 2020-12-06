import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../config/colors"
import fonts from "../../config/fonts"
import { AnimatedCircularProgress } from 'react-native-circular-progress';

function LevelWidget({
  userStatistics
}) {
if(typeof userStatistics !== 'undefined'){
    const progress = ((userStatistics.pointsEarnedTotal-userStatistics.currentLevelPointsRequired)/(userStatistics.nextLevelPointsRequired-userStatistics.currentLevelPointsRequired)) * 100
    return (
      <View style={styles.widgetContainer}>
        <View style={styles.columnContainer}>
          <View style={styles.titleRowContainer}>
            <Text style={styles.widgetTitleText}> {'Personal Progress'}</Text>
            <View style={styles.recentActionsContainer}>
              <Text style={styles.recentActionsTitleText}> {'Recent Actions'}</Text>
              <Text style={styles.recentActionsText}> {'Signed Petition'}</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
          <AnimatedCircularProgress
            size={100}
            width={13}
            fill={progress}
            lineCap={"butt"}
            tintColor= {colors.primary}
            backgroundColor= {'#A676D0'} />
          <Text style={styles.pointsCurrent}>{`Total points: ${userStatistics.pointsEarnedTotal}`}</Text>
          <Text style={styles.pointsNext}>{`Next level: ${userStatistics.nextLevelPointsRequired}`}</Text>
          </View>
        </View>
      </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.loadingText}>{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: colors.componentBackground,
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6.68,
    elevation: 4,
  },
  columnContainer: {
    flexDirection: "row"
  },
  titleRowContainer:{
    width: "50%"
  },

  widgetTitleText:{
    fontFamily: fonts.componentTitle,
    fontSize: 23
  },
  recentActionsContainer:{
    flex: 1,
    justifyContent: "flex-end"
  },
  recentActionsTitleText:{
  },
  recentActionsText: {

  },
  progressBarContainer:{
    width: "50%"

  },
  pointsCurrent:{

  },
  pointsNext:{

  },



  loadingText: {},
});

export default LevelWidget;
