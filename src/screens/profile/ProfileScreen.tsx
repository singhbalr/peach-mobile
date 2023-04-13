import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { t } from "i18next";

/**
 * ? Local Imports
 */
import createStyles from "./ProfileScreen.style";
import { PRIVATESCREENS } from "@shared-constants";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../auth/rx/reducer";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import {
  useMutation,
  useQuery,
  useSubscription,
  useApolloClient,
} from "@apollo/client";
import {
  GET_DOCTOR_REQUEST,
  GET_FOLLOW_UP_REQUEST_BY_PATIENT_ID,
  GET_MEDICAL_RECORD_BY_BODY_PART,
  UPDATE_TRANSACTION_BY_TRANSACTION_TYPE_ID,
} from "../../connection/mutation";
import {
  TRANSACTION_UPDATED_SUBSCRIPTION,
  NEW_TRANSACTION,
} from "../../connection/subscription";
import {
  GET_ALL_OPPORTUNITY,
  GET_ALL_OPPORTUNITY_FILTERED,
} from "../../connection/query";
import moment from "moment";
import countDaysLeft from "../../components/countDayLeft";
import { RootState } from "../../redux/store";
import Header from "components/Header";
import {
  setNotificationInfo,
  toggleContributeNotificationState,
  toggleFollowupNotificationState,
} from "redux/reducer";

interface ProfileScreenProps {}

interface RewardProps {
  reward_name: string;
  detail: string;
  reward_amount: string;
}

interface OpportunityProps {
  _id: string;
  opportunity_picture_banner: string;
  img: any;
  opportunity_expiration: string;
  daysLeft: string;
  opportunity_name: string;
  opportunity_data_accesibility_duration: number;
  reward?: undefined | RewardProps[];
  additionalRewards?: undefined | RewardProps[];
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const client = useApolloClient();
  const [activeTab, setActiveTab] = useState("Screen1");
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  const followupNotificationState = useSelector(
    (state: RootState) => state.app.followupNotificationState,
  );

