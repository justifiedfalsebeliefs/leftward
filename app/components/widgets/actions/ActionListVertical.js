import React, { useRef } from "react";
import { FlatList, Animated, View } from "react-native";
import ActionCardVertical from "./ActionCardVertical";
import routes from "../../../navigation/routes";
import { Layout, Text, useTheme } from "@ui-kitten/components";

function ActionListVertical({ itemList, navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={itemList}
      keyExtractor={(item) => item.actionId.toString()}
      renderItem={({ item }) => (
        <Animated.View style={{ opacity: fadeAnim }}>
          {fadeIn()}
          <ActionCardVertical
            title={item.actionTitle}
            description={item.actionDescription}
            onPress={() => navigation.navigate(routes.ACTION_DETAILS, item)}
          />
        </Animated.View>
      )}
      ItemSeparatorComponent={() => <Layout level="4" style={{ height: 20 }} />}
    />
  );
}

export default ActionListVertical;
