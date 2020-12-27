import React from "react";
import telemetry from "../analytics/telemetry";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import routes from "../navigation/routes";
import { Layout, Button } from "@ui-kitten/components";

function WelcomeScreen({ navigation }) {
  telemetry((eventTitle = "viewWelcomeScreen"));

  return (
    <ImageBackground
      blurRadius={1.5}
      style={styles.background}
      source={require("../assets/WelcomeBackground.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/leftward_logo.png")}
          style={{ width: 300, height: 150, resizeMode: "contain" }}
        ></Image>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          size="large"
          status="success"
          onPress={() => navigation.navigate(routes.LOGIN)}
        >
          Login{" "}
        </Button>
        <Button
          style={styles.button}
          size="large"
          status="info"
          onPress={() => navigation.navigate(routes.REGISTERCAUSE)}
        >
          Register
        </Button>
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
    margin: 20,
    width: "100%",
  },
  button: {
    margin: 20,
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
});

export default WelcomeScreen;
