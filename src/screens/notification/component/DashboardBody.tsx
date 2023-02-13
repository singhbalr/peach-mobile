import React, { useMemo } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from "react-native";
import Body from "../../../assets/dashboard/body.svg";

interface DashboardBodyProps {
  showOverlay: boolean;
  onBodyPartsPress(arg0: string): any;
}

const DashboardBody: React.FC<DashboardBodyProps> = (props) => {
  const onPress = () => {
    console.log("Square 1");
  };

  const backgroundStyle = props.showOverlay
    ? styles.backgroundOverlay
    : styles.backgroundHidden;
  return (
    <View style={styles.container}>
      <View style={styles.squareContainer}>
        <Body width={220} height={600}></Body>
      </View>
      {/* head */}
      <View style={styles.headSection}>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("Head")}
        >
          <View style={[styles.head, backgroundStyle]}>
            {props.showOverlay ? <Text>Head</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Thorax with arms */}
      <View style={styles.thoraxWithArm}>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("LeftArm")}
        >
          <View style={[styles.thorax, backgroundStyle]}>
            {props.showOverlay ? <Text>Left Arm</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("Thorax")}
        >
          <View style={[styles.thorax, backgroundStyle]}>
            {props.showOverlay ? <Text>Thorax</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("RightArm")}
        >
          <View style={[styles.thorax, backgroundStyle]}>
            {props.showOverlay ? <Text>Right Arm</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Abdomen */}
      <View style={styles.thoraxWithArm}>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("LeftArm")}
        >
          <View style={[styles.arm, backgroundStyle]}>
            {props.showOverlay ? <Text>Left Arm</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("Abdomen")}
        >
          <View style={[styles.abdomen, backgroundStyle]}>
            {props.showOverlay ? <Text>Abdomen</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.onBodyPartsPress("RightArm")}
        >
          <View style={[styles.arm, backgroundStyle]}>
            {props.showOverlay ? <Text>Right Arm</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* leg */}
      <View style={styles.headSection}>
        <TouchableWithoutFeedback onPress={() => props.onBodyPartsPress("Leg")}>
          <View style={[styles.leg, backgroundStyle]}>
            {props.showOverlay ? <Text>leg</Text> : ""}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thoraxWithArm: {
    flexDirection: "row",
  },
  headSection: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
  },
  backgroundOverlay: {
    backgroundColor: "orange",
  },
  backgroundHidden: {
    backgroundColor: "transparent",
  },
  head: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  thorax: {
    width: 100,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  abdomen: {
    width: 100,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  leg: {
    width: 100,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  arm: {
    width: 100,
    height: 120,
    // position: "absolute",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  squareContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DashboardBody;
