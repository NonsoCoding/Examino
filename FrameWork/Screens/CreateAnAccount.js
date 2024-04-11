import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import Octicons from "react-native-vector-icons/Octicons";
import * as yup from "yup";
import { Formik } from "formik";
import { Theme } from "../components/Theme";
import { AppContext } from "../components/Globalvariables";
import { authentication } from "../Firebase/settings";
import { createUserWithEmailAndPassword } from "firebase/auth";

const validation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(20),
});
export function CreateAccount({ navigation }) {
  const { setPreloader, setUserUID } = useContext(AppContext);
  // const signUpNavigation = useNavigation();

  // useEffect(() => {
  //     return () => {
  //         // prop.resetForm()
  //     }
  // }, [signUpNavigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            setPreloader(true);
            createUserWithEmailAndPassword(
              authentication,
              values.email,
              values.password
            )
              .then((userCredentials) => {
                const user = userCredentials.user;
                const uid = user.uid;

                navigation.navigate("ProceedCreateAcct", { uid });
                setPreloader(false);
              })
              .catch((error) => {
                setPreloader(false);
                console.error(error);
                Alert.alert("Error", "Something went wrong please try again.");
              });
          }}
          validationSchema={validation}
        >
          {(prop) => {
            return (
              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 30,
                    fontWeight: "700",
                    fontFamily: Theme.fonts.text900,
                    color: Theme.colors.primary,
                  }}
                >
                  Create an account
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{ marginRight: 2, fontFamily: Theme.fonts.text600 }}
                  >
                    Email
                  </Text>
                  <Fontisto name="email" size={17} />
                </View>
                <TextInput
                  style={styles.NewAcctInput}
                  placeholder="Examino@gmail.com"
                  onChangeText={prop.handleChange("email")}
                  value={prop.values.email}
                  onBlur={prop.handleBlur("email")}
                />
                <Text
                  style={[
                    styles.errorMessage,
                    {
                      display:
                        prop.touched.email && prop.errors.email
                          ? "flex"
                          : "none",
                    },
                  ]}
                >
                  {prop.errors.email}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{ marginRight: 2, fontFamily: Theme.fonts.text600 }}
                  >
                    Password
                  </Text>
                  <Octicons name="lock" size={15} />
                </View>
                <TextInput
                  style={styles.NewAcctInput}
                  placeholder="password"
                  onChangeText={prop.handleChange("password")}
                  value={prop.values.password}
                  onBlur={prop.handleBlur("password")}
                  secureTextEntry
                />
                <Text
                  style={[
                    styles.errorMessage,
                    {
                      display:
                        prop.touched.password && prop.errors.password
                          ? "flex"
                          : "none",
                    },
                  ]}
                >
                  {prop.errors.password}
                </Text>
                <TouchableOpacity
                  style={styles.CreateAcctBtn}
                  onPress={prop.handleSubmit}
                >
                  <Text
                    style={{
                      fontFamily: Theme.fonts.text900,
                      fontSize: 18,
                      color: Theme.colors.white,
                    }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
                <View style={styles.SignUpBtn}>
                  <Text style={{ fontFamily: Theme.fonts.text600 }}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Sign Up")}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "blue",
                        fontFamily: Theme.fonts.text900,
                      }}
                    >
                      {" "}
                      Click here
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: "center",
  },
  NewAcctInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 1,
    borderRadius: 4,
    alignItems: "center",
  },
  CreateAcctBtn: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: Theme.colors.primary,
  },
  SignUpBtn: {
    flexDirection: "row",
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
  },
});
