import React, { ReactNode, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";

const { height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  contentElement: ReactNode;
  onClose: () => void;
};

const Popup: React.FC<Props> = (props: Props) => {
  const { visible, contentElement, onClose } = props;

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <Modal animationType={"none"} transparent={true} visible={visible}>
      <Animated.View style={[styles.overlay, { opacity }]} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={() => {
            onClose();
          }}
        >
          <View style={styles.closeButton} />
        </TouchableOpacity>
        {contentElement}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  container: {
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

export default Popup;
