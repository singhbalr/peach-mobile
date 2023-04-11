import React, { useMemo, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { t } from "i18next";
/**
 * ? Local Imports
 */
import createStyles from "./MyShareData.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import {
  GET_SHARED_DATA,
  GET_SHARED_DATA_BY_PATIENT,
} from "../../connection/mutation";
import { RootState } from "redux/store";
import {
  CasePrivacyPolice1,
  CasePrivacyPolice2,
  CasePrivacyPolice3,
  CasePrivacyPolice4,
  CasePrivacyPolice5,
} from "./../opportunities/privacyPoliceData";
import {
  formatUnixTimestamp,
  formatUnixTimestampSharedData,
  formatUnixTimestampTime,
} from "utils";

interface MyShareDataProps {}

const MyShareData: React.FC<MyShareDataProps> = (props) => {
  const { navigation, route } = props;
  const { screen } = route.params;
  const theme = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const [activeTab, setActiveTab] = useState(screen);
  const [sharedData, setSharedData] = useState([]);
  const [sharedDataByPatient, setSharedDataByPatient] = useState([]);
  const [getSharedData] = useMutation(GET_SHARED_DATA);
  const [getSharedDataByPatient] = useMutation(GET_SHARED_DATA_BY_PATIENT);
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  useEffect(() => {
    callSharedDataApi();
    callSharedDataByPatient();
  }, []);

  const dataSharPrivacyPolicy = (opportunity_type) => {
    switch (opportunity_type) {
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

  const callSharedDataApi = async () => {
    const { data } = await getSharedData({
      variables: {
        input: {
          patient_id: patientId,
        },
      },
    });

    // console.log(JSON.stringify(data));

    if (data) {
      setSharedData(data.getSharedDataByPatient);
    }
    // console.log("sharedData");
    // console.log(JSON.stringify(data.getSharedDataByPatient));
  };

  const callSharedDataByPatient = async () => {
    const { data } = await getSharedDataByPatient({
      variables: {
        input: {
          patient_id: patientId,
        },
      },
    });

    // console.log(JSON.stringify(data));

    if (data) {
      setSharedDataByPatient(data.getSharedDataByPatientDoctor);
    }
    // console.log('getSharedDataByPatientDoctor',JSON.stringify(data.getSharedDataByPatientDoctor));
  };

  const handleTabPress = async (tabName: string) => {
    setActiveTab(() => {
      const newCount = tabName;
      if (newCount === "Screen2") {
        // callGraphQlAPI();
      }
      return newCount;
    });
  };

  const Screen1 = () => {
    const data = [
      {
        label: (
          <Text style={{ color: "black" }}>
            {t("MyShareData.label1")}{" "}
            <Text style={{ fontWeight: "bold", color: "#7BA040" }}>
              {t("MyShareData.label1-1")}
            </Text>
          </Text>
        ),
        date: <Text style={{ color: "black" }}>01/03/2023</Text>,
        time: <Text style={{ color: "black" }}>10:30am</Text>,
      },
      {
        label: t("MyShareData.label2"),
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: t("MyShareData.label3"),
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: t("MyShareData.label4"),
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: t("MyShareData.label5"),
        date: "01/03/2023",
        time: "10:30am",
      },
    ];

    return sharedData.map((value, index) => {
      if (!value.opportunity) {
        return <></>;
      }
      return (
        <View
          style={{
            width: ScreenWidth * 0.9,
          }}
          key={index}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={
                value.opportunity &&
                value.opportunity.opportunity_picture_banner && {
                  uri: value.opportunity.opportunity_picture_banner,
                }
              }
              style={{
                width: 100,
                height: 80,
                marginTop: 30,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginTop: 20,
                  marginBottom: 5,
                  marginRight: 5,
                  color: "#000",
                }}
              >
                {value.opportunity.opportunity_name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 5,
                  color: "#7BA040",
                }}
              >
                {value.opportunity.organization.organization_name}
              </Text>
            </View>
          </View>

          {/*Center container */}
          {dataSharPrivacyPolicy(
            value.opportunity.opportunity_type_id.opportunity_type,
          ).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginTop: 10,
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
                  marginHorizontal: 5,
                  fontWeight: "400",
                  fontSize: 14,
                  lineHeight: 19,
                  color: "#606461",
                }}
              >
                {item.desc}
              </Text>
            </View>
          ))}

          {/*Step Indicator */}

          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingHorizontal: 5,
              marginTop: 20,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                padding: 10,
                paddingTop: 0,
                margin: 15,
                marginLeft: 1,
                backgroundColor: "#fff",
              }}
            >
              {data.map((val, i) => (
                <View style={{ flexDirection: "row" }} key={i}>
                  <View style={{ marginRight: 10 }}>
                    <Text>
                      {formatUnixTimestampSharedData(value.created_at)}
                    </Text>
                    <Text>{formatUnixTimestampTime(value.created_at)}</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor: "#7BA040",
                        borderRadius: 7.5,
                        marginHorizontal: 10,
                      }}
                    />
                    {i + 1 !== data.length && (
                      <View
                        style={{
                          width: 5,
                          height: 50,
                          backgroundColor: "#7BA040",
                        }}
                      />
                    )}
                  </View>
                  <Text style={{ maxWidth: 160, marginLeft: 10 }}>
                    {val.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    });
  };

  const Screen2 = () => {
    return sharedDataByPatient.map((value, index) => {
      if (!value.doctor) {
        return <></>;
      }
      return (
        <View
          style={{
            width: ScreenWidth * 0.9,
          }}
          key={index}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/icons/doctor.png")}
              style={{
                width: 65,
                height: 65,
                marginTop: 30,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  marginTop: 20,
                  marginBottom: 5,
                  marginLeft: 12,
                  color: "#000",
                }}
              >
                Data Request from {value.doctor.doctor_name}
              </Text>
            </View>
          </View>

          {/*Center container */}

          {/*  <View*/}
          {/*    style={{*/}
          {/*      backgroundColor: "#fafafa",*/}
          {/*      borderRadius: 15,*/}
          {/*      padding: 20,*/}
          {/*      marginBottom: 10,*/}
          {/*      marginTop: 20,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    /!* <View*/}
          {/*  style={{*/}
          {/*    flexDirection: "row",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Image*/}
          {/*    source={require("../../assets/contribute-data/info-icon.png")}*/}
          {/*    style={{*/}
          {/*      marginTop: 5,*/}
          {/*      width: 9,*/}
          {/*      height: 9,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      marginHorizontal: 10,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Your name, phone number, date of birth and the first 4 digits of*/}
          {/*    your Hong Kong Identity Card number.*/}
          {/*  </Text>*/}
          {/*</View> *!/*/}
          {/*    <View*/}
          {/*      style={{*/}
          {/*        flexDirection: "row",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <Image*/}
          {/*        source={require("../../assets/contribute-data/clinical-record-icon.png")}*/}
          {/*        style={{*/}
          {/*          marginTop: 5,*/}
          {/*          width: 9,*/}
          {/*          height: 9,*/}
          {/*        }}*/}
          {/*      />*/}
          {/*      <Text*/}
          {/*        style={{*/}
          {/*          marginHorizontal: 10,*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        {t("MyShareData.text1")}*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*    <View*/}
          {/*      style={{*/}
          {/*        flexDirection: "row",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <Image*/}
          {/*        source={require("../../assets/contribute-data/iot-icon.png")}*/}
          {/*        style={{*/}
          {/*          marginTop: 5,*/}
          {/*          width: 9,*/}
          {/*          height: 9,*/}
          {/*        }}*/}
          {/*      />*/}
          {/*      <Text*/}
          {/*        style={{*/}
          {/*          marginHorizontal: 10,*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        {t("MyShareData.text2")}*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*  </View>*/}

          {/*  <View*/}
          {/*    style={{*/}
          {/*      flex: 1,*/}
          {/*      flexDirection: "row",*/}
          {/*      justifyContent: "space-between",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        fontSize: 16,*/}
          {/*        fontWeight: "700",*/}
          {/*        marginTop: 20,*/}
          {/*        marginBottom: 5,*/}
          {/*        marginLeft: 10,*/}
          {/*        color: "#000",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {t("MyShareData.text3")}*/}
          {/*    </Text>*/}
          {/*    <Image*/}
          {/*      source={require("../../assets/contribute-data/angle_up_icon.png")}*/}
          {/*      style={{*/}
          {/*        marginTop: 17,*/}
          {/*        width: 30,*/}
          {/*        height: 30,*/}
          {/*        marginRight: 10,*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </View>*/}

          {/*  /!*Step Indicator *!/*/}

          {/*  <View*/}
          {/*    style={{*/}
          {/*      flex: 1,*/}
          {/*      backgroundColor: "#fff",*/}
          {/*      paddingHorizontal: 5,*/}
          {/*      marginTop: 20,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <View*/}
          {/*      style={{*/}
          {/*        padding: 10,*/}
          {/*        paddingTop: 0,*/}
          {/*        margin: 15,*/}
          {/*        marginLeft: 1,*/}
          {/*        backgroundColor: "#fff",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {data.map((val, i) => (*/}
          {/*        <View style={{ flexDirection: "row" }} key={i}>*/}
          {/*          <View style={{ marginRight: 10 }}>*/}
          {/*            <Text>{val.date}</Text>*/}
          {/*            <Text>{val.time}</Text>*/}
          {/*          </View>*/}
          {/*          <View style={{ alignItems: "center" }}>*/}
          {/*            <View*/}
          {/*              style={{*/}
          {/*                width: 15,*/}
          {/*                height: 15,*/}
          {/*                backgroundColor: "#7BA040",*/}
          {/*                borderRadius: 7.5,*/}
          {/*                marginHorizontal: 10,*/}
          {/*              }}*/}
          {/*            />*/}
          {/*            {i + 1 !== data.length && (*/}
          {/*              <View*/}
          {/*                style={{*/}
          {/*                  width: 5,*/}
          {/*                  height: 50,*/}
          {/*                  backgroundColor: "#7BA040",*/}
          {/*                }}*/}
          {/*              />*/}
          {/*            )}*/}
          {/*          </View>*/}
          {/*          <Text style={{ maxWidth: 160, marginLeft: 10 }}>*/}
          {/*            {val.label}*/}
          {/*          </Text>*/}
          {/*        </View>*/}
          {/*      ))}*/}
          {/*    </View>*/}
          {/*  </View>*/}
        </View>
      );
    });
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
      title: "Opportunities",
    },
    {
      screenName: "Screen2",
      title: "Data Request",
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
            <Text style={styles.headerText}>{t("MyShareData.text4")}</Text>
          </View>
          <Image
            source={require("../../assets/contribute-data/menu-add.png")}
            style={{
              width: 16,
              height: 16,
              marginLeft: 170,
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
        <ScrollView
          showHorizontalScrollIndicator={false}
          snapToAlignment="center"
        >
          {renderScreen(activeTab)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyShareData;
