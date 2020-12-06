import React from "react";
import telemetry from "../analytics/telemetry"
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking} from "react-native";
import Screen from "../components/Screen"
import fonts from "../config/fonts"
import Text from "../components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function OrganizationDetailsScreen({ route, navigation }) {
  telemetry(eventTitle='viewOrganizationDetails')
  
  function loadInBrowser() {
    telemetry(eventTitle='pressOpenOrganizationURL', props={organizationId: organization.title})
    Linking.openURL(organization.url).catch(err => console.error("Couldn't load page", err));
  };

  const organization = route.params;
  return (
    <Screen title={"Organization"} back={true} navigation={navigation}>
      <ScrollView  style={styles.textContainer}>
        <Text style={styles.actionTitle}>{organization.title}</Text>
        <Text style={styles.descriptionText}>{organization.description}</Text>
        <Text style={styles.descriptionText}>{organization.contact}</Text>
      </ScrollView >
      <View style={{height:20}}></View>
      <TouchableOpacity style={styles.openActionButton} onPress={() => loadInBrowser()}>
        <MaterialCommunityIcons name={"link"} color={"black"} size={30} />
        <Text style={styles.buttonText}>    Organization Website</Text>
      </TouchableOpacity>
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
});

export default OrganizationDetailsScreen;
