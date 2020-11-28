import React from "react";
import eventHub from "../events/eventHub";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import Button from "../components/Button";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  eventHub.emitEvent(eventType='navigationEvent', eventTitle='viewWelcomeScreen')
  
  return (
    <ImageBackground
      blurRadius={1.5}
      style={styles.background}
      source={require("../assets/WelcomeBackground.png")}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/leftward_logo.png")} style={{width: 300, height: 150, resizeMode: 'contain'}}></Image>
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
