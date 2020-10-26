import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import routes from "../navigation/routes";
import { AntDesign } from "@expo/vector-icons";

import * as Amplitude from 'expo-analytics-amplitude';

function WelcomeScreen({ navigation }) {
  Amplitude.logEvent('ViewWelcomeScreen')
  return (
    <ImageBackground
      blurRadius={1.5}
      style={styles.background}
      source={require("../assets/WelcomeBackground.png")}
    >
      <View style={styles.logoContainer}>
        <AntDesign name="leftcircle" size={110} color="black" />
        <Text style={styles.tagline}>Make a difference</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTERCAUSE)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
