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
      style={[props.style, {backgroundColor: '#7BA040'}]}
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
      underlineColor="#7BA040"
      mode={"flat"}
      outlineStyle={{
        borderColor: 'transparent',
      }}
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
