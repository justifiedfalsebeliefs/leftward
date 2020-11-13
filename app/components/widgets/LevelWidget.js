import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../config/colors"
import fonts from "../../config/fonts"

function LevelWidget({
    userExperience
}) {
if(typeof userExperience !== 'undefined'){
    const progress = ((userExperience.exp-userExperience.previousLevel)/(userExperience.nextLevel-userExperience.previousLevel)) * 100
    return (
      <View style={styles.widgetContainer}>
        <Text style={styles.levelText}>{`Level ${userExperience.level}`}</Text>
        <View style={styles.levelBarBackground}>
          <View style={{
            backgroundColor: colors.levelBarFill,
            borderRadius: 12,
            flex: 1,
            width: `${progress}%`,
            }}>
          </View>
            <Text style={styles.expCurrent}>{`${userExperience.exp} pts`}</Text>
            <Text style={styles.expGoal}>{`${userExperience.nextLevel}`}</Text>
        </View>
    </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.loadingText}>{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
  widgetContainer: {marginHorizontal: 10},
  levelText: {
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 4,
    fontFamily: fonts.subTitle
  },
  levelBarBackground: {
    backgroundColor: colors.levelBarBackground,
    height: 30,
    borderRadius: 12,
  },
  expCurrent: {
    color: colors.contrastTextDarkBG,
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    top: 6,
    left: 20,
    fontFamily: fonts.type
  },
  expGoal: {
    color: colors.contrastTextDarkBG,
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    top: 6,
    right: 20,
    fontFamily: fonts.type
  },
  levelBarFill: {
    backgroundColor: colors.levelBarFill,
    borderRadius: 15,
    flex: 1,
    width: "50%"
  },
  loadingText: {},
});

export default LevelWidget;
