import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Notification = ({ message, visible, duration = 3000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [visible, duration]);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Notification;
