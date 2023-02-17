import React, { useMemo, useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
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
  // eslint-disable-next-line react/no-unstable-nested-components
  const OpportunityCard = () => {
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
          <Text>expired in 2023-03-01 (48 days left) </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
            Support colorectal screening to save lives{" "}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#1C1C1C" }}>
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
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
                backgroundColor: "#7BA23F",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>2 dose</Text>
            </View>
            <View
              style={{
                backgroundColor: "#B5CAA0",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>Shingrix vaccine</Text>
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
              <Text style={{ color: "#FFFFFF" }}>100 HKD</Text>
            </View>
            <View
              style={{
                backgroundColor: "#B5CAA0",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>K11 Musea</Text>
            </View>
          </View>
        </View>
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
        <MenuButton></MenuButton>

        <Text style={styles.headerText}>Opportunity Record</Text>
      </View>
      <View>
        <OpportunityCard />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 17 }}>Quota : </Text>

        <LinePercentage
          percentage={80}
          color={"#000000"}
          width={150}
          height={10}
        />
        <Text style={{ fontWeight: "700", fontSize: 17 }}>10 Left </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 35,
          borderColor: "#000000",
          marginBottom: 30,
          width: ScreenWidth * 0.9,
        }}
      >
        <TouchableOpacity
          onPress={() => handleTabPress("Purpose")}
          style={[
            borderStyle1(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Purpose" ? "bold" : "normal",
              color: activeTab === "Purpose" ? "#FFFFFF" : "#000000",
            }}
          >
            Purpose
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Data")}
          style={[
            borderStyle2(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Data" ? "bold" : "normal",
              color: activeTab === "Data" ? "#FFFFFF" : "#000000",
            }}
          >
            Data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Receiver")}
          style={[
            borderStyle3(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Receiver" ? "bold" : "normal",
              color: activeTab === "Receiver" ? "#FFFFFF" : "#000000",
            }}
          >
            Receiver
          </Text>
        </TouchableOpacity>
      </View>
      {renderTab()}
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
            text={"Accept"}
            type={"primary"}
            onPress={handleItemPress}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <PIbutton text={"Close"} type={"secondary"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OpportunityRecordScreen;
