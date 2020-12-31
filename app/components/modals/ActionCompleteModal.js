import React, { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { StyleSheet, View, Modal } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import ProgressSubWidget from "../../components/widgets/progress/ProgressSubWidget";
import LottieView from "lottie-react-native";

function ActionCompleteModal() {
  const things = useContext(RootStoreContext);
  const progression = things.progression;
  const progress =
    ((progression.pointsEarnedTotal - progression.currentLevelPointsRequired) /
      (progression.nextLevelPointsRequired -
        progression.currentLevelPointsRequired)) *
    100;
  return (
    <Modal
      animationType={"none"}
      transparent={true}
      visible={things.actionCompleteModalVisible}
      style={{ alignItems: "center" }}
    >
      <Layout level="4" style={styles.backdrop}>
        <Layout
          level="4"
          style={{
            height: 400,
            width: "80%",
            borderRadius: 45,
            padding: 20,
          }}
        >
          <Text
            category="h3"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Action Completed!
          </Text>
          <ProgressSubWidget
            style={{ borderRadius: 45, padding: 12 }}
            level={progression.levelNumber}
            progress={progress}
            pointsEarnedTotal={progression.pointsEarnedTotal}
            nextLevelPointsRequired={progression.nextLevelPointsRequired}
          />
          <LottieView
            style={{ flex: 1 }}
            source={require("../../assets/animations/confetti.json")}
            autoPlay={true}
            loop={false}
          />
          <Button
            status="success"
            onPress={() => things.updateActionCompleteModalVisible(false)}
            style={{ marginTop: 20 }}
          >
            Continue
          </Button>
        </Layout>
      </Layout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default observer(ActionCompleteModal);
