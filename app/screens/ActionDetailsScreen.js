import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import colors from "../config/colors";
import Text from "../components/Text";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import useAuth from "../auth/useAuth";
import pushActionStatus from "../data/pushActionStatus"

function ActionDetailsScreen({ route, navigation }) {
  const { user, logOut } = useAuth();
  const action = route.params;
  const campaign = {
    title: action.campaignTitle,
    description: action.campaignDescription,
    organization: {
      contact: action.organizationContact,
      title: action.organizationTitle,
      description: action.organizationDescription,
    }};

  const handleStatusPress = async (status, actionId) => {
    try {
      await pushActionStatus(user.attributes["custom:GQLuserID"], status, actionId)
      Alert.alert("Success!", "Status Updated.", [{ text: "OK" }]);
      if (status == "HIDDEN") navigation.goBack();
      if (status == "COMPLETE") navigation.goBack();
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
        <Text style={styles.points}>Points{action.reward}</Text>
        <Text style={styles.title}>{action.actionTitle}</Text>

        <Text style={styles.description}>{action.actionDescription}</Text>
        <Text style={styles.description}>{action.actionType}</Text>
        <Text
          style={styles.org}
          onPress={() => navigation.navigate(routes.CAMPAIGN_DETAILS, campaign)}
        >
          Campaign: {action.campaignTitle}
        </Text>

        { action.sourceList != "myActions" && (<AppButton
          title={"Add to my in progress actions"}
          onPress={() => handleStatusPress("INPROGRESS", action.actionId)}
        ></AppButton>)}

        { action.sourceList != "hidden" && (<AppButton
          title={"Hide from actions list"}
          onPress={() => handleStatusPress("HIDDEN", action.actionId)}
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
