import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Theme } from '../components/Theme';
import { AppContext } from '../components/Globalvariables';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons"
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export function Jamb() {

    const {userInfo, setPrleoader} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredSubjects, SetFilteredSubjects] = useState([])
    const navigation = useNavigation();

    const subjects = [
      { name: "Mathematics", screen: "MathematicsScreenJamb" },
      { name: "English Language", screen: "EnglishScreenJamb" },
      { name: "Physics", screen: "PhysicsScreenJamb" },
      { name: "Chemistry", screen: "ChemistryScreenJamb" },
      { name: "Biology", screen: "BiologyScreenJamb" }
    ];

    useEffect(()=> {
      SetFilteredSubjects(subjects);
    }, [])

    function handleSearch(text) {
        setSearchTerm(text)

        const filteredSubjects = subjects.filter(subject => {
            return subject.name.toLowerCase().includes(text.toLowerCase());
        })

        SetFilteredSubjects(filteredSubjects)
    }

    function handlePress(screen) {
      navigation.navigate(screen);
    }

  return (
<GestureHandlerRootView style={{flex: 1}}>
<SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 15}}>
      <Text style={{fontFamily: Theme.fonts.text900, fontSize: 17}}>J.A.M.B</Text>
      <Text style={{fontFamily: Theme.fonts.text600, fontSize: 10}}>(click to go back)</Text>
        </View>
        <View>
            <Text style={{fontFamily: Theme.fonts.text900, fontSize: 19}}>Hi, {userInfo.firstName + " " + userInfo.lastName}</Text>
            <Text style={{fontFamily: Theme.fonts.text700, color: "#808080"}}>Here are the available courses for waec</Text>
        </View>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(inp) => handleSearch(inp)}
          />
        </View>
        <ScrollView>
        <View style={styles.container2}>
            {filteredSubjects.map((subject, index) => (
                <View key={index}>
            <TouchableOpacity style={{marginTop: 15}} onPress={() => handlePress(subject.screen)}>
                <ImageBackground style={{height: 250, width: 180,
                 backgroundColor: "#a6a6a6", borderRadius: 20, alignItems: "center", justifyContent: "center"}}>
                <Ionicons name='newspaper-outline' size={40}/>
                <Text style={{fontFamily: Theme.fonts.text800}}>{subject.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
                </View>
            ))}
    </View>
        </ScrollView>
        </View>
</SafeAreaView>
</GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 20,
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
    marginTop: 20
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 20,
    color: "#555",
  },
  container2: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});