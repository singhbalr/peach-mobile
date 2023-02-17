import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, View, TextStyle } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
interface Style {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: "blue",
      padding: 15,
      width: "100%",
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    },
    header: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      lineHeight: 19,
    },
  });
};
