import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PIbutton from "@shared-components/buttons/Pbutton";
import { PUBLICSCREENS } from "@shared-constants";
interface Props {}

const Onboarding: React.FC<Props> = () => {
  const navigation = useNavigation();

  const handleExplorePress = () => {
    navigation.navigate(PUBLICSCREENS.LOGINSCREEN);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Peach Bioverse</Text>
        <Image
            source={require("../../assets/contribute-data/onboarding-1.png")}
            style={{
                marginTop: 50,
                marginBottom: 50,
                width: 300,
                height: 150,
                borderRadius: 25
            }}
        />
        <Text style={styles.subTitle}>Explore and Contribute your health data to build a healthy future</Text>
        <PIbutton
            text="Explore to share"
            type="secondary"
            style={{
                backgroundColor: "white",
                borderRadius: 45,
                borderColor: "white",
                marginTop: 20
            }}
            onPress={handleExplorePress}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
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
        lineHeight: 30
    }
})

export default Onboarding
