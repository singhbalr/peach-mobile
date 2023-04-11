import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import * as NavigationService from "react-navigation-helpers";
import Popup from "components/Popup";
import { t } from "i18next";
import Button from "components/button";
import { PRIVATESCREENS } from "@shared-constants";
import {
  removeNotificationInfo,
  toggleCtaModalNotificationState,
} from "redux/reducer";
const { height } = Dimensions.get("window");

const CtaModal: React.FC = () => {
  const dispatch = useDispatch();

  const notificationInfo = useSelector(
    (state: RootState) => state.app.notificationInfo,
  );
  const ctaModalNotificationState = useSelector(
    (state: RootState) => state.app.ctaModalNotificationState,
  );
  const [show, setShow] = useState(false);
  //   const [popupVisible, setPopupVisible] = useState<boolean>(false);
  useEffect(() => {
    setShow(!!ctaModalNotificationState);
    console.log("start ctaModalNotificationState");
    console.log({ ctaModalNotificationState });
    console.log("end ctaModalNotificationState");
  }, [ctaModalNotificationState]);

  if (!show) return false;

  return (
    <Popup
      visible={show}
      title={"Thank you for your contribution!"}
      contentElement={
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              padding: 10,
              // flex: 1,
              borderColor: "#BABCB7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: "relative",
              }}
            >
              <Image
                source={require("../../../assets/icons/doctor.png")}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 15,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  // width: 200,
                  fontWeight: "700",
                  fontSize: 22,
                  lineHeight: 28,
                  color: "#383D39",
                  textAlign: "center",
                }}
              >
                {"You have accepted the data request from Doctor Eddie Hui"}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/contribute-data/lock-icon.png")}
              style={{
                width: 19,
                height: 24,
                marginRight: 20,
                alignItems: "center",
              }}
            />
            <Text>
              {t("OpportunitiesRecord.text12")}{" "}
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {t("OpportunitiesRecord.text13")}
              </Text>
            </Text>
          </View>
          <Button
            onPress={() => {
              dispatch(removeNotificationInfo());
              dispatch(toggleCtaModalNotificationState(false));
              setShow(false);
              NavigationService.push(PRIVATESCREENS.MY_SHARE_DATA, {
                screen: "Screen2",
              });
            }}
            text={t("OpportunitiesRecord.text14")}
            bgColor="#7BA040"
            textColor="white"
          />
        </View>
      }
      onClose={() => {
        setShow(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 83,
    width: "100%",
    height: height - 83,
    backgroundColor: "rgba(0, 0, 0, .4)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    position: "absolute",
    bottom: 113,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 26,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  icon: {
    flexShrink: 0,
    width: 45,
    height: 45,
  },
  message: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 13,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    width: 80,
    height: 30,
    borderRadius: 45,
    backgroundColor: "#7BA23F",
  },
  btnText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CtaModal;
