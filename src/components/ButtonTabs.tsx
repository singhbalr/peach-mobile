import React from "react";
import { StyleSheet, View } from "react-native";
import GeneticSvg from "../assets/icons/genetic.svg";
import GeneticUnselectSvg from "../assets/icons/genetic-unselect.svg";
import MedicalSvg from "../assets/icons/medical.svg";
import MedicalUnselectSvg from "../assets/icons/medical-unselect.svg";
import ClinicalSvg from "../assets/icons/clinical.svg";
import ClinicalUnselectSvg from "../assets/icons/clinical-unselect.svg";
import IconButton from "./IconButton";

type Props = {
  activeIndex?: string;
  setIndex?: (index: number) => void;
  showAll?: boolean;
  buttonIndexs?: Array<string>;
};

const ButtonTabs: React.FC<Props> = (props: Props) => {
  const { activeIndex, setIndex, showAll, buttonIndexs } = props;
  const selectTab = (index: string) => {
    console.log(index["file_type"]);
    setIndex && setIndex(index["file_type"]);
  };
  const buttonList = [
    {
      title: "Genetic Data",
      file_type: "GENETIC_DATA",
      activeBgColor: "#edf1e9",
      activeTextColor: "#7BA040",
      icon: <GeneticSvg />,
      unselectIcon: <GeneticUnselectSvg />,
    },
    {
      title: "Medical Imaging",
      file_type: "MEDICAL_IMAGING",
      activeBgColor: "#eef2f3",
      activeTextColor: "#66A3AF",
      icon: <MedicalSvg />,
      unselectIcon: <MedicalUnselectSvg />,
    },
    {
      title: "Clinical Record",
      file_type: "CLINICAL_RECORD",
      activeBgColor: "#F8F1F2",
      activeTextColor: "#F596AA",
      icon: <ClinicalSvg />,
      unselectIcon: <ClinicalUnselectSvg />,
    },
  ];
  return (
    <View style={[styles.buttonTabs, showAll ? styles.showAllView : {}]}>
      {buttonList.map((item, index) => {
        if (
          buttonIndexs &&
          buttonIndexs.length > 0 &&
          !buttonIndexs.includes(item.file_type)
        ) {
          return <></>;
        }
        return (
          <View key={index} style={styles.btnView}>
            <IconButton
              buttonIcon={
                activeIndex === item.file_type || showAll
                  ? item.icon
                  : item.unselectIcon
              }
              buttonText={item.title}
              buttonStyle={{
                backgroundColor:
                  activeIndex === item.file_type || showAll
                    ? item.activeBgColor
                    : "#fff",
              }}
              buttonTextStyle={{
                color:
                  activeIndex === item.file_type || showAll
                    ? item.activeTextColor
                    : "#BABCB7",
              }}
              onPress={() => selectTab(buttonList[index])}
            />
          </View>
        );
      })}
    </View>
  );
};
export default ButtonTabs;

const styles = StyleSheet.create({
  buttonTabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 33,
    backgroundColor: "#fff",
  },
  showAllView: {
    flex: 1,
    paddingHorizontal: 0,
  },
  btnView: {
    marginRight: 6,
  },
});
