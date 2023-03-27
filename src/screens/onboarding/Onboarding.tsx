import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import PIbutton from "@shared-components/buttons/Pbutton";
interface Props {}

const Onboarding: React.FC<Props> = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Peach Bioverse</Text>
        <Image 
            source={require("../../assets/contribute-data/onboarding-1.png")}
            style={{
                width: 30,
                height: 10,
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
            }}
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
        fontSize: 22,
        color: "white",
        fontWeight: "700",
    },
    subTitle: {
        fontSize: 18,
        color: "white",
        fontWeight: "500",
        textAlign: "center",
    }
})

export default Onboarding
