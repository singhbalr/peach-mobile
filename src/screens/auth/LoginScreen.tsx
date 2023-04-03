import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, KeyboardAvoidingView } from "react-native";
// import type { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  setUsername,
  setLoggedInState,
  setPatientId,
  setPatientDetails,
} from "./rx/reducer";
import Icon from "react-native-vector-icons/Ionicons";
import { useMutation, useSubscription } from "@apollo/client";
import PInput from "@shared-components/input/PInput";
import PIbutton from "@shared-components/buttons/Pbutton";
import { PATIENT_LOGIN } from "../../connection/mutation";
// import { authBiometrics } from "../../shared/sensors/Biometric";
interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [patientLoginMutation] = useMutation(PATIENT_LOGIN);
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

  const handleLogin = async () => {
    // Perform validation for username or email
    if (!username.includes("@") && !username.includes(".")) {
      return;
    }
    // Perform validation for password
    if (password.length < 8) {
      return;
    }

    const { data } = await patientLoginMutation({
      variables: {
        input: {
          // eslint-disable-next-line camelcase
          patient_email: username,
          patient_password: password,
        },
      },
    });

    if (data.patientLogin.data != null) {
      console.log(data);
      const { patient_email, _id } = data.patientLogin.data;
      console.log(data.patientLogin);
      console.log(data.patientLogin.data);
      dispatch(setUsername(patient_email));
      dispatch(setPatientId(_id));
      dispatch(setPatientDetails(data.patientLogin.data));
      dispatch(setLoggedInState(true));
    }

    // // // Perform login logic
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

  useEffect(() => {
    console.log("RENDER");
  }, []);

  return (

  <>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    
    <View style={styles.logo}>
        <Image 
          source={require("../../assets/contribute-data/peach-logo.png")} 
          style={{
            marginTop: 70, 
            marginLeft: 30,
          }}
        />
    </View>

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
      <KeyboardAvoidingView>
        <View style={styles.loginContainer}>
          <PIbutton
            onPress={handleLogin}
            text="Login"
            type="primary"
            style={{
              backgroundColor: "white",
              borderRadius: 45,
              borderColor: "white",
              marginBottom: 5,
              padding: 7
            }}
          />
          <PIbutton
            onPress={handleLogin}
            text={ 
            
                <Text style={{color: 'white'}}>Login with Face ID</Text>
            
            }
            type="secondary"
            style={{
              backgroundColor: "#91AD70",
              borderRadius: 45,
              borderColor: "white",
              opacity: 1,
              padding: 7,
            }}
          />
          <Text style={{fontSize: 14, color: "#ECF1E8", marginTop: 150}}>Don’t have an account ? Sign Up </Text>
        </View>
      </KeyboardAvoidingView>
      {/*<View style={styles.container}>*/}
      {/*  <TouchableOpacity onPress={handleBiometric}>*/}
      {/*    <Icon name={"finger-print"} size={37} />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}

    </ScrollView>
  </>
      
  );
};

const styles = StyleSheet.create({

  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 5,
    
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 30,
    paddingBottom: 0,
    marginTop: 20
  },
  input: {
    width: "100%",
    backgroundColor: "#B5CAA0",
    color: "#606461",
    borderRadius: 10,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 15,
    padding: 20,
    paddingBottom: 5,
    marginBottom: 10,
    
    
  },
  passwordContainer: {
    flexDirection: "row",
    marginTop: 20,
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
    fontSize: 14,
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
    marginTop: 40
  },
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 1,
    flex: 4,
    paddingBottom: 60,
    marginBottom: 250,

  },
  logo: {
    padding: 3
  }

  
});

export default LoginScreen;
