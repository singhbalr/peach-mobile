import React, { useMemo, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
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
import Popup from "../../components/PopupContribute";

import createStyles from "./FollowupRequestRecord.style";
import PIbutton from "@shared-components/buttons/Pbutton";

/**
 * ? Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import countDaysLeft from "../../components/countDayLeft";

import {
  CasePrivacyPolice1,
  CasePrivacyPolice2,
  CasePrivacyPolice3,
  CasePrivacyPolice4,
  CasePrivacyPolice5,
} from "./privacyPoliceData";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION_ORGANIZATION } from "connection/mutation";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Button from "components/button";
import FollowupRequestRecord from "@screens/followupRequest/FollowupRequestRecord";

interface FollowupRequestRecordProps {
  navigation: any;
  route: any;
}

const FollowupRequestRecordScreen: React.FC<
  FollowupRequestRecordScreenProps
> = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { medicalReport, parts } = props.route.params;
  const [activeTab, setActiveTab] = useState("Purpose");
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createTransactionOrganizationMutation] = useMutation(
    CREATE_TRANSACTION_ORGANIZATION,
  );
  const patientId = useSelector((state: RootState) => state.auth.patientId);

  const detail: any = props.route.params.followupRequestData.opportunity;

  const isAppliedPatient = () => {
    // detail.applied_patient.map((item: any) => {
    //   if (item.patient._id == patientId) {
    //     return true;
    //   }
    // });
    // return false;
    const found = detail.applied_patient.find(
      (item: any) => item.patient._id == patientId,
    );
    return typeof found === "object" ? true : false;
  };

  console.log(isAppliedPatient(), "isAppliedPatient");

  const dataSharPrivacyPolicy = () => {
    switch (detail.opportunity_type_id.opportunity_type) {
      case "PRODUCT_DEVELOPMENT":
        return CasePrivacyPolice1;
      case "PROMOTION":
        return CasePrivacyPolice2;
      case "PHARMA_RWD":
        return CasePrivacyPolice3;
      case "INSURANCE":
        return CasePrivacyPolice4;
      default:
        return CasePrivacyPolice5;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */
  // eslint-disable-next-line react/no-unstable-nested-components
  const MenuButton = () => (
    <RNBounceable onPress={() => NavigationService.goBack()}>
      <Icon
        name="arrow-back"
        type="Ionicons"
        color={colors.iconBlack}
        size={30}
      />
    </RNBounceable>
  );

  const FollowUpRequestCard = (opportunity) => {
    return (
      <TouchableOpacity
      // onPress={() => handleFollowupPress(followupRequest)}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "#BABCB7",
            borderRadius: 20,
            backgroundColor: "#FAFAFA",
            width: ScreenWidth * 0.85,
            padding: 10,
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

  const dataReceiver = [
    {
      title: t("OpportunitiesRecord.data-title1"),
      content: t("OpportunitiesRecord.data-content1"),
    },
    {
      title: t("OpportunitiesRecord.data-title2"),
      content: t("OpportunitiesRecord.data-content2"),
    },
    {
      title: t("OpportunitiesRecord.data-title3"),
      content: t("OpportunitiesRecord.data-content3"),
    },
  ];

  // eslint-disable-next-line react/no-unstable-nested-components
  const OpportunityCard = () => {
    return (
      <View
        style={{
          width: ScreenWidth * 0.9,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Image
            source={{
              uri: detail.opportunity_picture_banner,
            }}
            style={{
              alignSelf: "stretch",
              marginLeft: 5,
              marginRight: 5,
              height: 184,
              borderRadius: 15,
            }}
          />
          <View
            style={{
              backgroundColor: "#383D39",
              borderRadius: 8,
              paddingHorizontal: 9,
              paddingVertical: 4,
              position: "absolute",
              bottom: 15,
              left: 16,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 11,
                fontWeight: "900",
              }}
            >
              {/*{countDaysLeft(detail.opportunity_expiration)}{" "}*/}
              {t("OpportunitiesRecord.days-left")}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 16,
              color: "#383D39",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {detail.opportunity_name}
          </Text>
          <View
            style={{
              borderBottomColor: "#BABCB7",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              color: "#383D39",
              fontSize: 16,
              fontWeight: "600",
              marginLeft: 7,
            }}
          >
            {t("OpportunitiesRecord.data-shared")}
          </Text>
          <Text
            style={{
              color: "#7BA040",
              fontSize: 13,
              fontWeight: "500",
              marginRight: 10,
            }}
          >
            {t("OpportunitiesRecord.privacy-policy")} &gt;
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fafafa",
            borderRadius: 15,
            padding: 19,
            marginBottom: 20,
          }}
        >
          {dataSharPrivacyPolicy().map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
              }}
            >
              {console.log(item.icon, "icon")}
              <Image
                source={item.icon}
                style={{
                  marginTop: 5,
                  width: 9,
                  height: 9,
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                }}
              >
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Image
            source={require("../../assets/contribute-data/reward-icon.png")}
            style={{
              width: 20,
              height: 20,
              alignItems: "center",
              marginLeft: 5,
            }}
          />
          <View
            style={{
              marginBottom: 0,
            }}
          >
            <Text
              style={{
                marginLeft: 10,
                lineHeight: 17,
                fontWeight: "600",
                fontSize: 18,
                alignItems: "center",
                color: "#D1AE6C",
                marginTop: 5,
              }}
            >
              {t("OpportunitiesRecord.reward")}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 10,
          }}
        >
          {detail.reward.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "column",
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#606461",
                  lineHeight: 21,
                }}
              >
                {item.reward_amount}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 13,
                  color: "#888B88",
                  lineHeight: 21,
                }}
              >
                {item.reward_type_description.reward_type_text}{" "}
                {item.reward_name}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "#383D39",
              marginLeft: 20,
              marginRight: 10,
            }}
          >
            You will be entitled to{" "}
            {detail.reward.map(
              (item: any) =>
                item.reward_amount +
                " " +
                item.reward_type_description.reward_type_text +
                " " +
                item.reward_name,
            )}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "#BABCB7",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 16,
          }}
        />
        <View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              marginBottom: 5,
              color: "#383D39",
              marginLeft: 10,
            }}
          >
            {t("OpportunitiesRecord.more-information")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#888B88",
              marginBottom: 13,
              marginLeft: 10,
            }}
          >
            {t("OpportunitiesRecord.data-receiver")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              NavigationService.push(PRIVATESCREENS.DATA_RECEIVER);
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#7BA040",
                marginBottom: 13,
                lineHeight: 19,
                marginRight: 10,
              }}
            >
              {t("OpportunitiesRecord.prenetics-limited")} &gt;
            </Text>
          </TouchableOpacity>
        </View>

        {dataReceiver.map((item, key) => (
          <View key={"data-receiver-" + key}>
            <View
              style={{
                borderBottomColor: "#BABCB7",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 15,
              }}
            />

            <View
              style={{
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  color: "#888B88",
                  marginBottom: 10,
                  marginLeft: 10,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  lineHeight: 19,
                  color: "#383D39",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                {item.content}
              </Text>
            </View>
          </View>
        ))}
        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#383D39",
              marginBottom: 15,
            }}
          >
            Related Opportunities
          </Text>
          <FollowUpRequestCard {...detail.related_opportunity} />
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        />
        {/*<View style={{ flexDirection: "row", justifyContent: "center" }}>*/}
        {/*  <Icon*/}
        {/*    name={"gift"}*/}
        {/*    type="AntDesign"*/}
        {/*    color={colors.iconBlack}*/}
        {/*    size={30}*/}
        {/*  />*/}
        {/*  /!* reward component *!/*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      borderRadius: 1,*/}
        {/*      flexDirection: "row",*/}
        {/*      alignItems: "center",*/}
        {/*      padding: 5,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        backgroundColor: "#7BA23F",*/}
        {/*        borderTopStartRadius: 5,*/}
        {/*        borderBottomStartRadius: 5,*/}
        {/*        padding: 5,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Text style={{ color: "#FFFFFF" }}>2 dose</Text>*/}
        {/*    </View>*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        backgroundColor: "#B5CAA0",*/}
        {/*        borderTopEndRadius: 5,*/}
        {/*        borderBottomEndRadius: 5,*/}
        {/*        padding: 5,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Text>Shingrix vaccine</Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      borderRadius: 1,*/}
        {/*      flexDirection: "row",*/}
        {/*      alignItems: "center",*/}
        {/*      padding: 5,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        backgroundColor: "#7BA23F",*/}
        {/*        borderTopStartRadius: 5,*/}
        {/*        borderBottomStartRadius: 5,*/}
        {/*        padding: 5,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Text style={{ color: "#FFFFFF" }}>100 HKD</Text>*/}
        {/*    </View>*/}
        {/*    <View*/}
        {/*      style={{*/}
        {/*        backgroundColor: "#B5CAA0",*/}
        {/*        borderTopEndRadius: 5,*/}
        {/*        borderBottomEndRadius: 5,*/}
        {/*        padding: 5,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <Text>K11 Musea</Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Purpose = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: ScreenWidth * 0.9,
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "500" }}>
          {t("OpportunitiesRecord.text1")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {t("OpportunitiesRecord.data-content1")}
        </Text>
      </View>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Data = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: ScreenWidth * 0.9,
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "500" }}>
          {t("OpportunitiesRecord.text2")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {t("OpportunitiesRecord.text3")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {t("OpportunitiesRecord.text4")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {t("OpportunitiesRecord.text5")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "500" }}>
          {t("OpportunitiesRecord.text6")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {t("OpportunitiesRecord.text7")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {t("OpportunitiesRecord.text8")}
        </Text>
      </View>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Receiver = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          width: ScreenWidth * 0.9,
        }}
      >
        <Text
          style={{
            fontSize: 38,
            color: "#7BA23F",
            fontWeight: "600",
            marginBottom: 30,
          }}
        >
          {t("OpportunitiesRecord.prenetics")}
        </Text>

        <View>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            {t("OpportunitiesRecord.data-receiver")} :{" "}
            {t("OpportunitiesRecord.prenetics-limited")}asd
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            {t("OpportunitiesRecord.text9")}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            {t("OpportunitiesRecord.text11")}{" "}
            <Text style={{ color: "#7BA23F" }}>
              {t("OpportunitiesRecord.text10")}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };
  const borderStyle1 = () => {
    if (activeTab === "Purpose") {
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
    if (activeTab === "Data") {
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
    if (activeTab === "Receiver") {
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

  const renderTab = () => {
    switch (activeTab) {
      case "Purpose":
        return <Purpose />;

      case "Data":
        return <Data />;

      case "Receiver":
        return <Receiver />;

      default:
        return <Purpose />;
    }
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const LinePercentage = ({ percentage, color, width, height }) => {
    const filledWidth = width * (percentage / 100);
    const unfilledWidth = width - filledWidth;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            backgroundColor: color,
            height: height,
            width: filledWidth,
            borderTopStartRadius: 6,
            borderBottomStartRadius: 6,
          }}
        />
        <View
          style={{
            backgroundColor: "lightgray",
            height: height,
            width: unfilledWidth,
            borderTopEndRadius: 6,
            borderBottomEndRadius: 6,
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    console.log(parts);
    console.log(medicalReport);
    console.log(patientId, "patientId");
  }, []);

  const handleContributeNow = async () => {
    setIsLoading(true);
    setPopupVisible(true);

    try {
      const { data } = await createTransactionOrganizationMutation({
        variables: {
          input: {
            transaction_type_id: "640a03b1c34e1f0ced078807",
            organization_id: detail.organization._id,
            transaction_is_closed: false,
            patient_id: patientId,
            opportunity_id: detail._id,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }

    // if (data.createTransactionOrganization) {
    // }

    setIsLoading(false);
    // console.log(data, "data");
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: "white",
      }}
    >
      <View style={styles.header}>
        <MenuButton />
        <Text
          style={{
            ...styles.headerText,
            textAlign: "center",
            flex: 1,
            marginRight: 20,
          }}
        >
          Colorectal Screening
        </Text>
      </View>
      <View>
        <ScrollView
          style={{
            paddingBottom: isAppliedPatient() ? 20 : 100,
            marginBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <OpportunityCard />
        </ScrollView>
        {isAppliedPatient() ? null : (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 130,
              width: Dimensions.get("window").width,
              backgroundColor: "white",
              paddingVertical: 14,
              paddingRight: 34,
            }}
          >
            <Button
              isLoading={isLoading}
              onPress={handleContributeNow}
              text="Contribute Now"
              bgColor="#7BA040"
              textColor="white"
            />
          </View>
        )}
      </View>
      <Popup
        visible={popupVisible}
        title={"Thank you for your contribution!"}
        element={
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                padding: 10,
                borderWidth: 0.75,
                marginTop: 25,
                borderRadius: 15,
                // flex: 1,
                borderColor: "#BABCB7",
                width: 350,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  position: "relative",
                }}
              >
                <Image
                  source={{
                    uri: detail.opportunity_picture_banner,
                  }}
                  style={{
                    height: 155,
                    width: 115,
                    borderRadius: 15,
                    marginRight: 15,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 9,
                    left: 7,
                    borderRadius: 8,
                    paddingVertical: 4,
                    paddingHorizontal: 9,
                    backgroundColor: "#383D39",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 9,
                      fontWeight: "900",
                    }}
                  >
                    {/*{countDaysLeft(detail.opportunity_expiration)}{" "}*/}
                    {t("OpportunitiesRecord.days-left")}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 100,
                  marginRight: 200,
                }}
              >
                <Text
                  style={{
                    width: 200,
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#383D39",
                  }}
                >
                  {detail.opportunity_name}
                </Text>
                <View
                  style={{
                    marginTop: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <Image
                    source={require("../../assets/contribute-data/reward-icon.png")}
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: "center",
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
                        fontWeight: "600",
                        fontSize: 18,
                        alignItems: "center",
                        color: "#D1AE6C",
                      }}
                    >
                      {t("OpportunitiesRecord.reward")}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: 300,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {detail.reward.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        width: 100,
                        // backgroundColor: "red",
                        display: "flex",
                        flexDirection: "column",
                        // marginRight: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 10,
                          color: "#606461",
                        }}
                      >
                        {item.reward_amount}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 13,
                          color: "#888B88",
                        }}
                      >
                        {item.reward_type_description.reward_type_text}{" "}
                        {item.reward_name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/contribute-data/lock-icon.png")}
                style={{
                  width: 19,
                  height: 24,
                  marginRight: 20,
                  alignItems: "center",
                }}
              />
              <Text>
                {t("OpportunitiesRecord.text12")}{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {t("OpportunitiesRecord.text13")}
                </Text>
              </Text>
            </View>
            <Button
              isLoading={isLoading}
              onPress={() => {
                setPopupVisible(false);
                NavigationService.push(PRIVATESCREENS.MY_SHARE_DATA, {
                  screen: "Screen1",
                });
              }}
              text={t("OpportunitiesRecord.text14")}
              bgColor="#7BA040"
              textColor="white"
            />
          </View>
        }
        onPressList={() => {}}
        onClose={() => {
          setPopupVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default FollowupRequestRecordScreen;
