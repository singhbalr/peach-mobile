import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/**
 * ? Local & Shared Imports
 */
import { PUBLICSCREENS } from "@shared-constants";
// ? Screens
import LoginScreen from "@screens/auth/LoginScreen";
import Onboarding from "@screens/onboarding/Onboarding";

// ? If you want to use stack or tab or both
const Stack = createStackNavigator();

const PublicRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#7ba23f" },
      }}
    >
      <Stack.Screen name={PUBLICSCREENS.ONBOARDING} component={Onboarding} />
      <Stack.Screen name={PUBLICSCREENS.LOGINSCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
export default PublicRoutes;
