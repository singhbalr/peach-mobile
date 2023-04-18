import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import { PRIVATESCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import ButtonTabs from "components/ButtonTabs";
import InstitutionsSvg from "../../assets/icons/institutions.svg";
import ClinicalSvg from "../../assets/icons/clinical.svg";
import GeneticSvg from "../../assets/icons/genetic.svg";
import MedicalSvg from "../../assets/icons/medical.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { formatUnixTimestamp, maskHKID } from "utils";
import { t } from "i18next";
import { toggleClinicalNotificationState } from "redux/reducer";
const ClinicalReport: React.FC = () => {
  // const handleItemPress = () => {
  //   NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
  //     activeIndex: 2,
  //   });
  // };
  const dispatch = useDispatch();
  const handleItemPress = (fileRecord: any, medicalRecord: any) => {
    NavigationService.push(PRIVATESCREENS.CLINICAL_FILE_VIEWER, {
      pageIndex: 2,
      fileRecord,
      medicalRecord,
    });
  };

  const patientDetails = useSelector(
    (state: RootState) => state.auth.patientDetails,
  );

  useEffect(() => {
    dispatch(toggleClinicalNotificationState(false));
  }, []);

  const returnIcon = (fileValue, fileIndex) => {
    switch (fileValue.medical_record_file_type_id.file_type) {
      case "CLINICAL_RECORD":
        return (
          <View
            style={[styles.button, styles.clinicalSvg]}
            activeOpacity={0.5}
            key={fileIndex}
          >
            <ClinicalSvg />
            <Text style={styles.clinicalText}>
              {fileValue.medical_record_file_type_id.file_type_text}
            </Text>
          </View>
        );
      case "GENETIC_DATA":
        return (
          <View
            style={[styles.button, styles.geneticSvg]}
            activeOpacity={0.5}
            key={fileIndex}
          >
            <GeneticSvg />
            <Text style={styles.geneticText}>
              {fileValue.medical_record_file_type_id.file_type_text}
            </Text>
          </View>
        );
      case "MEDICAL_IMAGING":
        return (
          <View
            style={[styles.button, styles.medicalSvg]}
            activeOpacity={0.5}
            key={fileIndex}
          >
            <MedicalSvg />
            <Text style={styles.medicalText}>
              {fileValue.medical_record_file_type_id.file_type_text}
            </Text>
          </View>
        );
      default:
        break;
    }
  };

  const renderDrText = (doctor) => {
    if (doctor) {
      return `Dr. ${doctor.doctor_name} ${doctor.doctor_last_name}`;
    }
  };

  const renderList = () => {
    if (patientDetails.medical_record < 0) {
      return <></>;
    }

    return patientDetails.medical_record.map((item, index) => {
      return item.medical_record_file.map((data, dataIndex) => {
        return (
          <TouchableOpacity
            key={dataIndex}
            style={styles.reportItem}
            onPress={() => handleItemPress(data, item)}
          >
            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                {formatUnixTimestamp(item.created_at)}
              </Text>
              <View style={styles.dateLine} />
            </View>
            <Text style={styles.greenText}>
              {item?.hospital_id?.hospital_name}
            </Text>
            <Text style={styles.subText}>{renderDrText(item.doctor_id)}</Text>
            <View style={styles.tagContainer}>
              {returnIcon(data, dataIndex)}
            </View>
          </TouchableOpacity>
        );
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titleText={"Clinical Report"} />
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.topInfo}>
            <Image
              source={require("../../assets/icons/user.png")}
              style={styles.userIcon}
            />
            <Text
              style={styles.username}
            >{`${patientDetails.patient_name} ${patientDetails.patient_last_name}`}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.itemTitle}>HKID</Text>
            <Text style={styles.itemValue}>
              {maskHKID(patientDetails.patient_identification_number)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.itemTitle}>
              {t("ClinicalReport.DateBirth")}
            </Text>
            <Text style={styles.itemValue}>
              {formatUnixTimestamp(patientDetails.patient_date_of_birth)}
            </Text>
          </View>
        </View>
        <View style={styles.reportTitle}>
          <Text style={styles.title}>{t("ClinicalReport.ExistRecord")}</Text>
          <View style={styles.titleRight}>
            <InstitutionsSvg />
            <Text style={styles.rightText}>
              {t("ClinicalReport.Institutions")}
            </Text>
          </View>
        </View>
        <ScrollView>{renderList()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ClinicalReport;

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    flex: 1,
    // width: "100%",
    // color: "#fff",
    backgroundColor: "#fafafa",
    // zIndex: 1,
    // marginTop: 25,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  infoContainer: {
    paddingHorizontal: 36,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: "#BABCB7",
  },
  topInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: 65,
    height: 65,
    marginRight: 18,
    marginBottom: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#383D39",
    fontFamily: "TitilliumWeb-Bold",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 24,
  },
  itemTitle: {
    fontSize: 13,
    color: "#888B88",
  },
  itemValue: {
    fontSize: 13,
    color: "#383D39",
  },
  reportTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingTop: 27,
    paddingBottom: 22,
  },
  title: {
    fontSize: 18,
    color: "#383D39",
    fontFamily: "TitilliumWeb-SemiBold",
    fontWeight: "600",
  },
  titleRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    fontSize: 13,
    color: "#888B88",
    marginLeft: 8,
  },
  reportItem: {
    paddingHorizontal: 36,
    marginBottom: 20,
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
  tagContainer: {
    flexDirection: "row",
  },
  medicalSvg: {
    color: "#66A3AF",
    backgroundColor: "#eef2f3",
  },
  geneticSvg: {
    color: "#7BA040",
    backgroundColor: "#edf1e9",
  },
  clinicalSvg: {
    color: "#F596AA",
    backgroundColor: "#F8F1F2",
  },
  clinicalText: {
    fontSize: 10,
    color: "#F596AA",
    marginLeft: 4,
  },
  geneticText: {
    fontSize: 10,
    color: "#7BA040",
    marginLeft: 4,
  },
  medicalText: {
    fontSize: 10,
    color: "#66A3AF",
    marginLeft: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  buttonList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
