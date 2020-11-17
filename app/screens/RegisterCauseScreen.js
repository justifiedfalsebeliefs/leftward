import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import routes from "../navigation/routes";
import colors from "../config/colors"
import { TouchableOpacity } from "react-native-gesture-handler";
import uuidv4 from "../utility/uuid";
import getWeekNumber from "../utility/getWeekNumber"
import * as Amplitude from 'expo-analytics-amplitude';
import fonts from "../config/fonts";

function RegisterCauseScreen({ navigation }) {

  const [causes, setCauses] = useState();
  const [envColor, setEnvColor] = useState(colors.levelBarBackground);
  const [crimColor, setCrimColor] = useState(colors.levelBarBackground);
  const [econColor, setEconColor] = useState(colors.levelBarBackground);
  const [uuid, setUuid] = useState();
  
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {
    setUuid(uuidv4());
    Amplitude.setUserId(uuid)
    Amplitude.setUserProperties({cohortId: getWeekNumber(new Date())})
    Amplitude.logEvent('ViewRegisterCause')})

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


  return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.progressBackground}>
            <View style={styles.progressFill}></View>
          </View>
          <View style={{height:20}}></View>
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
          <View style={{height:20}}></View>
          <Text style={styles.note}>You'll see more actions for this cause at first. You can always change this later.</Text>
          <View style={{height:20}}></View>
          <Text style={styles.note}>We're adding causes as we grow!</Text>
          <View style={{height:40}}></View>
          <Button
          style={styles.nextButton}
            title="Next"
            onPress={() =>{
              navigation.navigate(routes.REGISTER, { causes: causes, guid: uuid })}
            }
          ></Button>
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
export default RegisterCauseScreen;
