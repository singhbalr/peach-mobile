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

    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize: 30,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: "#fe7013",
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: "#fe7013",
      stepStrokeUnFinishedColor: "#aaaaaa",
      separatorFinishedColor: "#fe7013",
      separatorUnFinishedColor: "#aaaaaa",
      stepIndicatorFinishedColor: "#fe7013",
      stepIndicatorUnFinishedColor: "#ffffff",
      stepIndicatorCurrentColor: "#ffffff",
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: "#fe7013",
      stepIndicatorLabelFinishedColor: "#ffffff",
      stepIndicatorLabelUnFinishedColor: "#aaaaaa",
      labelColor: "#999999",
      labelSize: 13,
      currentStepLabelColor: "#fe7013",
    };

    const [currentPosition, setCurrentPosition] = useState(0);

    const data = [
      {
        label: "The data that you are contributing are being prepared",
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: "The prepared data is ready for sharing with requestor",
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: "Sharing now through safe communications channel",
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: "You can now track the usage of the contributed data",
        date: "01/03/2023",
        time: "10:30am",
      },
      {
        label: "Your reward is received",
        date: "01/03/2023",
        time: "10:30am",
      },
    ];

    return sharedData.map((value, index) => (
      <View
        style={{
          width: ScreenWidth * 0.9,
        }}
        key={index}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={value.opportunity.opportunity_picture_banner}
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
                color: "#383D39",
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
              The data stored in the informatics system of the Connected
              Clinics, Hospitals and Labs.
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
              The data stored in the informatics system of the Connected
              Wearable Devices.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 5,
              color: "#000",
            }}
          >
            My Progress
          </Text>
        </View>

        {/*Step Indicator */}

        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              padding: 10,
              paddingTop: 0,
              margin: 15,

              backgroundColor: "#fff",
            }}
          >
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              direction="vertical"
              renderLabel={({
                position,
                stepStatus,
                label,
                currentPosition,
              }) => {
                return (
                  <View
                    style={{
                      marginTop: 40,
                      padding: 10,
                      paddingLeft: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "black",
                      }}
                    >
                      {data[position].label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000",
                      }}
                    >
                      {data[position].date}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000",
                      }}
                    >
                      {data[position].time}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    ));
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
            <Text style={styles.headerText}>My Share Data</Text>
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
