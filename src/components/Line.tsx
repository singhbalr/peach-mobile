import { StyleSheet, View } from "react-native";
import React from "react";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

const Line: React.FC = () => {
  return (
    <View
      style={{
        width: ScreenWidth * 0.85,
        borderBottomColor: "#BABCB7",
        borderBottomWidth: 1,
        marginVertical: 26,
      }}
    />
  );
};

export default Line;
