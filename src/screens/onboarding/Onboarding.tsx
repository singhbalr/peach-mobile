import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PIbutton from "@shared-components/buttons/Pbutton";
import { PUBLICSCREENS } from "@shared-constants";
import { t } from "i18next";
import Video from "react-native-video";

interface Props {}

const Onboarding: React.FC<Props> = () => {
  const navigation = useNavigation(); // get navigation object
  //const [isVideoPlaying, setIsVideoPlaying] = useState(false); // state to track video playing status

  const handleExplorePress = () => {
    //if (videoRef.current) {
    //videoRef.current.stop();
    //}
    navigation.navigate(PUBLICSCREENS.LOGINSCREEN); // navigate to login screen
  };

  //const handleVideoPress = () => {
  // Pause/Play the video when clicked
  //if (videoRef.current) {
  // if (isVideoPlaying) {
  //videoRef.current.pause();
  //} else {
  //videoRef.current.resume();
  //}
  //setIsVideoPlaying(!isVideoPlaying);
  //}
  //};

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/contribute-data/peach-logo-3x.png")}
          style={{
            width: 60,
            height: 60,
            marginTop: 70,
            marginLeft: 30,
          }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t("OnBoarding.title")}</Text>
        <Video
          source={{
            uri: "https://drive.google.com/uc?export=download&id=1ao6KvvZUJGCR311e1bR7ISfkqJuSpgqx",
          }}
          style={{
            marginTop: 50,
            marginBottom: 50,
            width: 350,
            height: 200,
            borderRadius: 25,
          }}
          thumbnail={require("../../assets/contribute-data/onboarding.png")}
          resizeMode="contain"
          controls={true}
          playWhenInactive={false}
          //paused={!isVideoPlaying} // Pause the video if isVideoPlaying is false
          //onTouchStart={handleVideoPress} // Call handleVideoPress when video is clicked
        />
        <Text style={styles.subTitle}>{t("OnBoarding.subtitle")}</Text>
        <KeyboardAvoidingView>
          <PIbutton
            text={t("OnBoarding.titleButton")}
            type="secondary"
            style={{
              backgroundColor: "white",
              borderRadius: 45,
              borderColor: "white",
              marginTop: 25,
              padding: 7,
            }}
            onPress={handleExplorePress}
          />
        </KeyboardAvoidingView>
      </View>
      <Image
        source={require("../../assets/contribute-data/wave.png")}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignSelf: "stretch",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 1,
    marginLeft: 0,
    zIndex: -1,
    width: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 3,
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 30,
  },
  logo: {
    padding: 3,
    alignSelf: "flex-start",
  },
});

export default Onboarding;
