import React from "react";
import { StyleSheet, View, Text } from "react-native";


function LevelWidget({
    userExperience
}) {
if(typeof userExperience !== 'undefined'){
    const progress = ((userExperience.exp-userExperience.previousLevel)/(userExperience.nextLevel-userExperience.previousLevel)) * 100
  return (
      <View>
  <View style={styles.levelContainer}>
      <Text style={styles.levelText}>{`Level ${userExperience.level}`}</Text>
      <View style={{backgroundColor:"blue",
                    width:`${progress}%`}}></View>
        <View style={styles.levelbarRemain}></View>
  </View>
  <Text style={styles.levelText}>{`Total Actions Completed: ${userExperience.totalActions}`}</Text>
  </View>
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.levelText}>{`Could not get user level`}</Text>
</View>)

}

const styles = StyleSheet.create({
    levelContainer: {
        flexDirection: "row",
        padding: 20,
        overflow: "hidden",
      },
      levelText: { paddingHorizontal: 10 },

      levelbarRemain: {
        backgroundColor: "lightblue",
        width: "100%",
      },
});

export default LevelWidget;
