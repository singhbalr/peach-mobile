import React from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { PRIVATESCREENS, PUBLICSCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
// ? Screens
import DetailScreen from "@screens/detail/DetailScreen";
// ? Routes
import PrivateRoutes from "./route.private";

const Stack = createStackNavigator();

//redux state checking for login

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import PublicRoutes from "./route.public";

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  React.useEffect((): any => {
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name={PRIVATESCREENS.ROOT}
              component={PrivateRoutes}
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
