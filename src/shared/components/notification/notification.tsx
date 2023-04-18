import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNotificationInfo,
  toggleCtaModalNotificationState,
} from "redux/reducer";
import { RootState } from "redux/store";
import * as NavigationService from "react-navigation-helpers";
import { useMutation } from "@apollo/client";
import { APPROVE_DOCTOR_REQUEST } from "connection/mutation";
import Popup from "components/Popup";
import { t } from "i18next";
import Button from "components/button";
import { PRIVATESCREENS } from "@shared-constants";
const { height } = Dimensions.get("window");

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const notificationInfo = useSelector(
    (state: RootState) => state.app.notificationInfo,
  );
  const [approveRequest] = useMutation(APPROVE_DOCTOR_REQUEST);
  useEffect(() => {
    setShow(!!notificationInfo.message);
    console.log({ notificationInfo });
  }, [notificationInfo]);

  useEffect(() => {
    if (show === false) {
      dispatch(removeNotificationInfo());
    }
  }, [show]);

  if (!show) return false;

  return (
    <Modal animationType={"fade"} transparent={true} visible={show}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShow(false);
          dispatch(removeNotificationInfo());
        }}
      >
        <View style={styles.container}></View>
      </TouchableWithoutFeedback>
      <View style={styles.contentContainer}>
        {!!notificationInfo.iconSource && (
          <Image
            source={notificationInfo.iconSource}
            style={styles.icon}
          ></Image>
        )}
        <Text style={styles.message}>{notificationInfo.message}</Text>
        {!!notificationInfo.btnText && (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const data = await approveRequest(notificationInfo.payload);

              if (data) {
                console.log(JSON.stringify(data));
                setShow(false);
                // dispatch(removeNotificationInfo());
                setTimeout(() => {
                  dispatch(toggleCtaModalNotificationState(true));
                }, 500);
              }
              // setShow(false);
              // dispatch(removeNotificationInfo());
              // NavigationService.push(notificationInfo.navigationScreen, {});
            }}
          >
            <Text style={styles.btnText}>{notificationInfo.btnText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: height,
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
    bottom: 100,
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

export default Notification;
