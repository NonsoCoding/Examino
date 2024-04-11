import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../Firebase/settings";
import { Theme } from "../components/Theme";
import { AppContext } from "../components/Globalvariables";

export function ForgottenPassword({navigation}) {
  const { setPreloader } = useContext(AppContext);
  const [email, setEmail] = useState("");

  function PasswordReset() {
    setPreloader(true);
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        setPreloader(false);
        Alert.alert(
          "Password reset",
          "A password reset link has been sent to your mail"
        );
      })
      .catch((e) => {
        console.log(e);
        setPreloader(false);
        Alert.alert(
          "Failed!",
          "Sorry, we could not reset your password. Password try again later."
        );
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View>
            <Feather
              name="lock"
              size={100}
              style={{
                borderWidth: 7,
                color: Theme.colors.primary,
                padding: 30,
                borderColor: Theme.colors.primary,
                borderRadius: 85,
                alignSelf: "center",
              }}
            />
          </View>
          <View style={styles.Text}>
            <Text
              style={{
                fontFamily: Theme.fonts.text600,
                fontSize: 20,
                paddingVertical: 20,
              }}
            >
              Trouble with logging in?
            </Text>
            <Text
              style={{ fontFamily: Theme.fonts.text300, paddingBottom: 10 }}
            >
              Enter your username or email address and we'll send you a link to
              get back into your account.
            </Text>
          </View>
          <View >
            <TextInput style={styles.textInput}
              placeholder="Username or email"
              onChangeText={(inp) => setEmail(inp)}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={PasswordReset}>
            <Text style={{ fontFamily: Theme.fonts.text800, color: "white" }}>
              Send Link
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: Theme.fonts.text900,
              color: Theme.colors.primary,
              fontSize: 17,
            }}
          >
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "space-between"
  },
  btn: {
    borderWidth: 1,
    padding: 17,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primary,
  },
  Text: {
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 17,
    borderRadius: 8,
    marginBottom: 20,
  },
});
