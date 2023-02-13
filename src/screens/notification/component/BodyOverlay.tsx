import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Body from "../../../assets/dashboard/body.svg";

interface BodyOverlayProps {
  bodyparts: object;
  onListSelect(arg0: string): void;
  selectedBodyParts: string;
}

const BodyOverlay: React.FC<BodyOverlayProps> = (props) => {
  const onPress = () => {
    console.log("Square 1");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.leftRow}>
          {props.bodyparts.map((value: any, index: number) => {
            if (index % 2 === 0) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.leftView}
                  onPress={() => props.onListSelect(value.name)}
                >
                  <View>
                    <Text>{value.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.selectedBodyParts}</Text>
        </View>
        <View style={styles.rightRow}>
          {props.bodyparts.map((value: any, index: number) => {
            if (index % 2 !== 0) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.rightView}
                  onPress={() => props.onListSelect(value.name)}
                >
                  <View>
                    <Text>{value.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    justifyContent: "center",
  },
  leftView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    // width: "100%",
    width: 150,
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 15,
    marginLeft: -10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 14,
  },
  rightView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    // width: "100%",
    width: 150,
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 15,
    marginRight: -10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 14,
  },
  leftRow: {
    flex: 1,
    // backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightRow: {
    flex: 1,
    // backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 70,
  },
});

export default BodyOverlay;
