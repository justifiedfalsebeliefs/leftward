import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import colors from "../config/colors";
import Text from "../components/Text";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import useAuth from "../auth/useAuth";

function ActionDetailsScreen({ route, navigation }) {
  const { user, logOut } = useAuth();

  const handleStatusPress = async (status) => {
    try {
      // const result = await API.graphql(
      //   graphqlOperation(createUserAction, {
      //     createUserActionInput: {
      //       userGuid: user.attributes["custom:GQLuserID"],
      //       actionId: action.actionId,
      //       status: status,
      //     },
      //   })
      // )
      console.log("pressed");
      Alert.alert("Success!", "Status Updated.", [{ text: "OK" }]);
      if (status == "HIDDEN") navigation.goBack();
      if (status == "COMPLETE") navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  const action = route.params;
  const campaign = {
    title: action.campaignTitle,
    description: action.campaignDescription,
    organization: {
      contact: action.organizationContact,
      title: action.organizationTitle,
      description: action.organizationDescription,
    },
    
  };
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
        {/* CONDITIONALLY RENDER BELOW IF NOT ALREADY IN PROGRESS */}
        <AppButton
          title={"Add to my in progress actions"}
          onPress={() => handleStatusPress("INPROGRESS")}
        ></AppButton>
        <AppButton
          title={"Hide from actions list"}
          onPress={() => handleStatusPress("HIDDEN")}
        ></AppButton>
        <AppButton
          title={"Complete action"}
          onPress={() => handleStatusPress("COMPLETE")}
        ></AppButton>
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
