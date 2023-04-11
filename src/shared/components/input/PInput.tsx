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
      underlineColorAndroid="#B5CAA0"
      onChangeText={props.onChangeText}
      style={props.style}
      contentStyle={{
        backgroundColor: "#B5CAA0",
        borderRadius: 10,
        borderWidth: 0,
        borderColor: "#7BA040",
      }}
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
    borderBottomWidth: 2,
    borderColor: "#B5CAA0",
  },
});
export default PInput;
