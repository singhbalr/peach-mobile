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
            marginTop: 72,
            marginLeft: 14,
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
            marginVertical: 30,
            width: '100%',
            height: 190,
            borderRadius: 15,
          }}
          thumbnail={require("../../assets/contribute-data/onboarding.png")}
          resizeMode="cover"
          controls={true}
          playWhenInactive={false}
          //paused={!isVideoPlaying} // Pause the video if isVideoPlaying is false
          //onTouchStart={handleVideoPress} // Call handleVideoPress when video is clicked
        />
        <Text style={styles.subTitle}>{t("OnBoarding.subtitle")}</Text>
        <KeyboardAvoidingView style={styles.btnView}>
          <PIbutton
            text={t("OnBoarding.titleButton")}
            type="secondary"
            style={{
              width: '100%',
              backgroundColor: "white",
              borderRadius: 45,
              borderColor: "white",
              marginTop: 30,
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
    paddingHorizontal: 34,
    paddingTop: 3,
    marginBottom: 70,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 33,
    color: "white",
  },
  subTitle: {
    fontSize: 18,
    color: "white",
    lineHeight: 27,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 18,
  },
  btnView: {
    width: '100%'
  },
  logo: {
    padding: 3,
    alignSelf: "flex-start",
  },
});

export default Onboarding;
