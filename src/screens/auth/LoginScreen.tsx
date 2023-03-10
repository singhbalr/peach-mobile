import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import type { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setPassword, setUsername, setLoggedInState } from "./rx/reducer";
import Icon from "react-native-vector-icons/Ionicons";

import PInput from "@shared-components/input/PInput";
import PIbutton from "@shared-components/buttons/Pbutton";
// import { authBiometrics } from "../../shared/sensors/Biometric";
interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  //   const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();

  // const handleBiometric = async () => {
  //   const res = await authBiometrics();
  //   if (res) {
  //     // setStep(2)
  //     dispatch(setLoggedInState(true));
  //   } else {
  //     dispatch(setLoggedInState(false));
  //   }
  // };

  const handleLogin = () => {
    // Perform validation for username or email
    if (!username.includes("@") && !username.includes(".")) {
      return;
    }
    // Perform validation for password
    if (password.length < 8) {
      return;
    }
    // Perform login logic
    dispatch(setUsername(username));
    dispatch(setPassword(password));
    dispatch(setLoggedInState(true));
  };
  useEffect(() => {
    if (!username.includes("@") && !username.includes(".")) {
      setIsUserValid(false);
      return;
    }
    setIsUserValid(true);
  }, [username]);

  useEffect(() => {
    if (password.length < 8) {
      setIsPasswordValid(false);
      return;
    }
    setIsPasswordValid(true);
  }, [password]);

  return (
    <>
      <View style={styles.containerLogo}>
        <Text style={styles.loginLogo}>Peach</Text>
        <Text style={styles.loginLogo}>Bioverse</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <Icon name={"ios-location-sharp"} size={17} />
          <Text style={styles.locationText}>Bali, Indonesia</Text>
        </View>
        <View style={styles.inputContainer}>
          <PInput
            style={styles.input}
            value={username}
            onChangeText={setUser}
            secureTextEntry={false}
            label={"Email"}
            isValid={isUserValid}
          />
          <View style={styles.passwordContainer}>
            <PInput
              style={styles.input}
              value={password}
              onChangeText={setPass}
              secureTextEntry={secureTextEntry}
              label={"Password"}
              isValid={isPasswordValid}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.secureTextIcon}
            >
              <Icon
                name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPasswordLabel}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.loginContainer}>
        <PIbutton onPress={handleLogin} text="Login" />
      </View>
      {/*<View style={styles.container}>*/}
      {/*  <TouchableOpacity onPress={handleBiometric}>*/}
      {/*    <Icon name={"finger-print"} size={37} />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  containerLogo: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingBottom: 50,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    marginBottom: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 29,
  },
  passwordContainer: {
    flexDirection: "row",
  },
  secureTextIcon: {
    justifyContent: "center",
    position: "absolute",
    alignSelf: "flex-end",
    right: 0,
    paddingBottom: 15,
  },
  forgotPasswordLabel: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    fontSize: 10,
    fontWeight: "400",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 11,
  },
  loginLogo: {
    fontSize: 50,
  },
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 1,
    flex: 1,
  },
});

export default LoginScreen;
