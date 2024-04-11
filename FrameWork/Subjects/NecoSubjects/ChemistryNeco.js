import React, { useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { AppContext } from '../../components/Globalvariables';
import { Theme } from '../../components/Theme';
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export function ChemistryScreenNeco({navigation}) {

    const {userInfo} = useContext(AppContext);

  return (
<SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <TouchableOpacity>
        <MaterialCommunityIcons name='ray-end-arrow' size={40}/>
      </TouchableOpacity>
      <Text style={{fontFamily: Theme.fonts.text900, marginLeft: 5}}>Chemistry(Neco)</Text>
      </View>
        <View style={{marginTop: 50, marginBottom: 20}}>
      <Text style={{fontFamily: Theme.fonts.text900, fontSize: 18}}>Hi, {userInfo.firstName + " " + userInfo.lastName}</Text>
      <Text style={{fontFamily: Theme.fonts.text800, fontSize: 15, color: "#808080"}}>Subject Details</Text>
        </View>
        <View style={{borderTopWidth: 0.5, padding: 15, borderColor: "#808080", marginTop: 10, alignItems: "center"}}>
      <ImageBackground style={{height: 90, width: 320, backgroundColor: Theme.colors.primary, alignItems: "center", 
      justifyContent: "center", borderRadius: 18 }}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <View style={{padding: 5, backgroundColor: "white", borderRadius: 30}}>
            <Ionicons name='newspaper' size={40} color={"#808080"}/>
          </View>
            <View style={{marginLeft: 30}}>
                <Text style={{fontFamily: Theme.fonts.text800, paddingBottom: 4, fontSize: 14}}>Chemistry</Text>
                <View style={{padding: 3, borderRadius: 5, backgroundColor: "white"}}>
                <Text style={{fontFamily: Theme.fonts.text800, fontSize: 10}}>Select Available Exams</Text>
                </View>
            </View>
        </View>
      </ImageBackground>
        </View>
      <View>
        <View style={{borderTopWidth: 0.5, borderBottomWidth: 0.5, padding: 15, borderColor: "#808080", marginVertical: 10, alignItems: "center"}}>
        <Text style={{fontFamily: Theme.fonts.text900, fontSize: 16}}>Select Exam</Text>
        </View>
        <TouchableOpacity style={{padding: 13, alignItems: "center", borderRadius: 8, backgroundColor: Theme.colors.primary}} onPress={()=> navigation.navigate("ChemistryExamInfoScreenNeco")}>
          <Text style={{fontFamily: Theme.fonts.text800, color: "white"}}>Exam 1</Text>
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
  },
});