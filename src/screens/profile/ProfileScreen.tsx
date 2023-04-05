import React, { useMemo, useState, useEffect, createRef } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { useTheme, useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import Drawer from "react-native-drawer";
import { t } from "i18next";

/**
 * ? Local Imports
 */
import createStyles from "./ProfileScreen.style";
// import Text from "@shared-components/text-wrapper/TextWrapper";
import { PRIVATESCREENS } from "@shared-constants";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../auth/rx/reducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import PIbutton from "@shared-components/buttons/Pbutton";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
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
import Notification from "@shared-components/notification/notification";
import { GET_ALL_OPPORTUNITY } from "../../connection/query";
import moment from "moment";
import countDaysLeft from "../../components/countDayLeft";
import { RootState } from "../../redux/store";

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
  //TO BE REFACTOR
  const PATIENT_APPROVED_TRANSACTION_ID = "640a0a2284947b59273ea03d";
  const PATIENT_ID = "6409ffecd48bc34d50258d7c";
  //

  const isFocused = useIsFocused();
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Screen1");
  const [showNotification, setShowNotification] = useState(false);
  const [doctorRequest, setDoctorRequest] = useState([]);
  const [getDoctorRequest] = useMutation(GET_DOCTOR_REQUEST);
  const { loading, error, data } = useQuery(GET_ALL_OPPORTUNITY);
  const patientId = useSelector((state: RootState) => state.auth.patientId);
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

  useEffect(() => {
    switch (activeTab) {
      case "Screen3":
        fetchFollowUpRequest();
        break;
    }
  }, [activeTab]);

  const [updateTransaction] = useMutation(
    UPDATE_TRANSACTION_BY_TRANSACTION_TYPE_ID,
  );

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

  const { _aa, _bb, _cc } = useSubscription(NEW_TRANSACTION, {
    onData: async ({ data }) => {
      console.log(data.data.newTransaction);
      if (data) {
        const transactionTypeText =
          data.data.newTransaction.patient.transaction_id[0].transaction_type
            .transaction_type_text;
        if (transactionTypeText === "DOCTOR_REQUEST") {
          console.log("validated");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 5000);
          await callGraphQlAPI();
        }
      }
    },
  });

  const handleTabPress = async (tabName: string) => {
    setActiveTab(() => {
      const newCount = tabName;
      if (newCount === "Screen3") {
        callGraphQlAPI();
      }
      return newCount;
    });
  };
  const handleLogout = () => {
    dispatch(setLogout());
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

  const callGraphQlAPI = async () => {
    try {
      const { data } = await getDoctorRequest({
        variables: {
          input: {
            // eslint-disable-next-line camelcase
            patient_id: PATIENT_ID,
          },
        },
      });
      setDoctorRequest([]);
      setDoctorRequest(data.getTransactionByPatientId);
      return data;
    } catch (error) {
      throw new Error(`Could not fetch doctor list by id: ${error.message}`);
    }
  };

  const approveRequest = async (transaction_id: string) => {
    console.log(transaction_id);

    try {
      const { data } = await updateTransaction({
        variables: {
          updateTransactionId: transaction_id,
          input: {
            transaction_type_id: PATIENT_APPROVED_TRANSACTION_ID,
          },
        },
      });

      if (data) {
        await callGraphQlAPI();
      }
    } catch (error) {
      throw new Error(`Could not fetch doctor list by id: ${error.message}`);
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Screen1 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <ScrollView>
          {data?.opportunities?.map((item: any, key: any) => (
            <OpportunityCard key={`opportunity-card-${key}`} {...item} />
          ))}
          {/*{opportunityData.map((item, key) => (*/}
          {/*  <OpportunityCard key={`opportunity-card-${key}`} {...item} />*/}
          {/*))}*/}
        </ScrollView>
      </View>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Screen2 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <SharedDataCard />
      </View>
    );
  };

  const Screen3 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <ScrollView>
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
            backgroundColor: "#FAFAFA",
            width: ScreenWidth * 0.9,
            padding: 10,
            paddingTop: 0,
            margin: 10,
            marginRight: 50,
            paddingRight: 30,
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
                      HK${item.reward_amount}
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
            borderRadius: 20,
            backgroundColor: "#FAFAFA",
            width: ScreenWidth * 0.9,
            padding: 10,
            paddingTop: 0,
            margin: 10,
            marginRight: 50,
            paddingRight: 30,
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
                source={{ uri: opportunityData?.opportunity_picture_banner }}
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
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 10,
                  marginBottom: 20,
                  color: "#383D39",
                }}
              >
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
                  flex: 1,
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
                      HK${item.reward_amount}
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
  const DoctorCard = (props) => {
    const {
      transaction_id,
      doctor_name,
      doctor_last_name,
      hospital_name,
      hospital_address,
      hospital_city,
      hospital_state,
      hospital_email,
      transaction_type_text,
    } = props;
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor:
            transaction_type_text === "DOCTOR_REQUEST" ? "#000000" : "green",
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
          <Text>{hospital_email}</Text>
          <TouchableOpacity
            onPressIn={async () => await approveRequest(transaction_id)}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color:
                  transaction_type_text === "DOCTOR_REQUEST"
                    ? "#7BA23F"
                    : "#000000",
              }}
            >
              {t("ProfileScreen.text8")}
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
            Dr. {doctor_name} {""} {doctor_last_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 5 }}>
            {hospital_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            {hospital_address} {", "} {hospital_city}
            {", "}
            {hospital_state}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* <Icon
            name={"gift"}
            type="AntDesign"
            color={colors.iconBlack}
            size={30}
          /> */}
          {/* reward component */}
          {/* <View
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
              <Text style={{ color: "#FFFFFF" }}>2 dose</Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>Shingrix vaccine</Text>
            </View>
          </View> */}
          {/* <View
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
              <Text style={{ color: "#FFFFFF" }}>100 HKD</Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>K11 Musea</Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  };
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

  const borderStyle2 = () => {
    if (activeTab === "Screen2") {
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
  const borderStyle3 = () => {
    if (activeTab === "Screen3") {
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

      case "Screen3":
        return <Screen3 />;
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
      screenName: "Screen3",
      title: t("ProfileScreen.tab-title2"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={styles.headerText}>{t("ProfileScreen.title")}</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.headerInfo}>
                {t("ProfileScreen.subtitle")}
              </Text>
              <Image
                source={require("../../assets/contribute-data/question-mark-icon.png")}
                style={{
                  width: 14,
                  height: 14,
                  marginLeft: 4,
                  marginTop: 9,
                }}
              />
            </View>
          </View>
          <Image
            source={require("../../assets/contribute-data/menu-add.png")}
            style={{
              width: 16,
              height: 16,
              marginLeft: 50,
            }}
          />
          <Image
            source={require("../../assets/contribute-data/menu-icon.png")}
            style={{
              width: 16,
              height: 16,
              marginLeft: 30,
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginBottom: 5,
          // borderBottomWidth: 2,
          // borderBottomColor: "#BABCB7",
        }}
      >
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
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {renderScreen(activeTab)}
      <Notification
        message="A new doctor request has been received!"
        visible={showNotification}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
