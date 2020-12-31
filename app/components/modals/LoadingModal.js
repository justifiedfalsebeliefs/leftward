import React, { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { StyleSheet, View, Modal } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";

function LoadingModal() {
  const things = useContext(RootStoreContext);
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={things.isLoading}
      style={{ alignItems: "center" }}
    >
      <Layout level="4" style={styles.backdrop}>
        <Layout style={styles.transparency}>
          <LottieView
            style={{ flex: 1 }}
            source={require("../../assets/animations/loader.json")}
            autoPlay={true}
          />
        </Layout>
      </Layout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  transparency: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: "50%",
    width: "80%",
  },
});

export default observer(LoadingModal);
