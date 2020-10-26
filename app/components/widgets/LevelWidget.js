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
      <View style={{backgroundColor:"blue",
                    width:`${progress}%`}}></View>
        <View style={styles.levelbarRemain}></View>
  </View>
  <Text style={styles.levelText}>{`Total points: ${userExperience.exp}`}</Text>
  <Text style={styles.levelText}>{`Next level: ${userExperience.nextLevel}`}</Text>
  <ListItem
              title={`Actions Completed: ${userExperience.totalActions}`}
              IconComponent={
                <Icon
                  name={"playlist-check"}
                  backgroundColor={"green"}
                />
              }
              onPress={() => navigation.navigate(routes.COMPLETEDACTIONS)}
            />
            <View style={styles.separator} />
  </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.levelText}>{`Loading`}</Text>
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
      separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.light,
      },
});

export default LevelWidget;
