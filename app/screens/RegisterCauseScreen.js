import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import { Button, CheckBox, Layout, Text } from "@ui-kitten/components";
import routes from "../navigation/routes";
import cause from "../config/cause";
import uuidv4 from "../utility/uuid";
import getWeekNumber from "../utility/getWeekNumber";
import * as Amplitude from "expo-analytics-amplitude";
import useMountEffect from "../hooks/useMountEffect";

function RegisterCauseScreen({ navigation }) {
  const [causes, setCauses] = useState("TODO");
  const [uuid, setUuid] = useState();
  const [envChecked, setEnvChecked] = useState(false);
  const [ecoChecked, setEcoChecked] = useState(false);
  const [lawChecked, setLawChecked] = useState(false);
  const [lgbChecked, setLgbChecked] = useState(false);
  const [racChecked, setRacChecked] = useState(false);

  useMountEffect(() => {
    setUuid(uuidv4());
    Amplitude.setUserId(uuid);
    Amplitude.setUserProperties({ cohortId: getWeekNumber(new Date()) });
    Amplitude.logEvent("ViewRegisterCauseScreem");
  });

  return (
    <Screen style={styles.container}>
      <View style={styles.progressBackground}>
        <View style={styles.progressFill}></View>
      </View>
      <Layout style={styles.checkboxContainer}>
        <CheckBox
          style={styles.checkbox}
          checked={envChecked}
          onChange={(nextChecked) => setEnvChecked(nextChecked)}
        >
          {cause.env.title}
        </CheckBox>
        <CheckBox
          style={styles.checkbox}
          checked={ecoChecked}
          onChange={(nextChecked) => setEcoChecked(nextChecked)}
        >
          {cause.eco.title}
        </CheckBox>
        <CheckBox
          style={styles.checkbox}
          checked={lawChecked}
          onChange={(nextChecked) => setLawChecked(nextChecked)}
        >
          {cause.law.title}
        </CheckBox>
        <CheckBox
          style={styles.checkbox}
          checked={lgbChecked}
          onChange={(nextChecked) => setLgbChecked(nextChecked)}
        >
          {cause.lgb.title}
        </CheckBox>
        <CheckBox
          style={styles.checkbox}
          checked={racChecked}
          onChange={(nextChecked) => setRacChecked(nextChecked)}
        >
          {cause.rac.title}
        </CheckBox>
      </Layout>
      <Text style={styles.note}>You can always change this later.</Text>
      <Button
        style={styles.nextButton}
        status="success"
        onPress={() => {
          navigation.navigate(routes.REGISTER, { causes: causes, guid: uuid });
        }}
      >
        Next
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  progressBackground: {
    backgroundColor: "blue",
    height: 20,
    borderRadius: 12,
  },
  checkboxContainer: {
    margin: 20,
  },
  checkbox: {
    marginVertical: 10,
  },
  progressFill: {
    backgroundColor: "blue",
    borderRadius: 12,
    flex: 1,
    width: `50%`,
  },
  note: {
    textAlign: "center",
    marginVertical: 10,
  },
});
export default RegisterCauseScreen;
