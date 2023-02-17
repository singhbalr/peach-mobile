import React, { useMemo, useEffect } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
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
import MedicalCardItem from "./component/MedicalCardItem";
/**
 * ? Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { FlatList } from "react-native-gesture-handler";

interface MedicalRecordScreenProps {
  navigation: any;
  route: any;
}

const MedicalRecordScreen: React.FC<MedicalRecordScreenProps> = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { medicalReport, parts } = props.route.params;

  const handleItemPress = (medicalReport) => {
    NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
      medicalReport,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

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
    console.log(parts);
    console.log(medicalReport);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton></MenuButton>
        {/* <Text h1 color={colors.text}>
          {parts}
        </Text> */}
        <Text style={styles.headerText}>Clinical Records</Text>
      </View>
      <FlatList
        data={medicalReport}
        renderItem={({ item }) => (
          <MedicalCardItem
            fileName={item.fileName}
            fromData={item.fromData}
            receivedFrom={item.receivedFrom}
            fileObject={item}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MedicalRecordScreen;
