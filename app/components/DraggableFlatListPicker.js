import React from "react";
import { StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import colors from "../config/colors";

function DraggableFlatListPicker({
  data,
  renderItem,
  keyExtractor,
  onDragEnd,
}) {
  return (
    <DraggableFlatList
      style={styles.list}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={onDragEnd}
    />
  );
}

const styles = StyleSheet.create({
  list: {},
});

export default DraggableFlatListPicker;
