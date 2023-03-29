import React from "react";
import {Image, Platform, useColorScheme} from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
/**
 * ? Local & Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import { palette } from "@theme/themes";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import SearchScreen from "@screens/search/SearchScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
import MedicalRecordScreen from "@screens/medicalRecord/MedicalRecordScreen";
import YourBioverseScreen from "@screens/bioverse/YourBioverseScreen";
// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const PrivateRoutes = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

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
                ? require("../assets/navbar-icons/your-bioverse-focused.png")
                : require("../assets/navbar-icons/your-bioverse.png")
            }
            style={{
              width: 46,
              height: 28,
              // backgroundColor: focused ? "#7BA040" : "#c8c7c7",
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
              // backgroundColor: focused ? "#7BA040" : "#c8c7c7",
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
              // backgroundColor: focused ? "#7BA040" : "#c8c7c7",
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
              // backgroundColor: focused ? "#7BA040" : "#c8c7c7",
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
              // backgroundColor: focused ? "#7BA040" : "#7BA040",
            }}
          />
        );
    }
  };
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.background,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
            height: 83,
            paddingTop: 18,
            paddingBottom: Platform.OS === 'ios' ? 25 : 18,
            paddingHorizontal: Platform.OS === 'ios' ? 16 : 10,
          },
          tabBarIconStyle: {
            marginBottom: 10
          }
        })}
      >
        <Tab.Screen
          name={PRIVATESCREENS.DASHBOARD}
          component={YourBioverseScreen}
        />
        <Tab.Screen
          name={PRIVATESCREENS.CLINICAL_REPORT}
          component={SearchScreen}
        />
        <Tab.Screen
          name={PRIVATESCREENS.CONTRIBUTE_DATA}
          component={ProfileScreen}
        />
        <Tab.Screen
          name={PRIVATESCREENS.REWARD_CENTER}
          component={HomeScreen}
        />
      </Tab.Navigator>
    </>
  );
};
export default PrivateRoutes;
