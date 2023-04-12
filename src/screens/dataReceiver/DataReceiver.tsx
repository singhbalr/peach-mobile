import React, { useMemo } from "react";
import {Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import HeaderNavigation from "../../components/HeaderNavigation";
import { useTheme } from "@react-navigation/native";
import createStyles from "@screens/dataReceiver/DataReceiver.style";
import Line from "../../components/Line";
import { t } from "i18next";
import OpportunityCard from "@screens/opportunities/OpportunityCard";

const DataReceiver: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const opportunityData = [
    {
      _id: 1,
      opportunity_picture_banner: require("../../assets/contribute-data/sample-image-list-1.png"),
      opportunity_expiration: "1680325932000",
      opportunity_data_accesibility_duration: 1680325932000,
      opportunity_name: t("ProfileScreen.opportunity-title1"),
      reward: [
        {
          title: t("ProfileScreen.reward-title1"),
          detail: t("ProfileScreen.reward-detail1"),
        },
        {
          title: t("ProfileScreen.reward-title2"),
          detail: t("ProfileScreen.reward-detail2"),
        },
      ],
    },
    {
      _id: 1,
      opportunity_picture_banner: require("../../assets/contribute-data/sample-image-list-1.png"),
      opportunity_expiration: "1680325932000",
      opportunity_data_accesibility_duration: 1680325932000,
      opportunity_name: t("ProfileScreen.opportunity-title1"),
      reward: [
        {
          title: t("ProfileScreen.reward-title1"),
          detail: t("ProfileScreen.reward-detail1"),
        },
        {
          title: t("ProfileScreen.reward-title2"),
          detail: t("ProfileScreen.reward-detail2"),
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: "white",
      }}
    >
      <HeaderNavigation title="Prenetics Limited" />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingLeft: 33,
            paddingRight: 33,
          }}
        >
          <Image
            source={require("../../assets/data-receiver/prenetics-logo-full-color.png")}
            style={{
              width: 281,
              height: 61,
            }}
          />
          <Text
            style={{
              marginTop: 38,
              fontWeight: "400",
              fontSize: 13,
              color: "#1C1C1C",
            }}
          >
            {t("DataReceiver.Prenetics")}
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
            }}
            onPress={() => Linking.openURL("https://www.prenetics.com")}
          >
            <Text
              style={{
                marginTop: 15,
                fontWeight: "400",
                fontSize: 13,
                color: "#7BA23F",
              }}
            >
              {t("DataReceiver.link-prenetics")}
            </Text>
          </TouchableOpacity>

          <Line />

          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: "#383D39",
              alignSelf: "flex-start",
            }}
          >
            {t("DataReceiver.opportunity-prenetics")}
          </Text>

          {opportunityData.map((item, key) => (
            <OpportunityCard key={key} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DataReceiver;
