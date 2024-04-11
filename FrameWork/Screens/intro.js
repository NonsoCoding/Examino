import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LondrinaSolid_900Black } from "@expo-google-fonts/londrina-solid";
import { FiraSansCondensed_300Light } from "@expo-google-fonts/fira-sans-condensed";
import { FiraSansCondensed_700Bold } from "@expo-google-fonts/fira-sans-condensed";
import { Video } from "expo-av";
import { Theme } from "../components/Theme";

export function Examino({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Video
          source={require("../../assets/backgroundVideo.mp4")}
          style={styles.backgroundVideo}
          volume={1}
          Muted={true}
          shouldPlay
          resizeMode="cover"
          rate={1.0}
          isLooping
          ignoreSilentSwitch={"obey"}
        />
          <View>
          <Text style={{fontFamily: Theme.fonts.brand, fontSize: 70, marginTop: 30, color: Theme.colors.primary}}>Examino</Text>
          <Text style={{fontFamily: Theme.fonts.text900, fontSize: 20}}>Your virtual online guide...</Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.button1} onPress={()=> navigation.navigate("Sign Up")}>
            <Text style={[styles.Text, {color: Theme.colors.primary}]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Create an account")}>
            <Text style={styles.Text}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.primary
  },
  button1: {
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
  },
  Text: {
    fontFamily: Theme.fonts.text900,
    fontSize: 17,
    color: Theme.colors.white
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },
});
