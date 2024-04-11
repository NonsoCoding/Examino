import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { Theme } from '../components/Theme';
import { TextInput } from 'react-native';
import { AppContext } from '../components/Globalvariables';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"


export function Profile({navigation}) {

  const {userInfo, setPreloader, userUID} = useContext(AppContext)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [comfirmPasswordVisible, setComfirmPasswordVisible] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);


  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
}
  function toggleComfirmPasswordVisibility() {
    setComfirmPasswordVisible(!comfirmPasswordVisible);
}

function editProfile() {
  setPreloader(true)
  updateDoc(doc(db, "users", userUID), {
    firstName,
    lastName
  }).then(()=> {
    setPreloader(false)
    Alert.alert(
    "Edit Profile",
    "Profile has been edited successfully"
    )
  }).catch((error)=> {
  setPreloader(false)
  Alert.alert(
  "Message!",
  "Something went wrong pllease try again.",
  [{text: 'Try again.'}]
  )
  })
}

const closeModal = () => {
  setModalVisibility(!modalVisibility);
};
async function logout(params) {
  setPreloader(true);
  setTimeout(() => {
    setPreloader(false);
    navigation.navigate("Intro");
  }, 2000);
}

  return (
<SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View>
      <Text style={{fontFamily: Theme.fonts.text900, fontSize: 20}}>Profile</Text>
      <Text style={{fontFamily: Theme.fonts.text800, color: "#808080"}}>Update your Profile here</Text>
      <View style={styles.searchContainer}>
          <Ionicons
            name="person-circle-sharp"
            size={30}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={userInfo.lastName}
            onChangeText={(text)=> setLastName(text.trim())}
          />
        </View>
      <View style={styles.searchContainer}>
          <Ionicons
            name="person-circle-sharp"
            size={30}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={userInfo.firstName}
            onChangeText={(text)=> setFirstName(text.trim())}
          />
        </View>
        <View style={{borderTopWidth: 0.5, borderColor: "#808080", paddingTop: 10, marginTop: 10}}>
          <Text style={{fontFamily: Theme.fonts.text800, color: Theme.colors.primary}}>Leave empty if you don't wanna change password</Text>
        </View>
      <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="key"
            size={30}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} />
          </TouchableOpacity>
        </View>
      <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="key"
            size={30}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Comfirm Password"
            secureTextEntry={!comfirmPasswordVisible}
          />
          <TouchableOpacity onPress={toggleComfirmPasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={comfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding: 13, alignItems: "center", backgroundColor: Theme.colors.primary, marginTop: 20, borderRadius: 8}} onPress={editProfile}>
          <Text style={{fontFamily: Theme.fonts.text800, color: "white"}}>Update</Text>
        </TouchableOpacity>
        <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
                >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                  <Pressable style={{ flex: 1 }} onPress={closeModal}></Pressable>
                  <View
                    style={{
                      height: 200,
                      backgroundColor: "#fcfbff",
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                    >
                    <View style={{ alignItems: "flex-end", margin: 10 }}>
                      <TouchableOpacity onPress={closeModal}>
                        {/* <FontAwesomeIcon
                                          icon={box}
                                          size={24}
                                          color='#787A8D'
                                        /> */}
                      </TouchableOpacity>
                    </View>
                    <View>
                      <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <Text>Are you sure you want to log out</Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          marginTop: 20,
                          margin: 15,
                          padding: 0,
                          borderRadius: 8,
                        }}
                        >
                        <TouchableOpacity
                          onPress={() => {
                            closeModal();
                            logout();
                          }}
                          style={{
                            backgroundColor: "#de4040",
                            width: "100%",
                            alignItems: "center",
                            padding: 10,
                            borderRadius: 8,
                          }}
                          >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Yes
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
      </View>
              <View>
              <TouchableOpacity style={{borderWidth: 1, alignItems: "center", padding: 10, 
                          borderRadius: 10, backgroundColor: Theme.colors.primary, 
                          borderColor: Theme.colors.primary, flexDirection: 'row', alignItems: "center",}} onPress={closeModal}>
                            <SimpleLineIcons
                                name="logout"
                                size={25}
                                style={{ paddingRight: 20, alignSelf: "center" }}
                                />
                              <Text style={{fontFamily: Theme.fonts.text900, color: "white"}}>Logout</Text>
                            </TouchableOpacity>
              </View>
    </View>
</SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "space-between"
  },
  SearchDesign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: ,
    paddingHorizontal: 1,
    borderRadius: 5,
  },
  SearchView: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
    width: 250,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginTop: 20,
    borderBottomWidth: 1
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 30,
    color: "#555",
    fontSize: 17
  },
  eyeIcon: {
    padding: 5,
}
});