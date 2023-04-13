import React, { createRef } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
/**
 * ? Local & Shared Imports
 */
import { PRIVATESCREENS, PUBLICSCREENS } from "@shared-constants";
import { LightTheme, DarkTheme } from "@theme/themes";
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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PublicRoutes from "./route.public";
import RewardDetails from "@screens/home/RewardDetails";
import ClinicalFileViewer from "@screens/medicalRecord/ClinicalFileViewer";
import DataReceiver from "@screens/dataReceiver/DataReceiver";
import FollowupRequestRecordScreen from "@screens/followupRequest/FollowupRequestRecord";
import HealehInfoDetail from "@screens/healthInfo/HealthInfoDetail";
import UsefulHealthInfo from "@screens/healthInfo/UsefulHealthInfo";
import Sidebar from "../components/Sidebar";
import { setSidebarState } from "../redux/reducer";
import Drawer from "react-native-drawer";

const { width } = Dimensions.get("window");
const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "light";
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  React.useEffect((): any => {
    console.log("REACT NAVIGATION");
    return () => (isReadyRef.current = false);
  }, []);
  const drawer = createRef<React.ElementRef<typeof Drawer>>();
  const sidebarState = useSelector(
    (state: RootState) => state.app.sidebarState,
  );
  const dispatch = useDispatch();

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
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
        theme={LightTheme}
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
                name={PRIVATESCREENS.CLINICAL_FILE_VIEWER}
                component={ClinicalFileViewer}
              />
              <Stack.Screen
                name={PRIVATESCREENS.OPPORTUNITY_RECORD}
                component={OpportunityRecordScreen}
              />
              <Stack.Screen
                name={PRIVATESCREENS.FOLLOWUP_REQUEST}
                component={FollowupRequestRecordScreen}
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
              <Stack.Screen
                name={PRIVATESCREENS.DATA_RECEIVER}
                component={DataReceiver}
              />
              <Stack.Screen
                name={PRIVATESCREENS.HEALTH_INFO_DETAIL}
                component={HealehInfoDetail}
              />
              <Stack.Screen
                name={PRIVATESCREENS.USEFUL_HEALTH_INFO}
                component={UsefulHealthInfo}
              />
            </>
          ) : (
            <Stack.Screen name={PUBLICSCREENS.ROOT} component={PublicRoutes} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Drawer>
  );
};

export default Navigation;
