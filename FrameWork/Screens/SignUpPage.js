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
  Image,
} from "react-native";
import { useContext, useState } from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import Octicons from "react-native-vector-icons/Octicons";
import { Theme } from "../components/Theme";
import * as yup from "yup";
import { Formik } from "formik";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../Firebase/settings";
import { AppContext } from "../components/Globalvariables";

const validation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export function SignUpPage({ navigation }) {
    const {setUserUID, setPreloader} = useContext(AppContext)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            setPreloader(true)
            signInWithEmailAndPassword(
              authentication,
              values.email,
              values.password
            )
              .then(() => {
                onAuthStateChanged(authentication, (user) => {
                  setUserUID(user.uid);
                  setPreloader(false);
                  Alert.alert("Logged in", "Successfully");
                  navigation.navigate("DashBoard");
                });
              })
              .catch((error) => {
                setPreloader(false);
                console.log(error);
                Alert.alert("Failed", "Please try again");
              });
          }}
          validationSchema={validation}
        >
          {(prop) => {
            return (
              <View>
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "700",
                      fontFamily: Theme.fonts.text900,
                    }}
                  >
                    Sign In
                  </Text>
                </View>
                <View>
                  <Image
                    source={require("../../assets/undraw_education_f8ru.png")}
                    style={{ height: 300, width: 350, alignSelf: "center" }}
                  />
                </View>
                <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Text style={{marginRight: 2, fontFamily: Theme.fonts.text600}}>Email</Text>
                    <Fontisto name="email" size={17}/>
                    </View>
                    <TextInput style={styles.NewAcctInput} placeholder="Examino@gmail.com"
                    onChangeText={prop.handleChange("email")}
                    value={prop.values.email}
                    onBlur={prop.handleBlur("email")}
                    />
                    <Text style={[styles.errorMessage, {display: prop.touched.email && prop.errors.email ? "flex" : "none"}]}>{prop.errors.email}</Text>
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Text style={{marginRight: 2, fontFamily: Theme.fonts.text600}}>Password</Text>
                    <Octicons name="lock" size={15}/>
                    </View>
                    <TextInput style={styles.NewAcctInput} placeholder="password"
                    onChangeText={prop.handleChange("password")}
                    value={prop.values.password}
                    onBlur={prop.handleBlur("password")}
                    secureTextEntry
                    />
                    <Text style={[styles.errorMessage, {display: prop.touched.password && prop.errors.password ? "flex" : "none"}]}>{prop.errors.password}</Text>
                      <TouchableOpacity style={{marginTop: 5}} onPress={() => navigation.navigate("ForgottenPassword")}>
                        <Text style={{fontFamily: Theme.fonts.text800}}>Forgot Password?</Text>
                      </TouchableOpacity>
                <TouchableOpacity style={styles.CreateAcctBtn} onPress={prop.handleSubmit}>
                    <Text style={{fontFamily: Theme.fonts.text900, fontSize: 18, color: Theme.colors.white}}>Continue</Text>
                </TouchableOpacity>
                <View style={styles.SignUpBtn}>
                    <Text style={{fontFamily: Theme.fonts.text600}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Create an account")}>
                        <Text style={{fontWeight: '700', color: 'blue', fontFamily: Theme.fonts.text900}}> Click here</Text>
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
    backgroundColor: "white",
  },
  NewAcctInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 1,
    borderRadius: 4,
    alignItems: 'center',
},
CreateAcctBtn: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Theme.colors.primary
},
SignUpBtn: {
    flexDirection: "row",
    marginVertical: 10
},
errorMessage: {
    color: 'red'

}
});