  const [getOpportunityData] = useMutation(
    patientId === "642e80d7acc6442859edb5e2"
      ? GET_ALL_OPPORTUNITY_FILTERED
      : GET_ALL_OPPORTUNITY,
  );
  const [opportunities, setOpportunities] = useState([]);
  const [followUpRequest, setFollowUpRequest] = useState([]);
  const [getFollowUpRequestByPatientId] = useMutation(
    GET_FOLLOW_UP_REQUEST_BY_PATIENT_ID,
  );
  const fetchFollowUpRequest = async () => {
    try {
      const { data } = await getFollowUpRequestByPatientId({
        variables: {
          input: {
            patient_id: patientId,
          },
        },
      });
      setFollowUpRequest(data.getFollowUpRequestByPatientId);
    } catch (err) {
      console.log("Failed to fetch followup request by patient id", err);
    }
  };
  const fethAllOpportunities = async () => {
    try {
      const { data } = await getOpportunityData();
      setOpportunities(data);
    } catch (err) {
      console.log("Failed to fetch followup request by patient id", err);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefreshScreen1 = async () => {
    setIsRefreshing(true);
    setOpportunities([]);
    fethAllOpportunities();
    setIsRefreshing(false);
  };

  const onRefreshScreen2 = async () => {
    setIsRefreshing(true);
    setOpportunities([]);
    fethAllOpportunities();
    setIsRefreshing(false);
  };

  useEffect(() => {
    switch (activeTab) {
      case "Screen1":
        onRefreshScreen1();
        break;
      case "Screen2":
        onRefreshScreen2();
        dispatch(toggleFollowupNotificationState(false));
        break;
    }
  }, [activeTab]);

  useEffect(() => {
    fethAllOpportunities();
    dispatch(toggleContributeNotificationState(false));
  }, []);

  const { _a, _b, _c } = useSubscription(TRANSACTION_UPDATED_SUBSCRIPTION, {
    onData: async ({ data }) => {
      console.log(data);
      // if (data) {
      //   const transactionTypeText =
      //     data.transactionUpdated.patient.transaction_id[0].transaction_type
      //       .transaction_type_text;
      //   if (transactionTypeText === "DOCTOR_REQUEST") {
      //     console.log("validated");
      //     setShowNotification(true);
      //     setTimeout(() => {
      //       setShowNotification(false);
      //     }, 5000);
      //     await callGraphQlAPI();
      //   }
      // }
    },
  });

  const handleTabPress = async (tabName: string) => {
    setActiveTab(() => {
      const newCount = tabName;
      return newCount;
    });
  };

  const handleItemPress = (OpportunityRecord: any) => {
    NavigationService.push(PRIVATESCREENS.OPPORTUNITY_RECORD, {
      OpportunityRecord,
    });

    console.log(OpportunityRecord, "OpportunityRecord");
  };
  const handleFollowupPress = (followupRequestData: any) => {
    NavigationService.push(PRIVATESCREENS.FOLLOWUP_REQUEST, {
      followupRequestData,
    });

    console.log(followupRequestData, "followupRequest");
  };
  const renderScrollView = () => {
    if (patientId === "642e80d7acc6442859edb5e2") {
      return opportunities?.opportunitiesFiltered?.map(
        (item: any, key: any) => {
          return <OpportunityCard key={`opportunity-card-${key}`} {...item} />;
        },
      );
    }

    return opportunities?.opportunities?.map((item: any, key: any) => {
      return <OpportunityCard key={`opportunity-card-${key}`} {...item} />;
    });
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Screen1 = () => {
    return (
      <View style={styles.tabContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshScreen1}
            />
          }
        >
          {renderScrollView()}
        </ScrollView>
      </View>
    );
  };
  const Screen2 = () => {
    return (
      <View style={styles.tabContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshScreen2}
            />
          }
        >
          {followUpRequest?.map((item: any, key: any) => (
            <FollowUpRequestCard
              key={`followup-request-card-${key}`}
              {...item}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderDoctorRequest = () => {
    return (
      // const {doctor_name, doctor_last_name, hospital_name, hospital_address, hospital_city, hospital_state, hospital_email} = props
      <FlatList
        data={doctorRequest}
        renderItem={({ item }) => (
          <DoctorCard
            transaction_id={item._id}
            doctor_name={item.doctor.doctor_name}
            doctor_last_name={item.doctor.doctor_last_name}
            hospital_name={item.doctor.hospital_id.hospital_name}
            hospital_address={item.doctor.hospital_id.hospital_address}
            hospital_city={item.doctor.hospital_id.hospital_city}
            hospital_state={item.doctor.hospital_id.hospital_state}
            hospital_email={item.doctor.hospital_id.hospital_email}
            transaction_type_text={item.transaction_type.transaction_type_text}
          />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const calculateDateDiff = (date: moment.MomentInput) => {
    const now = moment();
    const event = moment(date, "x");

    return event.diff(now, "days");
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const FollowUpRequestCard = (followupRequest) => {
    const { opportunity } = followupRequest;

    return (
      <TouchableOpacity onPress={() => handleFollowupPress(followupRequest)}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: "#fff",
            padding: 10,
            paddingRight: 20,
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
                source={{ uri: opportunity?.opportunity_picture_banner }}
                style={{
                  width: 115,
                  height: 155,
                  borderRadius: 15,
                  marginTop: 5,
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
                    color: "white",
                    fontSize: 11,
                    fontWeight: "900",
                  }}
                >
                  {countDaysLeft(opportunity.opportunity_expiration)} Days
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
                  fontWeight: "600",
                  marginTop: 10,
                  marginBottom: 20,
                  color: "#383D39",
                }}
              >
                {opportunity?.opportunity_name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/contribute-data/reward-icon.png")}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                <View
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
                    {opportunity?.reward ? "Reward" : "Additional Reward"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                {opportunity?.reward?.map((item, key) => (
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
                      {item.reward_type_description.reward_type ===
                      "CASH_COUPON"
                        ? "HK$"
                        : ""}
                      {item.reward_amount}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 10,
                        color: "#888B88",
                        marginRight: 5,
                      }}
                    >
                      {item.reward_name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const OpportunityCard = (opportunityData: OpportunityProps) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(opportunityData)}>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: "#fff",
            padding: 10,
            paddingRight: 20,
            marginBottom: 18,
            elevation: 1,
          }}
        >
          <View
            style={{
              // height: 155,
              // maxHeight: 200,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Image
                source={{ uri: opportunityData?.opportunity_picture_banner }}
                style={{
                  flex: 1,
                  width: 115,
                  borderRadius: 15,
                  marginTop: 5,
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
                    color: "white",
                    fontSize: 11,
                    fontWeight: "900",
                  }}
                >
                  {countDaysLeft(opportunityData.opportunity_expiration)} Days
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
                numberOfLines={2}
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 10,
                  marginBottom: 20,
                  color: "#383D39",
                }}
              >
                {opportunityData.opportunity_name}{" "}
                {opportunityData.opportunity_name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/contribute-data/reward-icon.png")}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                <View
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
                    {opportunityData.reward ? "Reward" : "Additional Reward"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                }}
              >
                {opportunityData.reward?.map((item, key) => (
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
                      {item.reward_type_description.reward_type ===
                      "CASH_COUPON"
                        ? "HK$"
                        : ""}
                      {item.reward_amount}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 10,
                        color: "#888B88",
                        marginRight: 5,
                      }}
                    >
                      {item.reward_name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const SharedDataCard = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#000000",
          width: ScreenWidth * 0.9,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>{t("ProfileScreen.text1")} </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7BA23F" }}>
              {t("ProfileScreen.text2")}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
            {t("ProfileScreen.text3")}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            name={"gift"}
            type="AntDesign"
            color={colors.iconBlack}
            size={30}
          />
          {/* reward component */}
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
                backgroundColor: "#696C69",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>
                {t("ProfileScreen.text4")}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>{t("ProfileScreen.text5")}</Text>
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
                backgroundColor: "#696C69",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>
                {t("ProfileScreen.text6")}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>{t("ProfileScreen.text7")}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // const DoctorCard = (props) => {
  //   const {
  //     transaction_id,
  //     doctor_name,
  //     doctor_last_name,
  //     hospital_name,
  //     hospital_address,
  //     hospital_city,
  //     hospital_state,
  //     hospital_email,
  //     transaction_type_text,
  //   } = props;
  //   return (
  //     <View
  //       style={{
  //         borderWidth: 1,
  //         borderRadius: 5,
  //         borderColor:
  //           transaction_type_text === "DOCTOR_REQUEST" ? "#000000" : "green",
  //         width: ScreenWidth * 0.9,
  //         padding: 15,
  //         marginBottom: 10,
  //       }}
  //     >
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           marginBottom: 15,
  //         }}
  //       >
  //         <Text>{hospital_email}</Text>
  //         <TouchableOpacity
  //           onPressIn={async () => await approveRequest(transaction_id)}
  //         >
  //           <Text
  //             style={{
  //               fontSize: 14,
  //               fontWeight: "500",
  //               color:
  //                 transaction_type_text === "DOCTOR_REQUEST"
  //                   ? "#7BA23F"
  //                   : "#000000",
  //             }}
  //           >
  //             {t("ProfileScreen.text8")}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: "column",
  //           justifyContent: "center",
  //           marginBottom: 15,
  //         }}
  //       >
  //         <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
  //           Dr. {doctor_name} {""} {doctor_last_name}
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: "column",
  //           justifyContent: "center",
  //           marginBottom: 15,
  //         }}
  //       >
  //         <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 5 }}>
  //           {hospital_name}
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: "column",
  //           justifyContent: "center",
  //           marginBottom: 15,
  //         }}
  //       >
  //         <Text style={{ fontSize: 14, marginBottom: 5 }}>
  //           {hospital_address} {", "} {hospital_city}
  //           {", "}
  //           {hospital_state}
  //         </Text>
  //       </View>

  //       <View style={{ flexDirection: "row", justifyContent: "center" }}></View>
  //     </View>
  //   );
  // };
  const borderStyle1 = () => {
    if (activeTab === "Screen1") {
      return {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000000",
        height: 35,
        justifyContent: "center",
        backgroundColor: "#7BA23F",
        color: "#FFFFFF",
      };
    }
  };

  const renderScreen = (activeTab: string) => {
    switch (activeTab) {
      case "Screen1":
        return <Screen1 />;
      case "Screen2":
        return <Screen2 />;
      default:
        return <Screen1 />;
    }
  };

  const tabList = [
    {
      screenName: "Screen1",
      title: t("ProfileScreen.tab-title1"),
    },
    {
      screenName: "Screen2",
      title: t("ProfileScreen.tab-title2"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        titleText="Contributions"
        subTitleText="Contribute Data Now to Get Rewards"
      />
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
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
                  borderBottomWidth: 2,
                  borderBottomColor:
                    activeTab === item.screenName ? "#7BA040" : "#BABCB7",
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
                {key === 1 ? (
                  <View
                    style={[
                      style.redDot,
                      { display: followupNotificationState ? "flex" : "none" },
                    ]}
                  ></View>
                ) : (
                  <></>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {renderScreen(activeTab)}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  redDot: {
    position: "absolute",
    top: 10,
    right: -10,
    width: 6,
    height: 6,
    backgroundColor: "#F196A8",
    borderRadius: 6,
  },
});
