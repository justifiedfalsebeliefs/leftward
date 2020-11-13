import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import initialCauses from "../data/initialCauses";
import { Auth } from "aws-amplify";
import colors from "../config/colors"
import fonts from "../config/fonts"
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"

function UpdateCauseScreen({ navigation }) {
  logAmplitudeEventOnMount('ViewUpdateCause')

  const [causes, setCauses] = useState(initialCauses);
  const [envColor, setEnvColor] = useState(colors.levelBarBackground);
  const [crimColor, setCrimColor] = useState(colors.levelBarBackground);
  const [econColor, setEconColor] = useState(colors.levelBarBackground);


  function handleEnvPress(){
    setCrimColor(colors.levelBarBackground)
    setEnvColor(colors.primary)
    setEconColor(colors.levelBarBackground)
    setCauses("Environment Protection")
  }

  function handleCrimPress(){
    setCrimColor(colors.primary)
    setEnvColor(colors.levelBarBackground)
    setEconColor(colors.levelBarBackground)
    setCauses("Criminal Justice Reform")
  }

  function handleEconPress(){
    setEconColor(colors.primary)
    setEnvColor(colors.levelBarBackground)
    setCrimColor(colors.levelBarBackground)
    setCauses("Economic Justice")
  }


  const handleSubmit = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(currentUser, { "custom:causes": causes });
    navigation.goBack();
  };
  
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.instructions}>Pick a cause, get actions that make a difference</Text>
        <View style={{height:20}}></View>
        <TouchableOpacity style={[styles.causeButton, {backgroundColor: envColor,}]} onPress={() => handleEnvPress()}>
          <Text style={styles.causeText}>Environment Protection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.causeButton, {backgroundColor: crimColor,}]} onPress={() => handleCrimPress()}>
          <Text style={styles.causeText}>Criminal Justice Reform</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.causeButton, {backgroundColor: econColor,}]} onPress={() => handleEconPress()}>
          <Text style={styles.causeText}>Economic Justice</Text>
        </TouchableOpacity>
        <View style={{height:80}}></View>
        <Button title="Update Cause" onPress={handleSubmit}></Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  progressBackground:{
    backgroundColor: colors.levelBarBackground,
    height: 20,
    borderRadius: 12,
  },
  progressFill:{
      backgroundColor: colors.levelBarFill,
      borderRadius: 12,
      flex: 1,
      width: `50%`,
  },
  causeButton:{
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 25,
    width: 250,
    marginVertical: 10,
  },
  causeText:{
    textAlign: 'center',
    color: colors.contrastTextDarkBG,
    fontSize: 16,
    fontFamily: fonts.subTitle
  },
  instructions:{
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.screenTitle,
    paddingHorizontal: 20
  },
  note:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.screenTitle,
    paddingHorizontal: 20
  },
  nextButton:{
  }
});
export default UpdateCauseScreen;
