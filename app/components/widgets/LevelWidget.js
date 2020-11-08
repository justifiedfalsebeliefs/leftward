import React from "react";
import { StyleSheet, View, Text } from "react-native";
import routes from "../../navigation/routes";
import ListItem from "../lists/ListItem"
import Icon from "../Icon"
import colors from "../../config/colors"

function LevelWidget({
    userExperience,
    navigation
}) {
if(typeof userExperience !== 'undefined'){
    const progress = ((userExperience.exp-userExperience.previousLevel)/(userExperience.nextLevel-userExperience.previousLevel)) * 100
  return (
      <View>
  <View style={styles.levelContainer}>
      <Text style={styles.levelText}>{`Level ${userExperience.level}`}</Text>
      <View style={{backgroundColor:"#311847",
                    width:`${progress}%`,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15}}></View>
        <View style={ {
        backgroundColor: "#A676D0",
        width: `${80-progress}%`,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
      }}></View>
  </View>
  <Text style={styles.expBreakdownText}>{`Total points: ${userExperience.exp}`}    {`Next level: ${userExperience.nextLevel}`}</Text>
  </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.levelText}>{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
    levelContainer: {
        flexDirection: "row",
        overflow: "hidden",
      },
      levelText: { padding: 5,},
      expBreakdownText:{paddingBottom: 15},
      separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.light,
      },
});

export default LevelWidget;
