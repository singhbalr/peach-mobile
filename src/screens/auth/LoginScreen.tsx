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
        <Text style={styles.loginLogo}>Login</Text>
      </View>
      <View style={styles.container}>
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
        <PIbutton
          onPress={handleLogin}
          text="Login"
          type="primary"
          style={{
            backgroundColor: "white",
            borderRadius: 45,
            borderColor: "white",
          }}
        />
        <PIbutton
          onPress={handleLogin}
          text="Login with Face ID"
          type="secondary"
          style={{
            backgroundColor: "white",
            borderRadius: 45,
            borderColor: "white",
          }}
        />
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
  },
  containerLogo: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
    paddingBottom: 50,
  },
  input: {
    width: "100%",
    backgroundColor: "#B5CAA0",
    color: "#606461",
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
  },
  passwordContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  secureTextIcon: {
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    right: 5,
  },
  forgotPasswordLabel: {
    alignSelf: "center",
    marginTop: 15,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ECF1E8",
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
    fontSize: 22,
    color: "white",
    fontWeight: "700",
  },
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 1,
    flex: 1,
  },
});

export default LoginScreen;
