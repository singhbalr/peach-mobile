import React from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
/**
 * ? Local & Shared Imports
 */
import { PRIVATESCREENS, PUBLICSCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
// ? Screens
// import DetailScreen from "@screens/detail/DetailScreen";
import MedicalRecordScreen from "@screens/medicalRecord/MedicalRecordScreen";
import MedicalFileViewer from "@screens/medicalRecord/MedicalFileViewer";
import OpportunityRecordScreen from "@screens/opportunities/OpportunitiesRecord";
import OpportunitiesSuccess from "@screens/opportunities/OpportunitiesSuccess";
import MyShareData from "@screens/myShareData/MyShareData";
import BioverseDetailScreen from "@screens/bioverse/BioverseDetailScreen";
// ? Routes
import PrivateRoutes from "./route.private";

const Stack = createStackNavigator();

//redux state checking for login

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import PublicRoutes from "./route.public";
import RewardDetails from "@screens/home/RewardDetails";

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  React.useEffect((): any => {
    console.log("REACT NAVIGATION");
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "white" },
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name={PRIVATESCREENS.ROOT}
              component={PrivateRoutes}
            />
            <Stack.Screen
              name={PRIVATESCREENS.MEDICAL_RECORD}
              component={MedicalRecordScreen}
            />
            <Stack.Screen
              name={PRIVATESCREENS.MEDICAL_FILE_VIEWER}
              component={MedicalFileViewer}
            />
            <Stack.Screen
              name={PRIVATESCREENS.OPPORTUNITY_RECORD}
              component={OpportunityRecordScreen}
            />
            <Stack.Screen
              name={PRIVATESCREENS.OPPORTUNITY_SUCCESS_SCREEN}
              component={OpportunitiesSuccess}
            />
            <Stack.Screen
              name={PRIVATESCREENS.MY_SHARE_DATA}
              component={MyShareData}
            />
            <Stack.Screen
              name={PRIVATESCREENS.BIOVERSE_DETAIL_SCREEN}
              component={BioverseDetailScreen}
            />
            <Stack.Screen
              name={PRIVATESCREENS.AVAILABLE_REWARD_DETAIL_SCREEN}
              component={RewardDetails}
            />
          </>
        ) : (
          <Stack.Screen name={PUBLICSCREENS.ROOT} component={PublicRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
