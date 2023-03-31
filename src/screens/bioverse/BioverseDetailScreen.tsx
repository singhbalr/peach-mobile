import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Navigation from "../../components/Navigation";
import ClinicalSvg from "../../assets/dashboard/clinical.svg";
import { SafeAreaView } from "react-native";
import { PRIVATESCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
const BioverseDetailScreen: React.FC = () => {
  const handleItemPress = (OpportunityRecord: any) => {
    NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
      OpportunityRecord,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Navigation titleText={"Liver"}></Navigation>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>1 Reports</Text>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>25 Jul 2022</Text>
          <View style={styles.dateLine}></View>
        </View>
        <Text style={styles.greenText}>Medtimes</Text>
        <Text style={styles.subText}>Dr. Ho Wai Ming</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={handleItemPress}
        >
          <ClinicalSvg></ClinicalSvg>
          <Text style={styles.buttonText}>Clinical Record</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default BioverseDetailScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    color: "#fff",
    backgroundColor: "#fafafa",
    zIndex: 1,
  },
  mainContainer: {
    paddingVertical: 30,
    paddingHorizontal: 38,
  },
  mainText: {
    fontSize: 18,
    color: "#000",
    lineHeight: 27,
    marginBottom: 22,
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },
  dateText: {
    fontSize: 13,
    color: "#888B88",
    lineHeight: 19,
    marginRight: 15,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#BABCB7",
  },
  greenText: {
    fontSize: 13,
    color: "#7BA040",
    lineHeight: 17,
    marginBottom: 2,
  },
  subText: {
    fontSize: 16,
    color: "#383D39",
    lineHeight: 24,
    marginBottom: 9,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 30,
    paddingHorizontal: 12,
    backgroundColor: "#F8F1F2",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 10,
    color: "#F196A8",
    marginLeft: 4,
  },
});
