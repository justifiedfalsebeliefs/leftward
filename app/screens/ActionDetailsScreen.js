import React from "react";
import { View, StyleSheet, Alert, Linking, ScrollView  } from "react-native";
import eventHub from "../events/eventHub"
import routes from "../navigation/routes";
import colors from "../config/colors";
import fonts from "../config/fonts"
import Text from "../components/Text";
import Screen from "../components/Screen"
import CauseIcon from "../components/CauseIcon"
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ActionDetailsScreen({ route, navigation }) {
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewActionDetails')

  const action = route.params;
  const campaign = {
    title: action.campaignTitle,
    description: action.campaignDescription,
    organization: {
      contact: action.organizationContact,
      title: action.organizationTitle,
      description: action.organizationDescription,
    }};
    
    function loadInBrowser() {
      eventHub.emitEvent(eventType='userEvent', eventTitle='pressOpenActionURL', props={actionId: action.actionId, actionTitle: action.actionTitle})
      Linking.openURL(action.url).catch(err => console.error("Couldn't load page", err));
    };
    
  const handleStatusPress = async (status, actionId) => {
      eventHub.emitEvent(eventType='userEvent', eventTitle='pressActionStatusUpdate', props={status: status, actionId: actionId})
      navigation.goBack()
  };

  return (
    <Screen title={"Details"} back={true} navigation={navigation}>
      <ScrollView  style={styles.textContainer}>
        <Text style={styles.actionTitle}>{action.actionTitle}</Text>
        <Text style={styles.descriptionText}>{action.actionDescription}</Text>
      </ScrollView >
      <View style={{height:20}}></View>
      <TouchableWithoutFeedback style={styles.detailsContainer} onPress={() => navigation.navigate(routes.ORGANIZATION_DETAILS, campaign.organization)}>
        <View style={styles.navDivider}>
          <View style={{width:"80%", justifyContent: "space-around"}}>
            <View style={styles.titleBar}>
                <CauseIcon style={styles.icon} cause={action.causeTitle} size={35}></CauseIcon>
                <Text style={styles.actionTypeText}>{action.actionType}</Text>
                <Text style={styles.rewardText}>{`${action.reward} pts`}</Text>
            </View>
            <Text style={styles.orgTitle}>{campaign.organization.title}</Text>
          </View>
          <Icon name="chevron-right" size={80}></Icon>
        </View>
      </TouchableWithoutFeedback>
      <View style={{height:20}}></View>
      <View style={styles.titleBar}>
      </View>

      <TouchableOpacity style={styles.openActionButton} onPress={() => loadInBrowser()}>
        <MaterialCommunityIcons name={"link"} color={"black"} size={30} />
        <Text style={styles.buttonText}>    Complete in Browser</Text>
      </TouchableOpacity>
      <View style={{height:20}}></View>
      <View style={styles.actionButtonContainer}>
      { action.sourceList != "myActions" && (
      <TouchableOpacity style={styles.actionButton} onPress={() => handleStatusPress("INPROGRESS", action.actionId)}>
        <MaterialCommunityIcons name={"plus"} color={"black"} size={30} style={{paddingRight:15}}/>
        <Text style={styles.buttonText}>Add to My Actions</Text>
      </TouchableOpacity> )}
      { action.sourceList != "complete" && (
      <TouchableOpacity style={styles.actionButton} onPress={() => handleStatusPress("COMPLETE", action.actionId)}>
        <MaterialCommunityIcons name={"check-bold"} color={"black"} size={30} style={{paddingRight:15}} />
        <Text style={styles.buttonText}>Mark action completed</Text>
      </TouchableOpacity> )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor:"white",
    borderRadius:15,
    paddingHorizontal:15,
    shadowColor: "#000",
    height: 300,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.26,
  shadowRadius: 6.68,
  elevation: 4,
  },
  actionTitle:{
    fontFamily: fonts.componentTitle,
    fontWeight: "bold",
    paddingVertical: 15,
    fontSize: 22,
    lineHeight: 30
  },
  descriptionText:{
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 15
  },
  detailsContainer:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius:15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6.68,
    elevation: 4,
    backgroundColor: "white",
  },
  navDivider:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleBar:{
    flexDirection: "row",
    alignItems: "center",
  },
  actionTypeText:{
    fontSize: 12,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    fontFamily: fonts.type
  },
  rewardText: {
      color: colors.dark,
      fontWeight: "bold",
      fontSize: 12,
      marginLeft: "auto",
      paddingHorizontal: 5,
      fontFamily: fonts.type
  },
  orgTitle:{
    paddingHorizontal: 5,
    fontFamily: fonts.subTitle,
  },
  openActionButton:{
    backgroundColor: "white",
    borderRadius: 15,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    width: "70%",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6.68,
    elevation: 4,
  },
  buttonText:{
    fontFamily: fonts.subTitle,
    fontSize: 16,
    width: "80%"
  },
  actionButtonContainer:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionButton:{
    backgroundColor: "white",
    borderRadius: 15,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    height: 70,
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6.68,
    elevation: 4,
  },
});

export default ActionDetailsScreen;
