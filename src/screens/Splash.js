import React, { useEffect, useContext } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../utils/Colors";
import AppContext from "../context/AppContext";
import imageIndex from "../assets/imageIndex";
import screensName from "../utils/screensName";
import { wait } from "../utils/functionUtils";
import Loader from "../components/Loader";
export default function Splash({ navigation }) {

  const { updateUserStateOnStart } = useContext(AppContext)

  const navigateToHomeScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name:screensName.HomeScreen }],
    });
  };
  const navigateToOnboarding = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: screensName.Onboarding }],
    });
  };

  const getDataFromStorage = async () => {
    await AsyncStorage.getItem("USER")
      .then((res) => {
        if (res) {
          return JSON.parse(res);
        } else {
          console.log("no user in storage");
        }
      })
      .then((resJson) => {
        console.log("splashUser on loading: ", resJson);
        if (resJson?.finishOnboarding) {
          updateUserStateOnStart(resJson);
          wait(2000).then(() => navigateToHomeScreen());
        } else {
          updateUserStateOnStart(resJson);
          wait(2000).then(() => navigateToOnboarding());
        }
      });
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundPic}
        source={imageIndex.splash_background()}
      >
        <View style={styles.picView}>
          <Loader />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPic: {
    flex: 1,
  },
  logoPic: {
    marginTop: 0,
    tintColor: Colors.colorWhite,
    width: 110,
    height: 110,
    paddingTop: 0,
  },
  picView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
