import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";

const { height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  contentElement: ReactNode;
  onClose: () => void;
};

const Popup: React.FC<Props> = (props: Props) => {
  const { visible, contentElement, onClose } = props;
  return (
    <SwipeUpDownModal
      modalVisible={visible}
      HeaderStyle={{ marginTop: 0 }}
      MainContainerModal={{ backgroundColor: "transparent" }}
      onClose={() => {
        onClose();
      }}
      ContentModal={
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              onClose();
            }}
          >
            <View style={styles.closeButton} />
          </TouchableOpacity>
          {contentElement}
        </View>
      }
    />
    // <GestureRecognizer
    //   onSwipeDown={() => {
    //     onClose();
    //   }}
    // >
    //   <Modal animationType={"slide"} transparent={true} visible={visible}>
    //     <View style={styles.container}>
    //       <TouchableOpacity
    //         style={styles.closeButtonContainer}
    //         onPress={() => {
    //           onClose();
    //         }}
    //       >
    //         <View style={styles.closeButton} />
    //       </TouchableOpacity>
    //       {contentElement}
    //     </View>
    //   </Modal>
    // </GestureRecognizer>
  );
};
export default Popup;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxHeight: height - 70,
    minHeight: 400,
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 35,
    color: "#fff",
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -90,
    width: 250,
    height: 50,
  },
  closeButton: {
    position: "absolute",
    top: 11,
    width: 30,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#e6e6e6",
  },
});
