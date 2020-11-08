import React from "react";
import { StyleSheet, View, Text } from "react-native";
import routes from "../../navigation/routes";
import ListItem from "../lists/ListItem"
import Icon from "../Icon"
import colors from "../../config/colors"
import {  TouchableOpacity } from "react-native-gesture-handler";

function CauseActionBreakdownWidget({
    userExperience,
    navigation
}) {
if(typeof userExperience !== 'undefined'){
    const progress = ((userExperience.exp-userExperience.previousLevel)/(userExperience.nextLevel-userExperience.previousLevel)) * 100
  return (
      <View style={styles.background}>
          
              <TouchableOpacity onPress={() => navigation.navigate(routes.COMPLETEDACTIONS)}>
                  <>
              <View style={styles.allActionsContainer}>
              <Icon
                  name={"trophy-variant"}
                  backgroundColor={"#F7B32B"}/>
          <Icon
                  name={"playlist-check"}
                  backgroundColor={"#605B56"}/>

          <Text style={styles.titleText}>{`Actions Completed: ${userExperience.totalActions}`}</Text>
          </View>
          
            <View style={styles.separator} />
            <View style={styles.actionBreakdownContainer}>
              <View style={styles.actionBreakdown}>
                <Text style={styles.causeTitle}>Environment {"\n"} Protection</Text>
                <Text>{userExperience.EnvActions}</Text>
              </View>
              <View style={styles.actionBreakdown}>
              <Text style={styles.causeTitle}>Economic {"\n"} Justice</Text>
                <Text>{userExperience.EcoActions}</Text>
              </View>
              <View style={styles.actionBreakdown}>
              <Text style={styles.causeTitle}>Criminal Justice {"\n"} Reform</Text>
                <Text>{userExperience.JustActions}</Text>
              </View>
            </View>
            </>
            </TouchableOpacity>
  </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text style={styles.levelText}>{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
    background:{ backgroundColor:"white", borderRadius:15, padding:3, marginBottom: 15},
  actionBreakdownContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 7
  },
  actionBreakdown:{
    alignItems: "center"
  },
  causeTitle:{
    fontWeight: "bold",
    textAlign: "center"
  },
  allActionsContainer:{
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingTop: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText:{
      fontSize: 18,
      paddingHorizontal: 20
  }
});

export default CauseActionBreakdownWidget;
