import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ProfileScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/rx/reducer";
import PIbutton from "@shared-components/buttons/Pbutton";
interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Contribute Data
      </Text>
      <PIbutton onPress={handleLogout} text="Logout" />
    </View>
  );
};

export default ProfileScreen;
