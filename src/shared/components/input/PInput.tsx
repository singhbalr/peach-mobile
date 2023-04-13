import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
type Props = {
  onChangeText: (arg0: string) => void;
  secureTextEntry: boolean;
  value: string;
  style: StyleProp<ViewStyle>;
  label: string;
  isValid: boolean;
};
type ComponentType = React.FC<Props>;

const PInput: ComponentType = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <TextInput
      onChangeText={props.onChangeText}
      style={[props.style, { backgroundColor: "#7BA040" }]}
      contentStyle={{
        flex: 1,
        backgroundColor: "#B5CAA0",
        borderWidth: 0,
        borderColor: "#7BA040",
        borderRadius: 10,
      }}
      secureTextEntry={props.secureTextEntry}
      value={props.value}
      label={props.label}
      underlineStyle={styles.underlineStyle}
      underlineColor="transparent"
      mode={"flat"}
      outlineStyle={{
        borderColor: "transparent",
      }}
      // theme={{ ...theme, colors: { ...colors, primary: "transparent" } }}
    />
  );
};
const styles = StyleSheet.create({
  underlineStyle: {
    bottom: -6,
    borderBottomWidth: 3,
    borderColor: "#7BA040",
  },
});
export default PInput;
