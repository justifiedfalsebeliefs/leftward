import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../config/colors"
import fonts from "../../config/fonts"
import Icon from "../Icon";

function BadgesWidget({
    badgesData,
    height = 100
}) {
if(typeof badgesData !== 'undefined'){
    return (
        <View style={{
            backgroundColor: colors.componentBackground,
            borderRadius: 15,
            padding: 12,
            height: height,
            shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.26,
  shadowRadius: 6.68,
  elevation: 4,
          }}>
            <View style={styles.titleContainer}>
              <Icon name={"trophy"} size={40}></Icon>
              <Text style={styles.titleText}>{"Badges"}</Text>
            </View>
        </View>

    );
}else return (<View >
    <Text style={styles.loadingText}>{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
    titleContainer:{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15
      },
      titleText:{
        fontSize: 23,
        marginHorizontal: 10,
        fontFamily: fonts.componentTitle
      },
});

export default BadgesWidget;
