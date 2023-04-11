import React, { createRef } from "react";
import { Image, Platform, Dimensions, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Drawer from "react-native-drawer";
/**
 * ? Local & Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import { palette } from "@theme/themes";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import YourBioverseScreen from "@screens/bioverse/YourBioverseScreen";
import ClinicalReport from "@screens/clinicalReport/ClinicalReport";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSidebarState } from "redux/reducer";
const { width } = Dimensions.get("window");
// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const PrivateRoutes = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const drawer = createRef<React.ElementRef<typeof Drawer>>()
  const sidebarState = useSelector((state: RootState) => state.app.sidebarState)
  const dispatch = useDispatch()
  const clinicalBadge = undefined
  const contributionsBadge = undefined
  const rewardsBadge = undefined


  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    switch (route.name) {
      case PRIVATESCREENS.REWARD_CENTER:
        return (
          <Image
            source={
              focused
                ? require("../assets/navbar-icons/rewards-focused.png")
                : require("../assets/navbar-icons/rewards.png")
            }
            style={{
              width: 30,
              height: 30,
            }}
          />
        );

      case PRIVATESCREENS.CLINICAL_REPORT:
        return (
          <Image
            source={
              focused
                ? require("../assets/navbar-icons/clinical-report-focused.png")
                : require("../assets/navbar-icons/clinical-report.png")
            }
            style={{
              width: 20,
              height: 24,
            }}
          />
        );

      case PRIVATESCREENS.DASHBOARD:
        return (
          <Image
            source={
              focused
                ? require("../assets/navbar-icons/your-bioverse-focused.png")
                : require("../assets/navbar-icons/your-bioverse.png")
            }
            style={{
              width: 46,
              height: 28,
            }}
          />
        );

      case PRIVATESCREENS.CONTRIBUTE_DATA:
        return (
          <Image
            source={
              focused
                ? require("../assets/navbar-icons/contributions-focused.png")
                : require("../assets/navbar-icons/contributions.png")
            }
            style={{
              width: 24,
              height: 24,
            }}
          />
        );

      default:
        return (
          <Image
            source={require("../assets/navbar-icons/your-bioverse.png")}
            style={{
              width: 46,
              height: 28,
            }}
          />
        );
    }
  };
  return (
    <Drawer
      ref={drawer}
      open={sidebarState}
      type="overlay"
      content={<Sidebar />}
      openDrawerOffset={0.15 * width}
      tapToClose={true}
      side={"right"}
      onClose={() => {
        dispatch(setSidebarState(false));
      }}
      tweenHandler={(ratio) => ({
        mainOverlay: {
          opacity: ratio / 1.5,
          backgroundColor: "rgba(56, 61, 57, 1)",
        },
      })}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: "#7BA040",
          tabBarInactiveTintColor: "#888B88",
          tabBarStyle: {
            backgroundColor: palette.white,
            height: 83,
            paddingTop: 18,
            paddingBottom: Platform.OS === "ios" ? 25 : 18,
            paddingHorizontal: Platform.OS === "ios" ? 16 : 10,
          },
          tabBarIconStyle: {
            marginBottom: 10,
          },
          tabBarBadgeStyle: {
            top: -12,
            left: 6,
            color: '#fff',
            backgroundColor: '#F196A8'
          }
        })}
      > 
        <Tab.Screen
          name={PRIVATESCREENS.DASHBOARD}
          component={YourBioverseScreen}
        />
        <Tab.Screen
          name={PRIVATESCREENS.CLINICAL_REPORT}
          component={ClinicalReport}
          options={{
            tabBarBadge: clinicalBadge
          }}
        />
        <Tab.Screen
          name={PRIVATESCREENS.CONTRIBUTE_DATA}
          component={ProfileScreen}
          options={{
            tabBarBadge: contributionsBadge
          }}
        />
        <Tab.Screen
          name={PRIVATESCREENS.REWARD_CENTER}
          component={HomeScreen}
          options={{
            tabBarBadge: rewardsBadge
          }}
        />
      </Tab.Navigator>
    </Drawer>
  );
};
export default PrivateRoutes;
