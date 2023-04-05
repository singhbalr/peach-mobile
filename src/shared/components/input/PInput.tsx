import React from "react";
import { useTheme, TextInput } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
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

  return (
    <TextInput
      onChangeText={props.onChangeText}
      style={props.style}
      secureTextEntry={props.secureTextEntry}
      value={props.value}
      label={props.label}
      underlineStyle={styles.underlineStyle}
      underlineColor="transparent"
      mode={"flat"}
    />
  );
};
const styles = StyleSheet.create({
  underlineStyle: {
    alignItems: "center",
    borderRadius: 15,
    color: "#606461",
    borderColor: "transparent",
  },
});
export default PInput;
