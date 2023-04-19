import React, { createRef, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * ? Local Imports
 */
import createStyles from "./MedicalRecordScreen.style";
import PrevSvg from "../../assets/icons/prev.svg";
import NextSvg from "../../assets/icons/next.svg";
import DownloadSvg from "../../assets/icons/download.svg";
/**
 * ? Shared Imports
 */
import Pdf from "react-native-pdf";
import Navigation from "components/Navigation";
import ButtonTabs from "components/ButtonTabs";

interface ClinicalFileViewerProps {
  navigation: any;
  route: any;
}

const ClinicalFileViewer: React.FC<ClinicalFileViewerProps> = (props) => {
  //   const theme = useTheme()
  //   const { colors } = theme
  //   const styles = useMemo(() => createStyles(theme), [theme])
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { route } = props;
  const { pageIndex, fileRecord, medicalRecord } = route.params;
  console.log(JSON.stringify(fileRecord));
  const activeTabsArray = [fileRecord.medical_record_file_type_id.file_type];

  const pdfRef = createRef<React.ElementRef<typeof Pdf>>();

  const [activeIndex, setActiveIndex] = useState<string>(activeTabsArray[0]);

  const [totalPage, setTotalPage] = useState<number>(0);
  const [mrFile, setMrFile] = useState({});

  const getMedicalRecordFileWithType = (file_type: string) => {
    const medicalRecordFiles = medicalRecord.medical_record_file;
    for (const file of medicalRecordFiles) {
      const fileType = file.medical_record_file_type_id.file_type;
      if (fileType === file_type) {
        return file;
      }
    }
    return null;
  };
  const title = medicalRecord.hospital_id
    ? `${medicalRecord.hospital_id.hospital_name}`
    : "";
  const clinicalData = getMedicalRecordFileWithType("CLINICAL_RECORD");
  const geneticData = getMedicalRecordFileWithType("GENETIC_DATA");
  const medicalImaging = getMedicalRecordFileWithType("MEDICAL_IMAGING");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const togglePage = (num: number) => {
    if (
      (currentPage === 1 && num === -1) ||
      (currentPage === totalPage && num === 1)
    ) {
      return false;
    }
    pdfRef.current && pdfRef.current.setPage(currentPage + num);
    setCurrentPage(currentPage + num);
  };

  const renderFile = () => {
    switch (activeIndex) {
      case "CLINICAL_RECORD":
        return (
          <View style={styles.contentContainer}>
            <View style={styles.contentContainer}>
              <Pdf
                ref={pdfRef}
                trustAllCerts={false}
                source={{
                  uri: clinicalData.medical_record_file_link,
                }}
                horizontal={true}
                enablePaging={true}
                onPageChanged={(page, numberOfPages) => {
                  setCurrentPage(page);
                  setTotalPage(numberOfPages);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
            </View>
            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={() => {
                  togglePage(-1);
                }}
              >
                <PrevSvg />
              </TouchableOpacity>
              <Text style={styles.currentPage}>
                {currentPage + "/" + totalPage}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  togglePage(1);
                }}
              >
                <NextSvg />
              </TouchableOpacity>
            </View>
          </View>
        );
      case "MEDICAL_IMAGING":
        return (
          <View style={styles.contentContainer}>
            <View style={styles.contentContainer}>
              <Pdf
                ref={pdfRef}
                trustAllCerts={false}
                source={{
                  uri: medicalImaging.medical_record_file_link,
                }}
                horizontal={true}
                enablePaging={true}
                onPageChanged={(page, numberOfPages) => {
                  setCurrentPage(page);
                  setTotalPage(numberOfPages);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
            </View>
            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={() => {
                  togglePage(-1);
                }}
              >
                <PrevSvg />
              </TouchableOpacity>
              <Text style={styles.currentPage}>
                {currentPage + "/" + totalPage}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  togglePage(1);
                }}
              >
                <NextSvg />
              </TouchableOpacity>
            </View>
          </View>
        );
      case "GENETIC_DATA":
        return (
          <View style={styles.contentContainer}>
            <View style={styles.contentContainer}>
              <Pdf
                ref={pdfRef}
                trustAllCerts={false}
                source={{
                  uri: geneticData.medical_record_file_link,
                }}
                horizontal={true}
                enablePaging={true}
                onPageChanged={(page, numberOfPages) => {
                  setCurrentPage(page);
                  setTotalPage(numberOfPages);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
            </View>
            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={() => {
                  togglePage(-1);
                }}
              >
                <PrevSvg />
              </TouchableOpacity>
              <Text style={styles.currentPage}>
                {currentPage + "/" + totalPage}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  togglePage(1);
                }}
              >
                <NextSvg />
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Navigation titleText={title} />
      <ButtonTabs
        activeIndex={activeIndex}
        setIndex={(index) => setActiveIndex(index)}
        buttonIndexs={activeTabsArray}
      />
      {renderFile()}
      <View style={styles.downloadView}>
        <DownloadSvg />
        <Text style={styles.downloadText}>Download</Text>
      </View>
    </SafeAreaView>
  );
};

export default ClinicalFileViewer;
