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
      //   underlineColor={props.isValid ? "#373C38" : "red"}
      //   activeUnderlineColor={props.isValid ? "#373C38" : "red"}
      //   outlineColor={props.isValid ? "#373C38" : "red"}
      //   activeOutlineColor={props.isValid ? "#373C38" : "red"}
      underlineStyle={styles.underlineStyle}
      mode={"flat"}
    />
  );
};
const styles = StyleSheet.create({
  underlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#373C38",
    alignItems: "center",
  },
});
export default PInput;
