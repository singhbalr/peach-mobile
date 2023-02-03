import React from "react";
import { useTheme, TextInput, Button } from "react-native-paper";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
  View,
  Text,
} from "react-native";

type Props = {
  text: string;
  //   plain?: boolean;
  disabled?: boolean;
  //   isBlue?: boolean; // set TRUE to keep default style when disabled.
  //   size?: "large" | "medium" | "small";
  //   icon?: ImageSourcePropType;
  //   rightIcon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  //   textStyle?: TextStyle;
  //   btnRightIconStyle?: StyleProp<ImageStyle>;
  testID?: string;
  accessibilityLabel?: string;
  onPress?: () => void;
};

type ComponentType = React.FC<Props>;

const PIbutton: ComponentType = (props) => {
  const theme = useTheme();

  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="contained"
        onPress={props.onPress}
        buttonColor={componentTheme.buttonColor}
        textColor={componentTheme.textColor}
        contentStyle={styles.contentStyle}
        labelStyle={styles.textStyle}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  contentStyle: {
    // width: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
  textStyle: {
    textAlign: "center",
  },
  buttonContainer: {
    width: "65%",
    marginTop: 15,
  },
  buttonStyle: {
    borderRadius: 13,
  },
  buttonText: {
    fontSize: 16,
  },
});
const componentTheme = {
  buttonColor: "#373C38",
  textColor: "#FFFFFF",
};
export default PIbutton;
