import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, StatusBar, SafeAreaView, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from "../components/Globalvariables";
import { authentication, db } from "../Firebase/settings";
import { Theme } from "../components/Theme";

const validation = yup.object({
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
});

export function ProceedCreateAcct({ navigation }) {
  const { setPreloader, setUserUID } = useContext(AppContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatePicked = () => {
    setShowDatePicker(true);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ FirstName: "", LastName: "",}}
          onSubmit={(values) => {
            setPreloader(true);
            onAuthStateChanged(authentication, (user) => {
                console.log("Form Values:", values)
              if (user) {
                setUserUID(user.uid);
                const userUID = user.uid;
                const userDocRef = doc(db, "users", userUID);
                
                // Format date properly before storing
                
                setDoc(userDocRef, {
                  firstName: values.FirstName,
                  lastName: values.LastName,
                   // Pass formatted date here
                })
                  .then(() => {
                    setPreloader(false);
                    Alert.alert("Success", "Registration complete!");
                    navigation.navigate("DashBoard");
                  })
                  .catch((error) => {
                    console.log(error);
                    setPreloader(false);
                    Alert.alert("Message", "Sorry, something went wrong. Please try again.");
                  });
              } else {
                setPreloader(false);
                Alert.alert("Sorry", "User not authenticated");
              }
            });
          }}
          validationSchema={validation}
        >
          {(props) => {
            return (
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center" }}
              >
                  <View>
                    <Text style={{ fontFamily: Theme.fonts.text900, fontSize: 35, color: Theme.colors.primary }}>Create an account</Text>
                    <Text style={styles.TextInputText}>First Name*</Text>
                    <TextInput
                      onChangeText={props.handleChange("FirstName")}
                      value={props.values.FirstName}
                      onBlur={props.handleBlur("FirstName")}
                      style={styles.TextInput}
                    />
                    <Text style={[styles.error, { display: props.touched.FirstName && props.errors.FirstName ? "flex" : "none" }]}>{props.errors.FirstName}</Text>
                    <Text style={styles.TextInputText}>Last Name*</Text>
                    <TextInput
                      onChangeText={props.handleChange("LastName")}
                      value={props.values.LastName}
                      onBlur={props.handleBlur("LastName")}
                      style={styles.TextInput}
                    />
                    <Text style={[styles.error, { display: props.touched.LastName && props.errors.LastName ? "flex" : "none" }]}>{props.errors.LastName}</Text>
                    <Text style={styles.TextInputText}>Date of Birth</Text>
                    <TouchableOpacity onPress={showDatePicked} style={{ padding: 18, backgroundColor: Theme.colors.primary, alignItems: "center", borderRadius: 8, marginVertical: 10 }}>
                      <Text>Show Date Picker</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                      />
                    )}
                    <TouchableOpacity style={styles.btn} onPress={props.handleSubmit}>
                      <Text style={{ fontFamily: Theme.fonts.text800, fontSize: 18, color: "white" }}>Continue</Text>
                    </TouchableOpacity>
                  </View>
              </KeyboardAvoidingView>
            )
          }}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: "center"
  },
  TextInput: {
    borderWidth: 1,
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  TextInputText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Theme.fonts.text500,
  },
  btn: {
    borderWidth: 1,
    backgroundColor: Theme.colors.primary,
    padding: 12,
    borderColor: Theme.colors.primary,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  error: {
    color: "red",
    fontFamily: Theme.fonts.text300
  }
});
