import React, { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { StyleSheet, View, Text, Modal } from "react-native";
import { Button } from "@ui-kitten/components";

function LevelUp() {
  const things = useContext(RootStoreContext);
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={things.levelUpVisible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text>{`You just leveled up! New Level: ${things.userStatistics.levelNumber}`}</Text>
          <Button
            title={"Close"}
            onPress={() => things.updateLevelUpVisible(false)}
          ></Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    flex: 1,
    alignContent: "center",
  },
  modalContainer: {
    backgroundColor: "gray",
    borderRadius: 15,
    padding: 12,
    margin: 20,
  },
});

export default observer(LevelUp);
