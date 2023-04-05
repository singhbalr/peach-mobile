import React, { useState, useEffect, createRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Animated,
} from "react-native";
import { GET_MEDICAL_RECORD_BY_BODY_PART } from "../../connection/mutation";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import { PRIVATESCREENS } from "@shared-constants";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import MaleBodySvg from "../../assets/dashboard/male-body.svg";
import ReportSvg from "../../assets/dashboard/report.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { t } from "i18next";

interface HomeScreenProps {}
interface ButtonProps {
  buttonText: string;
  reportCount?: Number;
  buttonStyles?: ViewStyle;
  onPress?: () => void;
}
const BodyButton: React.FC<ButtonProps> = (props) => {
  const { buttonText, reportCount, buttonStyles, onPress } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.bodyButton, buttonStyles]}
      onPress={onPress}
    >
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{buttonText}</Text>
        {reportCount ? (
          <>
            <ReportSvg style={styles.btnIcon}></ReportSvg>
            <Text style={styles.reportCount}>{reportCount}</Text>
          </>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [fileRecordList, setFileRecordList] = useState({
    gallbladder: 0,
    liver: 0,
    pancreas: 0,
    spleen: 0,
    stomach: 0,
  });
  const [activeItem, setActiveItem] = useState<object>({
    name: "",
    children: [],
  });
  const drawer = createRef<React.ElementRef<typeof Drawer>>();
  const patientDetails = useSelector(
    (state: RootState) => state.auth.patientDetails,
  );

  const onPressList = (bodyPart: string) => {
    const medicalFile = getMedicalRecordFileFromStore(bodyPart);
    const filteredData = getMedicalRecordFile(
      bodyPart.toLowerCase(),
      medicalFile,
    );
    setPopupVisible(false);
    NavigationService.push(PRIVATESCREENS.BIOVERSE_DETAIL_SCREEN, {
      records: filteredData,
      bodyPart: bodyPart,
    });
  };

  const getMedicalRecordFile = (bodyPart, medicalFiles) => {
    return medicalFiles.map((record) => {
      const filteredFiles = record.medical_record_file
        .filter((file) => {
          return file.file_metadata.some((meta) => {
            return meta.body_part === bodyPart;
          });
        })
        .map((file) => {
          const filteredMetadata = file.file_metadata.filter((meta) => {
            return meta.body_part === bodyPart;
          });
          return { ...file, file_metadata: filteredMetadata };
        });
      return { ...record, medical_record_file: filteredFiles };
    });
  };

  const getMedicalRecordFileFromStore = (body_part) => {
    const resultsArray = [];
    // Check if patientDetails has medical_record array
    if (!Array.isArray(patientDetails.medical_record)) {
      return null; // Return null if medical_record is not an array
    }
    // Loop through each medical record file of the patient
    for (const medicalRecordFile of patientDetails.medical_record) {
      // Check if the medical record file has file_metadata array
      if (Array.isArray(medicalRecordFile.medical_record_file)) {
        // Loop through each metadata of the medical record file
        for (const medicalRecord of medicalRecordFile.medical_record_file) {
          if (Array.isArray(medicalRecord.file_metadata)) {
            // Loop through each metadata of the medical record file
            for (const metadata of medicalRecord.file_metadata) {
              // Check if the metadata has a "body_part" field that contains "liver"
              if (metadata.body_part === body_part.toLowerCase()) {
                resultsArray.push(medicalRecordFile);
                return resultsArray; // Return the medical record file that has "liver" in its metadata
              }
            }
          }
        }
      }
    }

    // Return null if no medical record file has "liver" in its metadata
    return null;
  };

  const selectBodyParts = (item: React.SetStateAction<object>) => {
    setPopupVisible(true);
    setActiveItem(item);
    handlePress();
  };
  const [animation] = useState(new Animated.Value(0));
  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const patientId = useSelector((state: RootState) => state.auth.patientId);

  useEffect(() => {
    fetchAllMedicalRecord();
  }, []);

  const fetchAllMedicalRecord = async () => {
    const counts = {};
    const lowerBodyPart = [
      "liver",
      "pancreas",
      "stomach",
      "gallblader",
      "spleen",
    ]; //TODO: refactor this code to include all bodypart

    for (const bodyPart of lowerBodyPart) {
      counts[bodyPart] = 0;
    }

    // Loop through each medical record file and increment the count for each body part
    for (const record of patientDetails.medical_record) {
      for (const file of record.medical_record_file) {
        for (const metadata of file.file_metadata) {
          if (counts[metadata.body_part] !== undefined) {
            counts[metadata.body_part]++;
          }
        }
      }
    }
    setFileRecordList(counts);
  };

  // useEffect(() => {
  //   buttonList();
  // }, [fileRecordList]);

  const buttonList = [
    {
      name: t("YourBioverseScreen.name1"),
      classname: "buttonOne",
      reportCount: 4,
      children: [],
    },
    {
      name: t("YourBioverseScreen.name2"),
      classname: "buttonTwo",
      reportCount: 4,
      children: [],
    },
    {
      name: t("YourBioverseScreen.name3"),
      classname: "buttonThree",
      reportCount: 0,
      children: [
        {
          name: t("YourBioverseScreen.name7"),
          reportCount: 1,
        },
        {
          name: t("YourBioverseScreen.name8"),
          reportCount: 0,
        },
        {
          name: t("YourBioverseScreen.name9"),
          reportCount: 0,
        },
        {
          name: t("YourBioverseScreen.name10"),
          reportCount: 0,
        },
        {
          name: t("YourBioverseScreen.name11"),
          reportCount: 0,
        },
      ],
    },
    {
      name: t("YourBioverseScreen.name4"),
      classname: "buttonFour",
      reportCount: 0,
      children: [],
    },
    {
      name: t("YourBioverseScreen.name5"),
      classname: "buttonFive",
      reportCount: 0,
      children: [],
    },
    {
      name: t("YourBioverseScreen.name6"),
      classname: "buttonSix",
      reportCount: 0,
      children: [
        {
          name: t("YourBioverseScreen.name12"),
        },
        {
          name: t("YourBioverseScreen.name13"),
        },
        {
          name: t("YourBioverseScreen.name14"),
        },
        {
          name: t("YourBioverseScreen.name15"),
        },
        {
          name: t("YourBioverseScreen.name16"),
        },
        {
          name: t("YourBioverseScreen.name17"),
        },
        {
          name: t("YourBioverseScreen.name18"),
        },
        {
          name: t("YourBioverseScreen.name19"),
        },
        {
          name: t("YourBioverseScreen.name20"),
        },
        {
          name: t("YourBioverseScreen.name21"),
        },
        {
          name: t("YourBioverseScreen.name22"),
        },
      ],
    },
  ];

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        titleText={t("YourBioverseScreen.title")}
        subTitleText={t("YourBioverseScreen.subtitle")}
      ></Header>
      <View style={styles.bodyContainer}>
        {buttonList.map((item, index) => {
          return (
            <View key={item.name} style={styles[item.classname]}>
              <BodyButton
                buttonText={item.name}
                reportCount={item.reportCount}
                onPress={() => {
                  selectBodyParts(item);
                }}
              ></BodyButton>
            </View>
          );
        })}
        <View style={styles.bodySvg}>
          <MaleBodySvg height={460}></MaleBodySvg>
        </View>
      </View>
      {popupVisible && (
        <View style={styles.bodyDetailView}>
          {/* <Animated.Image
              source={require("../../assets/dashboard/body-detail-1x.png")}
              style={[styles.bodyDetailImage, { transform: [{ translateY }, { scale }] }]}
            /> */}
          <Image
            source={require("../../assets/dashboard/body-detail1.png")}
            style={styles.bodyDetailImage}
            resizeMode={"cover"}
          ></Image>
        </View>
      )}
      <Popup
        fileRecordList={fileRecordList}
        visible={popupVisible}
        title={activeItem.name}
        dataList={activeItem.children}
        onPressList={onPressList}
        onClose={() => {
          setPopupVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fafafa",
  },
  bodyContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    flex: 1,
    marginTop: 70,
  },
  bodySvg: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: 460,
    zIndex: -1,
  },
  bodyButton: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minWidth: 100,
    fontSize: 13,
    color: "#7BA040",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  buttonOne: {
    position: "absolute",
    top: "5%",
    right: "9%",
  },
  buttonTwo: {
    position: "absolute",
    top: "20%",
    left: "15%",
  },
  buttonThree: {
    position: "absolute",
    top: "31%",
    right: "11%",
  },
  buttonFour: {
    position: "absolute",
    top: "42%",
    left: "9%",
  },
  buttonFive: {
    position: "absolute",
    top: "62%",
    right: "19%",
  },
  buttonSix: {
    position: "absolute",
    top: "83%",
    right: "10%",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  btnIcon: {
    marginLeft: 15,
  },
  buttonText: {
    // fontFamily: 'Roboto',
    color: "#7BA040",
  },
  reportCount: {
    fontSize: 13,
    color: "#888B88",
    marginLeft: 6,
  },
  bodyDetailView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9,
    backgroundColor: "#fafafa",
  },
  bodyDetailImage: {
    width: "100%",
    height: "110%",
  },
});
