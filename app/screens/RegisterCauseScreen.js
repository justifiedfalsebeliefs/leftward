import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import initialCauses from "../data/initialCauses";
import { ProgressBar } from 'react-native-paper';
import colors from "../config/colors"
import { TouchableOpacity } from "react-native-gesture-handler";
import uuidv4 from "../utility/uuid";
import getWeekNumber from "../utility/getWeekNumber"
import * as Amplitude from 'expo-analytics-amplitude';

function RegisterCauseScreen({ navigation }) {

  const [causes, setCauses] = useState(initialCauses);
  const [envColor, setEnvColor] = useState("lightblue");
  const [crimColor, setCrimColor] = useState("lightblue");
  const [econColor, setEconColor] = useState("lightblue");
  const [uuid, setUuid] = useState();
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {
    setUuid(uuidv4());
    Amplitude.setUserId(uuid)
    Amplitude.setUserProperties({cohortId: getWeekNumber(new Date())})
    Amplitude.logEvent('ViewRegisterCause')})

  function handleEnvPress(){
    setCrimColor('lightblue')
    setEnvColor(colors.primary)
    setEconColor('lightblue')
    setCauses("Environment Protection")
  }

  function handleCrimPress(){
    setCrimColor(colors.primary)
    setEnvColor('lightblue')
    setEconColor('lightblue')
    setCauses("Criminal Justice Reform")
  }

  function handleEconPress(){
    setEconColor(colors.primary)
    setEnvColor('lightblue')
    setCrimColor('lightblue')
    setCauses("Economic Justice")
  }


  return (
    <>
      <Screen style={styles.container}>
      <ProgressBar progress={0.5} color={"green"} height={20} />
      <Text style={styles.instructions}>Pick a cause, get actions that make a difference</Text>
      <View style= {styles.innerScreen}>
      
      <TouchableOpacity style={{
        backgroundColor: envColor,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        width: 250,
        marginVertical: 10,
        }} onPress={() => handleEnvPress()}>
      <Text style={styles.causeText}>Environment Protection</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
          backgroundColor: crimColor,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          width: 250,
          marginVertical: 10,
          }} onPress={() => handleCrimPress()}>
      <Text style={styles.causeText}>Criminal Justice Reform</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
          backgroundColor: econColor,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          width: 250,
          marginVertical: 10,
          }} onPress={() => handleEconPress()}>
      <Text style={styles.causeText}>Economic Justice</Text>
      </TouchableOpacity>
      <Text style={styles.note}>You'll see more actions for this cause at first.{"\n"}You can always change this later. {"\n"}{"\n"}{"\n"}We're adding causes as we grow!</Text>
      </View>
        <AppButton
        style={styles.nextButton}
          title="Next"
          onPress={() =>{
            navigation.navigate(routes.REGISTER, { causes: causes, guid: uuid })}
          }
        ></AppButton>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 10,
    justifyContent: "space-between",
  },
  innerScreen: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  selectContainer:{
    flexWrap: "wrap",
    height: "30%"
  },
  causeText:{
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold"
  },
  instructions:{
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 30
  },
  note:{
    textAlign: 'center',
    fontSize: 14,
    padding: 20,
    paddingTop: 100
  },
  nextButton:{
    alignSelf: "flex-end",
    justifyContent: "flex-end"
  }
});
export default RegisterCauseScreen;
