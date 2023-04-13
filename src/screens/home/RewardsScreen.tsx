/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import * as NavigationService from "react-navigation-helpers";
/**
 * ? Local Imports
 */
import createStyles from "./RewardsScreen.style";
import { GET_REWARDS_BY_PATIENT_ID } from "../../connection/mutation";
/**
 * ? Shared Imports
 */
import { Button } from "react-native-paper";
import { RootState } from "redux/store";
import { PRIVATESCREENS } from "@shared-constants";
import moment from "moment";
import { toggleRewardNotificationState } from "redux/reducer";
import Header from "components/Header";
import { t } from "i18next";
import countDaysLeft from "components/countDayLeft";

interface RewardsScreenProps {}

interface RewardProps {
  title: string;
  detail: string;
}

interface AvailableDataProps {
  img: any;
  daysLeft: string;
  title: string;
  reward?: undefined | RewardProps[];
  additionalRewards?: undefined | RewardProps[];
}

const RewardsScreen: React.FC<RewardsScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const screenSize = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };
  const [activeTab, setActiveTab] = useState("Screen1");
  const [rewardList, setRewardList] = useState([]);

  const [getRewards] = useMutation(GET_REWARDS_BY_PATIENT_ID);
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  const dispatch = useDispatch();
  useEffect(() => {
    loadRewards();
    dispatch(toggleRewardNotificationState(false));
  }, []);

  const loadRewards = async () => {
    const { data } = await getRewards({
      variables: {
        reward: {
          is_redeemed: activeTab === "Screen1" ? false : true,
          patient_id: patientId,
        },
      },
    });
    setRewardList(data.getPatientReward);
  };
  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const handleTabPress = async (tabName: string) => {
    setActiveTab(() => {
      return tabName;
    });
    await loadRewards();
  };

  const calculateDateDiff = (date: moment.MomentInput) => {
    const now = moment();
    const event = moment(date, "x");

    return event.diff(now, "days");
  };

  const renderRewardList = () => {
    return rewardList?.map((item, key) => {
      if (item.opportunity) {
        return (
          <AvailableCard key={`opportunity-card-${key}`} patientReward={item} />
        );
      } else {
        return <></>;
      }
    });
  };

  const handleItemPress = (Reward: any) => {
    NavigationService.push(PRIVATESCREENS.AVAILABLE_REWARD_DETAIL_SCREEN, {
      Reward,
    });
  };

  const AvailableCard = (props: any) => {
    const { patientReward } = props;

    return (
      <TouchableOpacity onPress={() => handleItemPress(patientReward)}>
        <View
          style={{
            width: "100%",
            borderRadius: 15,
            backgroundColor: "#ffffff",
            padding: 10,
            marginBottom: 18,
            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Image
                source={{
                  uri: patientReward.opportunity.opportunity_picture_banner,
                }}
                style={{
                  flex: 1,
                  width: 115,
                  height: 155,
                  borderRadius: 15,
                }}
              />
              <View
                style={{
                  backgroundColor: "#383D39",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  position: "absolute",
                  bottom: 9,
                  left: 7,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: "900",
                  }}
                >
                  {countDaysLeft(
                    patientReward.opportunity.opportunity_expiration,
                  )}{" "}
                  Days
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: 15,
                marginRight: 15,
                flex: 1,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  lineHeight: 20,
                  marginBottom: 15,
                  color: "#383D39",
                  marginTop: 10,
                }}
              >
                {patientReward.opportunity.opportunity_name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/*<Image
                  source={require("../../assets/contribute-data/reward-icon.png")}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />*/}
                {/*<View
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 4,
                      lineHeight: 17,
                      fontWeight: "700",
                      fontSize: 11,
                      alignItems: "center",
                      color: "#D1AE6C",
                    }}
                  >
                    {patientReward.opportunity.reward
                      ? "Reward"
                      : "Additional Reward"}
                  </Text>
                </View>*/}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {patientReward.opportunity.reward?.map((item, key) => (
                  <View
                    key={`reward-item-${key}`}
                    style={{
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 14,
                        color: "#606461",
                        lineHeight: 21,
                      }}
                    >
                      {item.reward_name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 10,
                        color: "#888B88",
                        marginRight: 5,
                      }}
                    >
                      {item.reward_amount}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Button
                  style={{
                    marginTop: 10,
                    backgroundColor: "#ECF1E8",
                    paddingHorizontal: 16,
                  }}
                >
                  <Text style={{ color: "#7BA040" }}>
                    {patientReward.is_redeemed === true ? "REDEEMED" : "REDEEM"}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const Screen1 = () => {
    const availableData: AvailableDataProps[] = [
      {
        img: require("../../assets/contribute-data/sample-image-list-1.png"),
        daysLeft: "10 Days left",
        title: "Support colorectal screening to save lives",
        reward: [
          {
            title: "2 doses",
            detail: "Shingrix Vaccine",
          },
          {
            title: "HK$100",
            detail: "K11 Musea cash coupon",
          },
        ],
      },
    ];

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: colors.secondaryBackground,
          height: "100%",
        }}
      >
        <ScrollView style={styles.rewardList}>{renderRewardList()}</ScrollView>
      </View>
    );
  };

  const Screen2 = () => {
    const availableData: AvailableDataProps[] = [
      {
        img: require("../../assets/contribute-data/sample-image-list-1.png"),
        daysLeft: "10 Days left",
        title: "Support colorectal screening to save lives",
        reward: [
          {
            title: "2 doses",
            detail: "Shingrix Vaccine",
          },
          {
            title: "HK$100",
            detail: "K11 Musea cash coupon",
          },
        ],
      },
    ];

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: colors.secondaryBackground,
        }}
      >
        <ScrollView style={styles.rewardList}>{renderRewardList()}</ScrollView>
      </View>
    );
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "Screen1":
        return <Screen1 />;
      case "Screen2":
        return <Screen2 />;
    }

    return false;
  };

  const tabList = [
    {
      screenName: "Screen1",
      title: "Available",
    },
    {
      screenName: "Screen2",
      title: "Used",
    },
    {
      screenName: "Screen3",
      title: "Other",
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        titleText={t("RewardsScreen.title")}
        isRewardsScreen={true}
      ></Header>
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          style={styles.tabScroll}
        >
          {tabList.map((item, key) => (
            <TouchableOpacity
              key={"navigation-tab-" + key}
              onPress={async () => handleTabPress(item.screenName)}
            >
              <View
                style={{
                  justifyContent: "center",
                  height: 40,
                  borderBottomWidth: 1.5,
                  borderBottomColor:
                    activeTab === item.screenName ? "#7BA040" : "transparent",
                  marginRight: 38,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color:
                      activeTab === item.screenName ? "#7BA040" : "#BABCB7",
                    fontSize: 13,
                    lineHeight: 20,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {renderScreen()}
    </View>
  );
};

export default RewardsScreen;
