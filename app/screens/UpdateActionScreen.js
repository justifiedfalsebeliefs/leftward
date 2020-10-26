import React, { useState, useEffect } from "react";
import { View, StyleSheet, Switch } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { Auth } from "aws-amplify";
import routes from "../navigation/routes";
import * as Amplitude from 'expo-analytics-amplitude';


function UpdateActionScreen({ route, navigation }) {
  // Analytics
  const useMountEffect = (fun) => useEffect(fun, [])
  useMountEffect(() => {Amplitude.logEvent('ViewUpdateAction')});
  /////
  const [phoneValue, setphoneValue] = useState(false);
  const [writeValue, setwriteValue] = useState(false);
  const [marchValue, setmarchValue] = useState(false);
  const [donateValue, setdonateValue] = useState(false);
  const [shareValue, setshareValue] = useState(false);
  const actions = {
    phoneBank: "Phone Banking",
    phoneValue: phoneValue,
    writeLetter: "Write Letters",
    writeValue: writeValue,
    marchAttend: "Attend Marches",
    marchValue: marchValue,
    donateMoney: "Donate Money",
    donateValue: donateValue,
    shareContent: "Share Content",
    shareValue: shareValue,
  };
  const togglePhoneSwitch = (value) => {
    setphoneValue(value);
  };
  const togglewriteSwitch = (value) => {
    setwriteValue(value);
  };
  const togglemarchSwitch = (value) => {
    setmarchValue(value);
  };
  const toggledonateSwitch = (value) => {
    setdonateValue(value);
  };
  const toggleshareSwitch = (value) => {
    setshareValue(value);
  };
  const handleSubmit = async () => {
    var actionsOut = "";
    actionsOut = actionsOut.concat("donate:", donateValue.toString(), ",");
    actionsOut = actionsOut.concat("march:", marchValue.toString(), ",");
    actionsOut = actionsOut.concat("phone:", phoneValue.toString(), ",");
    actionsOut = actionsOut.concat("share:", shareValue.toString(), ",");
    actionsOut = actionsOut.concat("write:", writeValue.toString(), ",");

    const currentUser = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(currentUser, { "custom:actions": actionsOut });
    navigation.goBack();
  };
  
  return (
    <Screen>
      <View style={styles.switchZone}>
        <AppText>{actions.phoneBank}</AppText>
        <Switch
          style={styles.switch}
          onValueChange={togglePhoneSwitch}
          value={phoneValue}
        />
      </View>
      <View style={styles.switchZone}>
        <AppText>{actions.writeLetter}</AppText>
        <Switch
          style={styles.switch}
          onValueChange={togglewriteSwitch}
          value={writeValue}
        />
      </View>
      <View style={styles.switchZone}>
        <AppText>{actions.marchAttend}</AppText>
        <Switch
          style={styles.switch}
          onValueChange={togglemarchSwitch}
          value={marchValue}
        />
      </View>
      <View style={styles.switchZone}>
        <AppText>{actions.donateMoney}</AppText>
        <Switch
          style={styles.switch}
          onValueChange={toggledonateSwitch}
          value={donateValue}
        />
      </View>
      <View style={styles.switchZone}>
        <AppText>{actions.shareContent}</AppText>
        <Switch
          style={styles.switch}
          onValueChange={toggleshareSwitch}
          value={shareValue}
        />
      </View>
      <AppButton title="Update Actions" onPress={handleSubmit}></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  switchZone: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
  },
  switch: {
    padding: 20,
  },
});

export default UpdateActionScreen;
