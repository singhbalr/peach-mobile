import React from "react";
import { TextInput } from "react-native-paper";
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
  return (
    <TextInput
      onChangeText={props.onChangeText}
      style={props.style}
      contentStyle={{
        backgroundColor: "#B5CAA0",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#7BA040",
      }}
      secureTextEntry={props.secureTextEntry}
      value={props.value}
      label={props.label}
      underlineStyle={styles.underlineStyle}
      underlineColor="transparent"
      activeUnderlineColor="#7ba240"
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
