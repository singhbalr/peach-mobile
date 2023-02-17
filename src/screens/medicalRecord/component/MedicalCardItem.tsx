import React, { useMemo, useEffect } from "react";
import { View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
/**
 * ? Local Imports
 */

/**
 * ? Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
// import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";

interface MedicalCardItemProps {
  fileName: string;
  fromData: string;
  receivedFrom: string;
  fileObject: any;
}

const MedicalCardItem: React.FC<MedicalCardItemProps> = (props) => {
  //   const theme = useTheme();
  //   const { colors } = theme;
  //   const styles = useMemo(() => createStyles(theme), [theme]);
  const { fileName, fromData, receivedFrom, fileObject } = props;

  const onPressItem = (fileObject: any) => {
    NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
      fileObject,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        borderColor: "#000000",
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 5,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          borderColor: "#000000",
          borderRadius: 1,
          width: ScreenWidth * 0.9,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        onPress={() => onPressItem(fileObject)}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#1C1C1C",
            paddingBottom: 10,
            fontWeight: "600",
          }}
        >
          {fileName}
        </Text>
        <Text style={{ fontSize: 14, color: "#1C1C1C" }}>{fromData}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "#1C1C1C", fontWeight: "400" }}>
            {receivedFrom}
          </Text>
          <Text style={{ fontSize: 14, color: "#7BA23F" }}>See detail</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MedicalCardItem;
