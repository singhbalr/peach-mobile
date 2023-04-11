import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import InfoSvg from "../assets/dashboard/info.svg";
import MenuSvg from "../assets/dashboard/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setSidebarState, toggleNotificationIconState } from "redux/reducer";
import { PRIVATESCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
type Props = {
  titleText: string;
  subTitleText?: string;
};
// props: [propsType: defaultValue] props introduce
// props.titleText: [String] header title
// props.subTitleText: [String] header subtitle
const Header: React.FC<Props> = (props: Props) => {
  const { titleText, subTitleText } = props;
  const dispatch = useDispatch();
  const notificationIconState = useSelector(
    (state: RootState) => state.app.notificationIconState,
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{titleText}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.infoView}
            onPress={() => {
              NavigationService.push(PRIVATESCREENS.USEFUL_HEALTH_INFO, {});
            }}
          >
            <InfoSvg style={[styles.icon, styles.infoIcon]}></InfoSvg>
            <View
              style={[
                styles.redDot,
                { display: notificationIconState ? "flex" : "none" },
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setSidebarState(true));
            }}
          >
            <MenuSvg style={[styles.icon, styles.menuIcon]}></MenuSvg>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.subTitle}>{subTitleText}</Text>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 35,
    color: "#fff",
    backgroundColor: "#fafafa",
    // zIndex: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    // fontFamily: 'Titillium Web',
    fontSize: 22,
    fontWeight: "bold",
    color: "#383D39",
    lineHeight: 33,
    marginBottom: 3,
  },
  subTitle: {
    // fontFamily: 'Roboto',
    fontSize: 13,
    color: "#606461",
    lineHeight: 19,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  infoView: {
    width: 16,
    position: "relative",
    marginRight: 30,
  },
  redDot: {
    position: "absolute",
    top: 0,
    right: -10,
    width: 6,
    height: 6,
    backgroundColor: "#F196A8",
    borderRadius: 6,
  },
  icon: {
    color: "#ff5655",
  },
  infoIcon: {
    marginRight: 30,
  },
  menuIcon: {
    marginTop: 2,
  },
});
