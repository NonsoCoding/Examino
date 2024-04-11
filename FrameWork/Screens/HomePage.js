import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { LondrinaSolid_100Thin } from "@expo-google-fonts/londrina-solid";
import Foundation from "react-native-vector-icons/Foundation";
import Carousel from "react-native-reanimated-carousel";
import { Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignUpPage } from "./SignUpPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Profile } from "./Profile";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { FiraSansCondensed_300Light, FiraSansCondensed_700Bold } from "@expo-google-fonts/fira-sans-condensed";
import { Theme } from "../components/Theme";
import { useContext, useEffect } from "react";
import { AppContext } from "../components/Globalvariables";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/settings";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const CarouselLinks = [
  "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const screenwidth = Dimensions.get("screen").width;

function Home({ navigation }) {

  const {userUID, setUserInfo, userInfo, setPreloader} = useContext(AppContext)

  async function getUserInfo() {
    onSnapshot(doc(db, "users", userUID), (snapshot) => {
      setUserInfo(snapshot.data());
    })
  }

  useEffect(() => {
    console.log(userUID);
    getUserInfo()
  }, []);

  async function waecPreloader() {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      navigation.navigate("Waec");
    }, 2000);
  }
  async function jambPreloader() {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      navigation.navigate("Jamb");
    }, 2000);
  }
  async function necoPreloader() {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      navigation.navigate("Neco");
    }, 2000);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={{fontFamily: 'LondrinaSolid_100Thin'}}>hello</Text> */}
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={screenwidth}
            height={250}
            autoPlay={true}
            data={CarouselLinks}
            scrollAnimationDuration={2000}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
              <View
                style={{
                  margin: 1,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: 250,
                    borderRadius: 10,
                  }}
                  source={{ uri: CarouselLinks[index] }}
                />
              </View>
            )}
          />
        <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25, marginTop: 15}}>Hi, {userInfo.firstName + " " + userInfo.lastName}</Text>
        <Text style={{fontFamily: Theme.fonts.text800}}>Select Exam Body</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.homePageBtn} onPress={waecPreloader}>
            <View style={[{ flexDirection: "row", alignItems: "center"}]}>
              <Avatar.Image
                size={50}
                source={require("../../assets/waecImage.png")}
              />
              <View >
                <Text style={[styles.TextHead, { fontWeight: "600" }]}> W.A.E.C.</Text>
                <Text style={[styles.Text, { fontSize: 10 }]}>
                  {" "}
                  West African Examination Council
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homePageBtn} onPress={necoPreloader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Image
                size={50}
                source={require("../../assets/necoImage.png")}
              />
              <View>
                <Text style={[styles.TextHead, { fontWeight: "600" }]}> N.E.C.O.</Text>
                <Text style={[styles.Text, { fontSize: 10 }]}>
                  {" "}
                  West African Examination Council
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homePageBtn} onPress={jambPreloader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Image
                size={50}
                source={require("../../assets/jambImage.png")}
              />
              <View>
                <Text style={[styles.TextHead, { fontWeight: "600" }]}> J.A.M.B.</Text>
                <Text style={[styles.Text, { fontSize: 10 }]}>
                  {" "}
                  West African Examination Council
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let size;
          if (route.name === "Home") {
            size = focused ? 35 : 23;
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Profile") {
            size = focused ? 35 : 23;
            iconName = focused ? "account" : "account-outline";
          } 

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.primary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: "space-between"
  },
  homePageBtn: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary
  },
  Text: {
    fontFamily: Theme.fonts.text900
  },
  TextHead: {
    fontFamily: Theme.fonts.text900
  }
});
