import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Navigation from "../../components/Navigation";
import ClinicalSvg from "../../assets/icons/clinical.svg";
import { SafeAreaView } from "react-native";
import { PRIVATESCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import { formatUnixTimestamp } from "./../../utils/index";
import IconButton from "components/IconButton";
type Props = {
  navigation: any;
  route: any;
};

const BioverseDetailScreen: React.FC = (props: Props) => {
  const { navigation, route } = props;
  const { bodyPart, records } = route.params;

  const handleItemPress = (fileRecord: any) => {
    // NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
    //   fileRecord,
    // });
    NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
      activeIndex: 2,
    });
  };

  const returnIcon = (fileValue, fileIndex) => {
    switch (fileValue.medical_record_file_type_id.file_type) {
      case "CLINICAL_RECORD":
        return (
          <View style={styles.button} activeOpacity={0.5} key={fileIndex}>
            <ClinicalSvg></ClinicalSvg>
            <Text style={styles.buttonText}>
              {fileValue.medical_record_file_type_id.file_type_text}
            </Text>
          </View>
        );
      case "GENETIC_DATA":
        return (
          <View style={styles.button} activeOpacity={0.5} key={fileIndex}>
            <ClinicalSvg></ClinicalSvg>
            <Text style={styles.buttonText}>
              {fileValue.medical_record_file_type_id.file_type_text}
            </Text>
          </View>
        );
      case "MEDICAL_IMAGING":
        return (
          <View style={styles.button} activeOpacity={0.5} key={fileIndex}>
            <ClinicalSvg></ClinicalSvg>
            <Text style={styles.buttonText}>
              {fileValue.medical_record_file_type_id.file_type_text}
            </Text>
          </View>
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Navigation titleText={bodyPart}></Navigation>
      <View style={styles.mainContainer}>
        <Text style={styles.mainText}>
          {records.length > 1
            ? `${records.length} Reports`
            : `${records.length} Report`}
        </Text>
        {records.map((value, index) => {
          console.log(value);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleItemPress(value)}
            >
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {formatUnixTimestamp(value.created_at)}
                </Text>
                <View style={styles.dateLine}></View>
              </View>
              <Text style={styles.greenText}>
                ${value.hospital_id.hospital_name}
              </Text>
              <Text
                style={styles.subText}
              >{`Dr. ${value.doctor_id.doctor_name} ${value.doctor_id.doctor_last_name}`}</Text>
              {returnIcon(value.medical_record_file[index], index)}
            </TouchableOpacity>
          );
        })}
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
    backgroundColor: "#fff",
    zIndex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 38,
    backgroundColor: "#fafafa",
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
