import React from "react";
import Constants from "expo-constants";
import colors from "../config/colors"
import fonts from "../config/fonts"
import Icon from "../components/Icon"
import { StyleSheet, SafeAreaView, View, Text} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function Screen({ children, style, title, back, navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
      {back && (<TouchableWithoutFeedback onPress={() => navigation.goBack()} >
        <Icon name={"chevron-left"} alignItems="flex-start" size={80}></Icon>
        </TouchableWithoutFeedback>)}
      {title && (<Text style={styles.titleText}>{title}</Text>)}
      </View>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight + 15,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.screenBackground,
  },
  titleContainer:{
    flexDirection: "row",
  },
  titleText:{
    fontSize: 30,
    alignSelf: "center",
    paddingVertical: 20,
    fontFamily: fonts.screenTitle,
    color: colors.screenTitle
  },
  view: {
  },
});

export default Screen;
