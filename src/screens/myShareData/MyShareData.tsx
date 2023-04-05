/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useTheme, useIsFocused } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import {} from "@react-navigation/native";
import StepIndicator from "react-native-step-indicator";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import Icon from "react-native-dynamic-vector-icons";
import { t } from "i18next";
/**
 * ? Local Imports
 */
import createStyles from "./MyShareData.style";
// import Text from "@shared-components/text-wrapper/TextWrapper";
import { PRIVATESCREENS } from "@shared-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import Notification from "@shared-components/notification/notification";
import { GET_SHARED_DATA } from "../../connection/mutation";
import { RootState } from "redux/store";
interface MyShareDataProps {}

const MyShareData: React.FC<MyShareDataProps> = () => {
  const theme = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const [activeTab, setActiveTab] = useState("Screen1");
  const [sharedData, setSharedData] = useState([]);
  const [getSharedData] = useMutation(GET_SHARED_DATA);
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  useEffect(() => {
    callSharedDataApi();
  }, []);

  const callSharedDataApi = async () => {
    const { data } = await getSharedData({
      variables: {
        input: {
          patient_id: patientId,
        },
      },
    });

    console.log(JSON.stringify(data));

    if (data) {
      setSharedData(data.getSharedDataByPatient);
    }
    console.log("sharedData");
    console.log(JSON.stringify(data.getSharedDataByPatient));
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
    const labels = [
      "Cart",
      "Delivery Address",
      "Order Summary",
      "Payment Method",
      "Track",
    ];

    const [currentPosition, setCurrentPosition] = useState(0);

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
                value.opportunity.opportunity_picture_banner && 
                { uri: value.opportunity.opportunity_picture_banner }}
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
                  fontWeight: "700",
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

          <View
            style={{
              backgroundColor: "#efefef",
              borderRadius: 15,
              padding: 20,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            {/* <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/contribute-data/info-icon.png")}
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
            Your name, phone number, date of birth and the first 4 digits of
            your Hong Kong Identity Card number.
          </Text>
        </View> */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../assets/contribute-data/clinical-record-icon.png")}
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
                {t("MyShareData.text1")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../assets/contribute-data/iot-icon.png")}
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
                {t("MyShareData.text2")}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                marginTop: 20,
                marginBottom: 5,
                marginLeft: 10,
                color: "#000",
              }}
            >
              {t("MyShareData.text3")}
            </Text>
            <Image
              source={require("../../assets/contribute-data/angle_up_icon.png")}
              style={{
                marginTop: 17,
                width: 30,
                height: 30,
                marginRight: 10,
              }}
            />
          </View>

          {/*Step Indicator */}

          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingHorizontal: 5,
              marginTop: 20,
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
                    <Text>{val.date}</Text>
                    <Text>{val.time}</Text>
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
    return (
      <View>
        <Text>Data Request</Text>
      </View>
    );
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
    // {
    //   screenName: "Screen2",
    //   title: "Data Request",
    // },
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
          marginBottom: 26,
        }}
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
                  color: activeTab === item.screenName ? "#7BA040" : "BABCB7",
                  fontSize: 13,
                  lineHeight: 20,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
