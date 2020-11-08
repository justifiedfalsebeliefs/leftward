import React, { useState, useEffect } from "react";
import { View, StyleSheet, Linking } from "react-native";
import colors from "../config/colors";
import Text from "../components/Text";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import useAuth from "../auth/useAuth";
import pushActionStatus from "../data/pushActionStatus"
import pushCalcExp from "../data/pushCalcExp"

import * as Amplitude from 'expo-analytics-amplitude';

function ActionDetailsScreen({ route, navigation }) {
  const { user, logOut } = useAuth();
  const action = route.params;
  // Analytics
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {Amplitude.logEventWithProperties('ViewActionDetails', {actionId: action.actionId, actionTitle: action.actionTitle})});
  /////

  const campaign = {
    title: action.campaignTitle,
    description: action.campaignDescription,
    organization: {
      contact: action.organizationContact,
      title: action.organizationTitle,
      description: action.organizationDescription,
    }};
    
    function loadInBrowser() {
      Amplitude.logEventWithProperties('PressOpenActionURL', {actionId: action.actionId, actionTitle: action.actionTitle})
      Linking.openURL(action.url).catch(err => console.error("Couldn't load page", err));
    };
    
  const handleStatusPress = async (status, actionId) => {
    try {
      Amplitude.logEventWithProperties('PressStatusUpdate', {status: status, actionId: actionId})
      await pushActionStatus(user.attributes["custom:GQLuserID"], status, actionId)
      if (status == "COMPLETE") await pushCalcExp(user.attributes["custom:GQLuserID"]);
      navigation.goBack()
    } catch (error) {
      console.log(error.message);
    }
  }
  ;
  return (
    <View>
      {/* <Image
        style={styles.image}
        preview={{ uri: action.images[0].thumbnailUrl }}
        tint="light"
        uri={action.images[0].url}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.points}>Points: {action.reward}</Text>
        <Text style={styles.title}>{action.actionTitle}</Text>

        <Text style={styles.description}>{action.actionDescription}</Text>
        <Text style={styles.description}>{action.actionType}</Text>
        <Text
          style={styles.org}
          onPress={() => navigation.navigate(routes.CAMPAIGN_DETAILS, campaign)}
        >
          Campaign: {action.campaignTitle}
        </Text>
        <AppButton title="Open in Browser" onPress={() => loadInBrowser()} />

        { action.sourceList != "myActions" && (<AppButton
          title={"Add to my in progress actions"}
          onPress={() => handleStatusPress("INPROGRESS", action.actionId)}
        ></AppButton>)}

        { action.sourceList == "myActions" && (<AppButton
          title={"Complete action"}
          onPress={() => handleStatusPress("COMPLETE", action.actionId)}
        ></AppButton>)}
        <View style={styles.userContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  points: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "500",
  },
  org: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ActionDetailsScreen;
