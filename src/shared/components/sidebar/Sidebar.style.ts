import {StyleSheet, ViewStyle} from "react-native";
import {ExtendedTheme} from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  contentView: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.secondaryBackground,
    },
    contentView: {
      marginTop: 60,
    },
  });
};
