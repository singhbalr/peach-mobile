import { ExtendedTheme } from "@react-navigation/native";

import { ViewStyle, StyleSheet, View, TextStyle } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
interface Style {
  container: ViewStyle;
  mainContainer: View;
  tabContainer: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  headerInfo: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: "#fafafa",
    },
    mainContainer: {
      paddingHorizontal: 35,
    },
    tabContainer: {
      paddingTop: 26,
      paddingHorizontal: 35,
      marginBottom: 120,
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
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      lineHeight: 19,
      color: "#383D39",
      fontWeight: "700",
    },
    headerInfo: {
      fontSize: 13,
      lineHeight: 19,
      marginTop: 5,
      color: "#606461",
      fontWeight: "400",
    },
  });
};
