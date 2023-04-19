import React, { FunctionComponent } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
  text: string;
  bgColor: string;
  textColor: string;
  onPress: () => void;
  isLoading?: boolean;
};

const Button: FunctionComponent<Props> = ({
  text,
  bgColor,
  textColor,
  onPress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      style={{
        alignSelf: "stretch",
        paddingVertical: 14,
        backgroundColor: bgColor,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: textColor,
          textAlign: "center",
        }}
      >
        {isLoading ? <ActivityIndicator color="white" /> : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
