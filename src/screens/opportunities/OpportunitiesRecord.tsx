import React, { useMemo, useEffect, useState } from "react";
import {View, ScrollView, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
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

interface OpportunityRecordScreenProps {
  navigation: any;
  route: any;
}

const OpportunityRecordScreen: React.FC<OpportunityRecordScreenProps> = (
  props,
) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { medicalReport, parts } = props.route.params;
  const [activeTab, setActiveTab] = useState("Purpose");
  const handleItemPress = () => {
    console.log("ACCEPTOPPRECORD");
    NavigationService.push(PRIVATESCREENS.OPPORTUNITY_SUCCESS_SCREEN);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */
  // eslint-disable-next-line react/no-unstable-nested-components
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

  const dataReceiver = [
    {
      title: "Data Purpose",
      content:
        "The Data Receiver is developing a new blood-based colorectal cancer detection test and intends to identity" +
        " not fewer than 500 high-risk individuals for mid or long term follow-up study",
    },
    {
      title: "Data Accessibility",
      content:
        "Access to your data will be terminated in 48 months after you have contributed your data.",
    },
    {
      title: "How do I withdraw?",
      content:
        "You can withdraw your data contribution only if you have not redeemed the rewards.",
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
            source={require("../../assets/contribute-data/sample-image-detail-1.png")}
            style={{
              width: 323,
              height: 184,
            }}
          />
          <View
            style={{
              backgroundColor: "#383D39",
              // borderRadius: 8,
              // paddingHorizontal: 10,
              paddingVertical: 4,
              position: "absolute",
              bottom: 9,
              // left: 7,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 11,
                fontWeight: "900",
              }}
            >
              10 Days left
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
            }}
          >
            Support colorectal screening to save lives{" "}
          </Text>
          <View
            style={{
              borderBottomColor: "#BABCB7",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 16,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "#383D39",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Data to be shared
          </Text>
          <Text
            style={{
              color: "#7BA040",
              fontSize: 13,
              fontWeight: "500",
            }}
          >
            Privacy Policy &gt;
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#efefef",
            borderRadius: 15,
            padding: 19,
            marginBottom: 20,
          }}
        >
          <View
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
          </View>
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
              The data stored in the informatics system of the Connected Clinics, Hospitals and Labs.
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
              The data stored in the informatics system of the Connected Wearable Devices.
            </Text>
          </View>
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
              Reward
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 22,
                color: "#606461",
                lineHeight: 21,
              }}
            >
              2 doses
            </Text>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 13,
                color: "#888B88",
                lineHeight: 21,
              }}
            >
              Shingrix Vaccine
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginLeft: 36,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 22,
                color: "#606461",
                lineHeight: 21,
              }}
            >
              HK$100
            </Text>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 13,
                color: "#888B88",
                lineHeight: 21,
              }}
            >
              K11 Musea cash coupon
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            marginBottom: 16,
          }}
        >
          <Text>
            You will be entitled to one coupon for two doses of the Shingrix Vaccine Free, and a HK$100 K11
            Musea cash coupon.
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
              fontSize: 18,
              marginBottom: 19,
              color: "#383D39",
            }}
          >
            More Information
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
            }}
          >
            Data Receiver
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#7BA040",
                marginBottom: 13,
                lineHeight: 19,
              }}
            >
              Prenetics Limited &gt;
            </Text>
          </TouchableOpacity>
        </View>

        {dataReceiver.map((item, key) => (
          <View key={"data-receiver-" + key}>
            <View
              style={{
                borderBottomColor: "#BABCB7",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 16,
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
                }}
              >
                {item.content}
              </Text>
            </View>
          </View>
        ))}
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
          intended use of your data :
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          The Data Receiver is developing a new blood-based colorectal cancer
          detection test and intends to identity not fewer than 500 high-risk
          individuals for mid or long term follow-up study
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
          Your following data will be shared if you accept :
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          -The raw sequence data of your germ-line genetic sequence.
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          - The data stored in the informatics system of the Connected Clinics,
          Hospitals and Labs.
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          - The data stored in the informatics system of the Connected Wearable
          Devices.
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "500" }}>
          The Data Receiver will not know your personal identity.
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          data accessible duration :
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          48 months after you have contributed your data.
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
          Prenetics
        </Text>

        <View>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Data Receiver : Prenetics Limited
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Prenetics&apos; mission is to bring health closer to people, by
            decentralizing health care, and focusing on the comprehensive
            testing capabilities covering prevention, diagnostics, and
            personalized care.
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Its company website is:{" "}
            <Text style={{ color: "#7BA23F" }}>https://www.prenetics.com</Text>
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton />
        <Text style={styles.headerText}>Colorectal Screening</Text>
      </View>
      <View
        style={{
          marginBottom: 26,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <OpportunityCard />
        </ScrollView>
      </View>
      <View>
        <Text>asd</Text>
      </View>
    </SafeAreaView>
  );
};

export default OpportunityRecordScreen;
