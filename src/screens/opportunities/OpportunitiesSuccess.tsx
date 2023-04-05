import React, { useMemo, useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { t } from "i18next";
/**
 * ? Local Imports
 */
import createStyles from "./OpportunitiesRecord.style";
import PIbutton from "@shared-components/buttons/Pbutton";

/**
 * ? Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import fonts from "@fonts";
import { FlatList } from "react-native-gesture-handler";

interface OpportunitiesSuccessScreenProps {
  navigation: any;
  route: any;
}

const OpportunitiesSuccessScreen: React.FC<OpportunitiesSuccessScreenProps> = (
  props,
) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  //   const { medicalReport, parts } = props.route.params;
  const [activeTab, setActiveTab] = useState("Purpose");
  const handleItemPress = (OpportunitiesSuccess: any) => {
    NavigationService.push(PRIVATESCREENS.OPPORTUNITY_SUCCESS_SCREEN, {
      OpportunitiesSuccess,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 114, height: 114 }}
          resizeMode={"stretch"}
          source={require("./../../assets/medical-record/copysuccess_green.png")}
        />
        <Text style={{ fontSize: 27, fontWeight: "600", marginBottom: 20 }}>
          Successful
        </Text>
        <View style={{ marginBottom: 20, width: 300 }}>
          <Text
            style={{ fontSize: 17, fontWeight: "400", textAlign: "center" }}
          >
            {t("OpportunitiesSuccess.text1")}
          </Text>
        </View>
        <View style={{ marginBottom: 50 }}>
          <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#7BA23F",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>{t("OpportunitiesSuccess.text3")}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#B5CAA0",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>{t("OpportunitiesSuccess.text2")}</Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#7BA23F",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>{t("OpportunitiesSuccess.text3")}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#B5CAA0",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>{t("OpportunitiesSuccess.text2")}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <PIbutton
              text={"Go to Reward Center"}
              type={"secondary"}
              onPress={handleItemPress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OpportunitiesSuccessScreen;
