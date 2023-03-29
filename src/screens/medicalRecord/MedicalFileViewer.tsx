import React, { useMemo, useEffect } from "react";
import {View, ScrollView, Image, TouchableOpacity, Text, Dimensions} from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
/**
 * ? Local Imports
 */
import createStyles from "./MedicalRecordScreen.style";
import MedicalRecordDummy from "";
/**
 * ? Shared Imports
 */
import fonts from "@fonts";
import Pdf from "react-native-pdf";

interface MedicalFileViewerProps {
  navigation: any;
  route: any;
}

const MedicalFileViewer: React.FC<MedicalFileViewerProps> = (props) => {
  //   const theme = useTheme();
  //   const { colors } = theme;
  //   const styles = useMemo(() => createStyles(theme), [theme]);
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { fileObject } = props.route.params;
  const source = require("../../assets/pdf-sample/sample1.pdf");

  const MenuButton = () => (
    <RNBounceable>
      <Icon
        name="arrow-back"
        type="Ionicons"
        color={colors.iconBlack}
        size={30}
      />
    </RNBounceable>
  );

  useEffect(() => {
    console.log(fileObject);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: ScreenWidth * 0.9,
        }}
      >
        <View style={{ flex: 1 }}>
          <MenuButton />
        </View>
        <View style={{ flex: 5, flexDirection: "column", paddingBottom: 20 }}>
          <View>
            <Text style={{ fontSize: 18, color: "#1C1C1C", fontWeight: "600" }}>
              {fileObject.fileName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "flex-start",
            }}
          >
            <View>
              <View>
                <Text style={{ fontSize: 14, color: "#1C1C1C" }}>
                  {fileObject.fromData}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: "#1C1C1C" }}>
                  {fileObject.receivedFrom}
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#000000",
                  paddingVertical: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Text> {fileObject.type} </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{}}>
        {fileObject.fileType === "PDF" ? (
          <Pdf
            trustAllCerts={false}
            source={require("../../assets/pdf-sample/sample1.pdf")}
            onLoadComplete={(numberOfPages,filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        ) : (
          <Image
            style={{ width: ScreenWidth * 0.9 }}
            resizeMode={"stretch"}
            source={require("./../../assets/medical-record/MedicalRecordDummy.png")}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MedicalFileViewer;
