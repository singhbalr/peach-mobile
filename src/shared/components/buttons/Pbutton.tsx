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
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
  onPress?: () => void;
  type?: "primary" | "secondary";
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
        textColor={
          props.type === "primary"
            ? componentTheme.textColorPrimary
            : componentTheme.textColorSecondary
        }
        contentStyle={styles.contentStyle}
        labelStyle={styles.textStyle}
        style={[
          {marginTop: 15},
          props.type === "primary"
            ? styles.buttonStylePrimary
            : styles.buttonStyleSecondary,
          props.style,
        ]}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: "center",
    alignSelf: "center",
  },
  textStyle: {
    textAlign: "center",
    justifyContent: "center",
    width: "72%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonStyleSecondary: {
    borderRadius: 5,
    backgroundColor: "#91AD70",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonStylePrimary: {
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    color: "#7BA23F",
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonText: {
    fontSize: 16,
  },
});
const componentTheme = {
  buttonColor: "#373C38",
  textColorPrimary: "#7BA23F",
  textColorSecondary: "#91AD70",
};
export default PIbutton;
