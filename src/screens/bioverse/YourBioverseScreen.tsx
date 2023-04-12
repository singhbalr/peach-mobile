import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import { PRIVATESCREENS } from "@shared-constants";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import MaleBodySvg from "../../assets/dashboard/male-body.svg";
import ThoraxBodySvg from "../../assets/dashboard/body-thorax.svg";
import UpperBodySvg from "../../assets/dashboard/body-upper.svg";
import ReportSvg from "../../assets/dashboard/report.svg";
import LiverSvg from "../../assets/dashboard/liver.svg";
import PancreasSvg from "../../assets/dashboard/pancreas.svg";
import StomachSvg from "../../assets/dashboard/stomach.svg";
import BloodSvg from "../../assets/dashboard/blood.svg";
import HeartSvg from "../../assets/dashboard/heart.svg";
import LungsSvg from "../../assets/dashboard/lungs.svg";
import SearchSvg from "../../assets/dashboard/search.svg";
import { t } from "i18next";
import BodyParts from "./components/BodyParts";
import Search from "./components/Search";

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
        <>
          {reportCount ?
            <>
              <ReportSvg style={styles.btnIcon}></ReportSvg>
              <Text style={styles.reportCount}>{reportCount}</Text>
            </>
            : <></>
          }
        </>
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
  const [activeItem, setActiveItem] = useState<{name: string, children: {name: string, icon: any, reportCount: number}[]}>({
    name: "",
    children: [{
      name: '',
      icon: '',
      reportCount: 0
    }]
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
  // animation
  const [activeBodySvg, setActiveBodySvg] = useState<string>('');
  const [animation] = useState(new Animated.Value(0));
  const [translateY, setTranslateY] = useState<any>(animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  }))
  const [scale, setScale] = useState<any>(animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  }))
  const [opacity, setOpacity] = useState<any>(animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  }))
  const [bodyContainerTranslateY, setBodyContainerTranslateY] = useState<any>(animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  }))
  const performAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  // body parts click event
  const selectBodyParts = (item: React.SetStateAction<object>) => {
    setActiveBodySvg(item.identifier)
    if (item.animation) {
      console.log(333, activeBodySvg)
      const topRange = [0, item.animation.top]
      const scaleRange = [1, item.animation.scale]
      setTranslateY(animation.interpolate({
        inputRange: [0, 1],
        outputRange: topRange,
      }))
      setScale(animation.interpolate({
        inputRange: [0, 1],
        outputRange: scaleRange,
      }))
      setOpacity(animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }))
      setBodyContainerTranslateY(animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      }))
    }
    setPopupVisible(true);
    setActiveItem(item);
    performAnimation();
  };
  // search
  const [searchPopupVisible, setSearchPopupVisible] = useState<boolean>(false)
  const handleClickSearch = () => {
    setSearchPopupVisible(true)
    setTranslateY(animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    }))
    setScale(animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    }))
    setOpacity(animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }))
    setBodyContainerTranslateY(animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -130],
    }))
    performAnimation()
  }


  useEffect(() => {
    fetchAllMedicalRecord();
    getRecordCountBySection();
  }, []);

  const fetchAllMedicalRecord = async () => {
    const counts = {};
    const lowerBodyPart = [
      //Head and neck
      "brainandskull",
      "cerebrospinalfluid",
      "ears",
      "esophagus",
      "hair",
      "mouth",
      "neck",
      "nose",
      "pharynx",
      "larynx",
      "trachea",
      "teethandgum",
      "throat",
      "thyroid",
      "eyes",

      //limbs
      "handsandarms",
      "legsandfeet",
      "muscles",
      "tendonandligament",

      //thorax
      "breasts",
      "heart",
      "lungs",
      "pleuralfluid",
      "ribs",

      //upperabdomen
      "gallbladder",
      "liver",
      "pancreas",
      "spleen",
      "stomach",

      //lowerabdomen
      "anus",
      "kidneys",
      "intestines",
      "ovary",
      "uterus",
      "cervix",
      "vagina",
      "penis",
      "placenta",
      "prostate",
      "rectum",
      "scrotumandtestes",
      "ureters",
      "urinary",
      "bladder",
      "urethra",
      "vulva",

      //unclassified
      "blood",
      "bones",
      "genetics",
      "glands",
      "joints",
      "lymph",
      "medication",
      "mental",
      "otherbodilyfluids",
      "semen",
      "skin",
      "spinalcord",
      "stool",
      "tissuessamples",
      "urine",
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
      headandneck: [
        "brainandskull",
        "cerebrospinalfluid",
        "ears",
        "esophagus",
        "hair",
        "mouth",
        "neck",
        "nose",
        "pharynx",
        "larynx",
        "trachea",
        "teethandgum",
        "throat",
        "thyroid",
        "eyes",
      ],
      thorax: ["breasts", "heart", "lungs", "pleuralfluid", "ribs"],
      upperabdomen: ["gallbladder", "liver", "pancreas", "spleen", "stomach"],
      lowerabdomen: [
        "anus",
        "kidneys",
        "intestines",
        "ovary",
        "uterus",
        "cervix",
        "vagina",
        "penis",
        "placenta",
        "prostate",
        "rectum",
        "scrotumandtestes",
        "ureters",
        "urinary",
        "bladder",
        "urethra",
        "vulva",
      ],
      limbs: ["handsandarms", "legsandfeet", "muscles", "tendonandligament"],
      other: [
        "blood",
        "bones",
        "genetics",
        "glands",
        "joints",
        "lymph",
        "medication",
        "mental",
        "otherbodilyfluids",
        "semen",
        "skin",
        "spinalcord",
        "stool",
        "tissuessamples",
        "urine",
      ],
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
    console.log({counts});
    setSectionCount(counts);
  };

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
      identifier: "thorax",
      reportCount: sectionCount["thorax"],
      animation: {
        top: 25,
        scale: 2.4
      },
      svg: <ThoraxBodySvg />,
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
    },
    {
      name: t("YourBioverseScreen.name3"),
      classname: "buttonThree",
      identifier: "upperabdomen",
      reportCount: sectionCount["upperabdomen"],
      animation: {
        top: -70,
        scale: 2.4
      },
      svg: <UpperBodySvg />,
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

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity }}>
        <Header
          titleText={t("YourBioverseScreen.title")}
          subTitleText={t("YourBioverseScreen.subtitle")}
        ></Header>
      </Animated.View>
      <Animated.View style={[styles.bodyContainer, {transform: [{translateY: bodyContainerTranslateY}]}]}>
        {buttonList.map((item, index) => {
          return (
            <View key={item.name} style={[styles[item.classname], popupVisible ? {display: "none"} : {}]}>
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
        <Animated.View style={[styles.bodySvg, { transform: [{ translateY }, { scale }] }]}>
          <MaleBodySvg height={'100%'} style={popupVisible ? {display: "none"} : {}}></MaleBodySvg>
          {
            buttonList.map(svgItem => {
              if (svgItem.svg) {
                return (
                  <View style={svgItem.identifier !== activeBodySvg ? {display: "none"} : {}}>
                    {svgItem.svg}
                  </View>
                )
              }
              return <></>
            })
          }
        </Animated.View>
        {/* <TouchableOpacity style={styles.search} onPress={() => handleClickSearch()}>
          <SearchSvg></SearchSvg>
        </TouchableOpacity> */}
      </Animated.View>
      {/* body parts popup */}
      <Popup
        visible={popupVisible}
        contentElement={
          <BodyParts
            title={activeItem.name}
            dataList={activeItem.children}
            fileRecordList={fileRecordList}
            onPressList={() => onPressList}
          />
        }
        onClose={() => {
          setPopupVisible(false);
          setActiveBodySvg('')
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }}
      />
      {/* search popup */}
      <Popup
        visible={searchPopupVisible}
        contentElement={
          <Search
            buttonList={buttonList}
          />
        }
        onClose={() => {
          setSearchPopupVisible(false);
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
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
  search: {
    position: 'absolute',
    bottom: -5,
    left: 27,
  },
  bodySvg: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
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
