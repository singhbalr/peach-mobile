import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import InfoSvg from "../assets/dashboard/info.svg";
import MenuSvg from "../assets/dashboard/menu.svg";
import InfoWhiteSvg from "../assets/icons/info-white.svg";
import MenuWhiteSvg from "../assets/icons/menu-white.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setSidebarState } from "redux/reducer";
import { PRIVATESCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
type Props = {
  titleText: string;
  subTitleText?: string;
  isBackHome?: boolean;
  style?: ViewStyle;
  isRewardsScreen?: boolean;
};
import ArrowLeftSvg from "../assets/dashboard/arrow-left.svg";

// props: [propsType: defaultValue] props introduce
// props.titleText: [String] header title
// props.subTitleText: [String] header subtitle
const Header: React.FC<Props> = (props: Props) => {
  const { titleText, subTitleText, style, isRewardsScreen } = props;
  const dispatch = useDispatch();
  const notificationIconState = useSelector(
    (state: RootState) => state.app.notificationIconState,
  );

  return (
    <View style={[styles.container, false ? styles.rewardsHeader : {}]}>
      {isRewardsScreen && (
        <View style={styles.bg}>
          <View style={styles.bgOne}></View>
          <View style={styles.bgTwo}></View>
        </View>
      )}
      <View style={styles.topContainer}>
        {props.isBackHome ? (
          <TouchableOpacity
            style={{
              width: 40,
              height: 60,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onPress={() => {
              NavigationService.popToTop();
            }}
          >
            <ArrowLeftSvg></ArrowLeftSvg>
          </TouchableOpacity>
        ) : null}
        <Text
          style={[
            styles.title,
            { color: isRewardsScreen ? "#fff" : "#383D39" },
          ]}
        >
          {titleText}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.infoView, styles.headerBtn]}
            onPress={() => {
              // const route = useRoute();
              // const routeName = route.name;
              // console.log({routeName})
              NavigationService.push(PRIVATESCREENS.USEFUL_HEALTH_INFO, {});
            }}
          >
            {isRewardsScreen ? (
              <InfoWhiteSvg
                style={[styles.icon, styles.infoIcon]}
              ></InfoWhiteSvg>
            ) : (
              <InfoSvg style={[styles.icon, styles.infoIcon]}></InfoSvg>
            )}
            <View
              style={[
                styles.redDot,
                { display: notificationIconState ? "flex" : "none" },
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              dispatch(setSidebarState(true));
            }}
          >
            {isRewardsScreen ? (
              <MenuWhiteSvg
                style={[styles.icon, styles.menuIcon]}
              ></MenuWhiteSvg>
            ) : (
              <MenuSvg style={[styles.icon, styles.menuIcon]}></MenuSvg>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {subTitleText && <Text style={styles.subTitle}>{subTitleText}</Text>}
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "red",
    width: 40,
    height: 60,
  },
  container: {
    position: "relative",
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 35,
    color: "#fff",
    backgroundColor: "#fafafa",
  },
  rewardsHeader: {
    position: "relative",
    justifyContent: "flex-end",
    height: 120,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "TitilliumWeb-Bold",
    fontSize: 22,
    fontWeight: "bold",
    color: "#383D39",
    lineHeight: 33,
    marginBottom: 3,
  },
  subTitle: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#606461",
    lineHeight: 19,
  },
  buttonContainer: {
    flexDirection: "row",
    marginRight: -10,
  },
  infoView: {
    width: 16,
    position: "relative",
    marginRight: 30,
  },
  headerBtn: {
    padding: 10,
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
    padding: 10,
    marginRight: 30,
  },
  menuIcon: {
    marginTop: 2,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#7BA040",
  },
  bgOne: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(177, 197, 158, .5)",
  },
  bgTwo: {
    position: "absolute",
    top: -7940,
    right: -7000,
    width: 8090,
    height: 8000,
    borderRadius: 1000,
    backgroundColor: "#7BA040",
  },
});
