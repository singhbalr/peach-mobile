import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/**
 * ? Local & Shared Imports
 */
import { PUBLICSCREENS } from "@shared-constants";
// ? Screens
import LoginScreen from "@screens/auth/LoginScreen";

// ? If you want to use stack or tab or both
const Stack = createStackNavigator();

const PublicRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PUBLICSCREENS.LOGINSCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
export default PublicRoutes;
