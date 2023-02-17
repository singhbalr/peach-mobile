import React, { useMemo, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
/**
 * ? Local Imports
 */
import createStyles from "./ProfileScreen.style";
// import Text from "@shared-components/text-wrapper/TextWrapper";
import { PRIVATESCREENS } from "@shared-constants";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/rx/reducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import PIbutton from "@shared-components/buttons/Pbutton";
interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Screen1");

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };
  const handleLogout = () => {
    dispatch(setLogout());
  };
  const handleItemPress = (OpportunityRecord: any) => {
    NavigationService.push(PRIVATESCREENS.OPPORTUNITY_RECORD, {
      OpportunityRecord,
    });
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Screen1 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <OpportunityCard />
        <OpportunityCard />
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
          <TouchableOpacity
            onPress={() => handleItemPress("Opportunity Record")}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7BA23F" }}>
              Read more
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
          <Text>shared until 2023-03-01 </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7BA23F" }}>
              Securely Shared
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
            Support colorectal screening to save lives{" "}
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
          </View>
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contribute Data</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 35,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#000000",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => handleTabPress("Screen1")}
          style={[
            borderStyle1(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Screen1" ? "bold" : "normal",
              color: activeTab === "Screen1" ? "#FFFFFF" : "#000000",
            }}
          >
            Opportunities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Screen2")}
          style={[
            borderStyle2(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Screen2" ? "bold" : "normal",
              color: activeTab === "Screen2" ? "#FFFFFF" : "#000000",
            }}
          >
            Shared Data
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "Screen1" ? <Screen1 /> : <Screen2 />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
