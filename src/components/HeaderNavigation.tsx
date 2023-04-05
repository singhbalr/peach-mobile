import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import * as NavigationService from "react-navigation-helpers";
import Icon from "react-native-dynamic-vector-icons";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { useTheme } from "@react-navigation/native";

interface HeaderNavigationProps {
  title: string;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = (props) => {
  const theme = useTheme();
  const { colors } = theme;

  const MenuButton = () => (
    <RNBounceable onPress={() => NavigationService.goBack()}>
      <Icon
        name="arrow-back"
        type="Ionicons"
        color={colors.iconBlack}
        size={30}
      />
    </RNBounceable>
  );

  return (
    <View style={styles.header}>
      <MenuButton />
      <Text
        style={{
          ...styles.headerText,
          textAlign: "center",
          flex: 1,
          marginRight: 20,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: ScreenWidth * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default HeaderNavigation;
