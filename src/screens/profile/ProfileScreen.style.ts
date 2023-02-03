import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
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
    input: {
      width: "100%",
      backgroundColor: "#FFFFFF",
    },
  });
};
