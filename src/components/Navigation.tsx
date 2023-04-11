import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as NavigationService from "react-navigation-helpers";
import ArrowLeftSvg from "../assets/dashboard/arrow-left.svg";

type Props = {
  titleText: string;
};
// props: [propsType: defaultValue] props introduce
// props.titleText: [String] header title
const Header: React.FC<Props> = (props: Props) => {
  const { titleText } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          NavigationService.goBack();
        }}
      >
        <ArrowLeftSvg></ArrowLeftSvg>
      </TouchableOpacity>
      <Text style={styles.title}>{titleText}</Text>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 35,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  icon: {
    position: "absolute",
    top: 2,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 60,
  },
  title: {
    // fontFamily: 'Titillium Web',
    fontSize: 14,
    color: "#606461",
    lineHeight: 21,
  },
});
