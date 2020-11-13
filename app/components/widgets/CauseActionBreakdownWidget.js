import React from "react";
import { StyleSheet, View, Text } from "react-native";
import routes from "../../navigation/routes";
import ListItem from "../lists/ListItem"
import Icon from "../Icon"
import colors from "../../config/colors"
import fonts from "../../config/fonts"
import {  TouchableOpacity } from "react-native-gesture-handler";

function CauseActionBreakdownWidget({
    userExperience,
    navigation
}) {
if(typeof userExperience !== 'undefined'){
    const progress = ((userExperience.exp-userExperience.previousLevel)/(userExperience.nextLevel-userExperience.previousLevel)) * 100
  return (
    <View style={styles.widgetContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(routes.MYACTIONS)}>
        <View style={styles.actionBreakdownContainer}>
          <View style={styles.actionBreakdown}>
            <Text style={styles.actionCount}>{userExperience.EnvActions}</Text>
            <Text style={styles.causeTitle}>Environment {"\n"} Protection</Text>
          </View>
          <View style={styles.actionBreakdown}>
            <Text style={styles.actionCount}>{userExperience.EcoActions}</Text>
            <Text style={styles.causeTitle}>Economic {"\n"} Justice</Text>
          </View>
          <View style={styles.actionBreakdown}>
            <Text style={styles.actionCount}>{userExperience.JustActions}</Text>
            <Text style={styles.causeTitle}>Criminal{"\n"}Justice Reform</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.levelText}>{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
  widgetContainer:{ backgroundColor:"white", borderRadius:15, paddingVertical:10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.26,
  shadowRadius: 6.68,
  elevation: 4,},

  actionBreakdownContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 7
  },
  actionCount:{
    fontSize: 22,
    fontFamily: fonts.subTitle,
    color: colors.primary
  },
  actionBreakdown:{
    alignItems: "center"
  },
  causeTitle:{
    textAlign: "center",
    fontFamily: fonts.subTitle
  },
});

export default CauseActionBreakdownWidget;
