import React, { useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { AppContext } from '../../components/Globalvariables';
import { Theme } from '../../components/Theme';
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export function ChemistryExamInfoScreenJamb({navigation}) {

    const {userInfo} = useContext(AppContext);

  return (
<SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <TouchableOpacity>
        <MaterialCommunityIcons name='ray-end-arrow' size={40}/>
      </TouchableOpacity>
      <Text style={{fontFamily: Theme.fonts.text900, marginLeft: 5}}>Chemistry(Jamb)</Text>
      </View>
      <View style={{marginTop: 50, marginBottom: 20}}>
      <Text style={{fontFamily: Theme.fonts.text900, fontSize: 18}}>Hi, {userInfo.firstName + " " + userInfo.lastName}</Text>
      <Text style={{fontFamily: Theme.fonts.text800, fontSize: 15, color: "#808080"}}>Ready to take the exam?</Text>
        </View>
        <View style={{borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: "#808080", padding: 20, alignItems: "center"}}>
          <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25}}>Chemistry</Text>
        </View>
        <View style={{borderBottomWidth: 0.5, borderColor: "#808080", padding: 20, alignItems: "center"}}>
          <Text style={{fontFamily: Theme.fonts.text800}}>Exam1</Text>
        </View>
        <View style={{borderBottomWidth: 0.5, borderColor: "#808080", padding: 20, alignItems: "center"}}>
          <Text style={{fontFamily: Theme.fonts.text800}}>5 QUESTIONS to be Answered.</Text>
        </View>
        <View style={{borderBottomWidth: 0.5, borderColor: "#808080", padding: 20, alignItems: "center"}}>
          <Text style={{fontFamily: Theme.fonts.text800}}>Time: 1hr:30mins</Text>
        </View>
        <TouchableOpacity style={{borderRadius: 8, padding: 13, backgroundColor: Theme.colors.primary, alignItems: "center", marginTop: 70}} onPress={() => navigation.navigate("JambquestionlistChemistry")}>
          <Text style={{fontFamily: Theme.fonts.text900, fontSize: 16, color: Theme.colors.white}}>Begin</Text>
        </TouchableOpacity>
    </View>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 20,
  },
});