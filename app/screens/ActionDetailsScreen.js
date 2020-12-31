import React, { useState, useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext";
import { View, StyleSheet, Linking, ScrollView } from "react-native";
import telemetry from "../analytics/telemetry";
import routes from "../navigation/routes";
import { Layout, Text, Button, Popover } from "@ui-kitten/components";
import Screen from "../components/Screen";
import WidgetContainer from "../components/widgets/WidgetContainer";
import AppIcon from "../components/AppIcon";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

function ActionDetailsScreen({ route, navigation }) {
  const things = useContext(RootStoreContext);
  const action = route.params;
  telemetry("viewActionDetailsScreen", true, {
    actionId: action.actionId,
    actionTitle: action.actionTitle,
  });
  const renderWorkflow = action.sourceList == "completed" ? false : true;
  const renderStar = action.sourceList == "completed" ? false : true;
  const [starIcon, setStarIcon] = useState(
    action.sourceList == "saved" ? "star" : "star-outline"
  );
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const organization = {
    title: action.organizationTitle,
    url: action.organizationUrl,
    description: action.organizationDescription,
  };

  const countMeInPress = async () => {
    telemetry("countMeInPress", false, {
      actionId: action.actionId,
      actionTitle: action.actionTitle,
    });
    navigation.navigate(routes.COMPLETEURL, action);
  };

  const handleOrgPress = async () => {
    telemetry("openOrgURL", false, {
      actionId: action.actionId,
      actionTitle: action.actionTitle,
    });
    Linking.openURL(organization.url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  const handleStarIconPress = async () => {
    if (starIcon == "star-outline") {
      telemetry("saveIconPressSave", false, {
        actionId: action.actionId,
        actionTitle: action.actionTitle,
      });
      setStarIcon("star");
      setTooltipVisible(true);
      things.updateActionState(
        action.actionId,
        "SAVED",
        action.reward,
        action.actionCause
      );
    } else {
      telemetry("saveIconPressUnSave", false, {
        actionId: action.actionId,
        actionTitle: action.actionTitle,
      });
      setStarIcon("star-outline");
      things.updateActionState(
        action.actionId,
        "UNSAVED",
        action.reward,
        action.actionCause
      );
    }
  };

  const renderStarIcon = () => (
    <TouchableWithoutFeedback onPress={() => handleStarIconPress()}>
      <AppIcon name={starIcon} size={"miniscule"} color="black" />
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Screen
        back={true}
        navigation={navigation}
        scrolling={true}
        paddingHorizontal={20}
      >
        <Layout level="4" style={{ alignItems: "center", paddingBottom: 30 }}>
          <AppIcon name="no-image" size="small-medium" />
          <Text category="h1" style={{ fontWeight: "bold", margin: 10 }}>
            {action.actionTitle}
          </Text>
        </Layout>
        <Layout level="4" style={{}}>
          <TouchableOpacity onPress={() => handleOrgPress()}>
            <Layout
              level="4"
              style={{
                flexDirection: "row",
                marginVertical: 3,
                marginLeft: 20,
              }}
            >
              <AppIcon name="people" size={"quick-hit"} />
              <Text
                category="s1"
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  textDecorationLine: "underline",
                }}
              >
                {organization.title}
              </Text>
            </Layout>
          </TouchableOpacity>
          <Layout
            level="4"
            style={{ flexDirection: "row", marginVertical: 3, marginLeft: 20 }}
          >
            <FontAwesome5 name="fist-raised" size={28} color="black" />
            <Text
              category="s1"
              style={{
                marginLeft: 16,
                fontWeight: "bold",
                textAlignVertical: "center",
              }}
            >
              {action.actionType}
            </Text>
          </Layout>
          <Layout
            level="4"
            style={{ flexDirection: "row", marginVertical: 3, marginLeft: 20 }}
          >
            <MaterialCommunityIcons
              name="account-clock"
              size={28}
              color="black"
            />
            <Text
              category="s1"
              style={{
                marginLeft: 16,
                fontWeight: "bold",
                textAlignVertical: "center",
              }}
            >
              5 minutes
            </Text>
          </Layout>
          <Layout
            level="4"
            style={{
              flexDirection: "row",
              marginVertical: 3,
              marginLeft: 20,
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="trophy" size={28} color="black" />
            <Text
              category="s1"
              style={{
                marginLeft: 16,
                fontWeight: "bold",
                textAlignVertical: "center",
              }}
            >
              {action.reward} points
            </Text>
            <Layout level="4" style={{ alignItems: "flex-end", flexGrow: 1 }}>
              {renderStar && (
                <Popover
                  anchor={renderStarIcon}
                  visible={tooltipVisible}
                  onBackdropPress={() => setTooltipVisible(false)}
                  placement={"left"}
                >
                  <Layout level="2" style={{ borderRadius: 15 }}>
                    <Text> Action Saved! </Text>
                  </Layout>
                </Popover>
              )}
            </Layout>
          </Layout>
        </Layout>

        <WidgetContainer>
          <Text category="s1">{action.actionDescription}</Text>
        </WidgetContainer>
        <Layout level="4" style={{ padding: 35 }}></Layout>
      </Screen>
      {renderWorkflow && (
        <Button
          status="success"
          style={{
            position: "absolute",
            bottom: 15,
            right: 15,
          }}
          onPress={() => countMeInPress()}
        >
          Count me in
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({});

export default ActionDetailsScreen;
