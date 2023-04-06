import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import { PRIVATESCREENS } from "@shared-constants";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import MaleBodySvg from "../../assets/dashboard/male-body.svg";
import ReportSvg from "../../assets/dashboard/report.svg";
import LiverSvg from "../../assets/dashboard/liver.svg";
import PancreasSvg from "../../assets/dashboard/pancreas.svg";
import StomachSvg from "../../assets/dashboard/stomach.svg";
import BloodSvg from "../../assets/dashboard/blood.svg";
import HeartSvg from "../../assets/dashboard/heart.svg";
import LungsSvg from "../../assets/dashboard/lungs.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { t } from "i18next";
import BodyParts from "./components/BodyParts";

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
  const [sectionCount, setSectionCount] = useState({
    headandneck: 0,
    limbs: 0,
    lowerabdomen: 0,
    other: 0,
    thorax: 0,
    upperabdomen: 0,
  });
  const [activeItem, setActiveItem] = useState<object>({
    name: "",
    children: [],
  });
  const patientDetails = useSelector(
    (state: RootState) => state.auth.patientDetails,
  );

  const onPressList = (bodyPart: string) => {
    const medicalFile = getMedicalRecordFileFromStore(bodyPart);
    console.log(JSON.stringify(medicalFile));
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
                // return resultsArray; // Return the medical record file that has "liver" in its metadata
              }
            }
          }
        }
      }
    }

    // Return null if no medical record file has "liver" in its metadata
    return resultsArray;
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

  useEffect(() => {
    fetchAllMedicalRecord();
    getRecordCountBySection();
  }, []);

  const fetchAllMedicalRecord = async () => {
    const counts = {};
    const lowerBodyPart = [
      "liver",
      "pancreas",
      "stomach",
      "gallblader",
      "spleen",
      "blood",
      "lungs",
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

  const getRecordCountBySection = async () => {
    const bodyParts = {
      headandneck: ["liver", "pancreas", "stomach", "gallblader", "spleen"],
      thorax: ["lungs"],
      upperabdomen: ["liver", "pancreas", "stomach", "gallblader", "spleen"],
      lowerabdomen: ["liver", "pancreas", "stomach", "gallblader", "spleen"],
      limbs: ["liver", "pancreas", "stomach", "gallblader", "spleen"],
      other: ["liver", "pancreas", "stomach", "gallblader", "spleen"],
    };

    const counts = {};

    // Loop through each body part and initialize the count to 0
    for (const bodyPartSection in bodyParts) {
      const bodyPartList = bodyParts[bodyPartSection];
      counts[bodyPartSection] = 0;
      for (const bodyPart of bodyPartList) {
        counts[bodyPartSection] += 0;
      }
    }

    // Loop through each medical record file and increment the count for each body part section
    for (const record of patientDetails.medical_record) {
      for (const file of record.medical_record_file) {
        for (const metadata of file.file_metadata) {
          for (const bodyPartSection in bodyParts) {
            const bodyPartList = bodyParts[bodyPartSection];
            if (bodyPartList.includes(metadata.body_part)) {
              counts[bodyPartSection]++;
            }
          }
        }
      }
    }
    console.log(counts);
    setSectionCount(counts);
  };

  // useEffect(() => {
  //   buttonList();
  // }, [fileRecordList]);

  const buttonList = [
    {
      name: t("YourBioverseScreen.name1"),
      classname: "buttonOne",
      identifier: "headandneck",
      reportCount: sectionCount["headandneck"],
      children: [],
    },
    {
      name: t("YourBioverseScreen.name2"),
      classname: "buttonTwo",
      children: [
        {
          name: t("YourBioverseScreen.name23"),
          icon: <HeartSvg />,
        },
        {
          name: t("YourBioverseScreen.name24"),
          reportCount: 4,
          icon: <LungsSvg />,
        },
        {
          name: t("YourBioverseScreen.name25"),
          reportCount: 4,
        },
        {
          name: t("YourBioverseScreen.name26"),
        },
      ],
      identifier: "thorax",
      reportCount: sectionCount["thorax"],
    },
    {
      name: t("YourBioverseScreen.name3"),
      classname: "buttonThree",
      identifier: "upperabdomen",
      reportCount: sectionCount["upperabdomen"],
      children: [
        {
          name: t("YourBioverseScreen.name7"),
          reportCount: 0,
          icon: <LiverSvg />,
        },
        {
          name: t("YourBioverseScreen.name8"),
          reportCount: 0,
          icon: <PancreasSvg />,
        },
        {
          name: t("YourBioverseScreen.name9"),
          reportCount: 0,
          icon: <StomachSvg />,
        },
        {
          name: t("YourBioverseScreen.name10"),
          reportCount: 4,
        },
        {
          name: t("YourBioverseScreen.name11"),
          reportCount: 4,
        },
      ],
    },
    {
      name: t("YourBioverseScreen.name4"),
      classname: "buttonFour",
      identifier: "lowerabdomen",
      reportCount: sectionCount["lowerabdomen"],
      children: [],
    },
    {
      name: t("YourBioverseScreen.name5"),
      classname: "buttonFive",
      identifier: "limbs",
      reportCount: sectionCount["limbs"],
      children: [],
    },
    {
      name: t("YourBioverseScreen.name6"),
      classname: "buttonSix",
      identifier: "other",
      reportCount: sectionCount["other"],
      children: [
        {
          name: t("YourBioverseScreen.name12"),
          icon: <BloodSvg />,
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
          <MaleBodySvg height={580}></MaleBodySvg>
        </View>
      </View>
      {popupVisible && (
        <View style={styles.bodyDetailView}>
          {/* <Animated.Image
              source={require("../../assets/dashboard/body-detail-1x.png")}
              style={[styles.bodyDetailImage, { transform: [{ translateY }, { scale }] }]}
            /> */}
          <Image
            source={
              activeItem.classname === "buttonTwo"
                ? require("../../assets/dashboard/body-thorax.png")
                : activeItem.classname === "buttonThree"
                ? require("../../assets/dashboard/body-detail.png")
                : ""
            }
            style={styles.bodyDetailImage}
            resizeMode={"cover"}
          ></Image>
        </View>
      )}
      <Popup
        visible={popupVisible}
        contentElement={
          <BodyParts
            title={activeItem.name}
            dataList={activeItem.children}
            fileRecordList={fileRecordList}
            onPressList={onPressList}
          />
        }
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
    marginTop: 0,
  },
  bodySvg: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 40,
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
    shadowColor: "#7BA040",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonOne: {
    position: "absolute",
    top: "8%",
    right: "8%",
  },
  buttonTwo: {
    position: "absolute",
    top: "25%",
    left: "15%",
  },
  buttonThree: {
    position: "absolute",
    top: "34%",
    right: "9%",
  },
  buttonFour: {
    position: "absolute",
    top: "46%",
    left: "9%",
  },
  buttonFive: {
    position: "absolute",
    top: "66%",
    right: "19%",
  },
  buttonSix: {
    position: "absolute",
    top: "91%",
    right: "3%",
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
    top: 92,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9,
    backgroundColor: "#ffffff",
  },
  bodyDetailImage: {
    width: "100%",
    height: "130%",
  },
});
