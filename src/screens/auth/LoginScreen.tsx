import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setLoggedInState,
  setPatientId,
  setPatientDetails,
  setMedicalRecord,
} from "./rx/reducer";
import Icon from "react-native-vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import PInput from "@shared-components/input/PInput";
import PIbutton from "@shared-components/buttons/Pbutton";
import {
  PATIENT_LOGIN,
  GET_MEDICAL_RECORD_BY_BODY_PART,
} from "../../connection/mutation";
import { t } from "i18next";
import { RootState } from "redux/store";
import {
  toggleContributeNotificationState,
  toggleRewardNotificationState,
} from "redux/reducer";

// import { authBiometrics } from "../../shared/sensors/Biometric";
interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [patientLoginMutation] = useMutation(PATIENT_LOGIN);
  const [getMedicalRecord] = useMutation(GET_MEDICAL_RECORD_BY_BODY_PART);
  const [fileRecordList, setFileRecordList] = useState([]);
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
          // eslint-disable-next-line camelcase
          patient_password: password,
        },
      },
    });

    if (data.patientLogin.data != null) {
      console.log(data);
      const { patient_email, _id, opportunities_count, patient_reward_count } =
        data.patientLogin.data;
      console.log(data.patientLogin);
      console.log(data.patientLogin.data);
      dispatch(setUsername(patient_email));
      dispatch(setPatientId(_id));
      dispatch(setPatientDetails(data.patientLogin.data));
      if (opportunities_count && opportunities_count > 0) {
        dispatch(toggleContributeNotificationState(true));
      }
      if (patient_reward_count && patient_reward_count > 0) {
        dispatch(toggleRewardNotificationState(true));
      }
      await fetchAllMedicalRecord(_id);

      dispatch(setLoggedInState(true));
    }
  };

  const fetchAllMedicalRecord = async (patientId: string) => {
    const lowerBodyPart = [
      "liver",
      "pancreas",
      "stomach",
      "gallblader",
      "spleen",
    ]; //TODO: refactor this code to include all bodypart

    try {
      lowerBodyPart.map(async (value) => {
        const { data } = await getMedicalRecord({
          variables: {
            record: {
              body_type: value,
              patient_id: patientId,
            },
          },
        });
        if (data) {
          const fileRecord = {
            [value]: data.getMedicalRecordFileByBodyTypeAndPatientId,
          };
          console.log(data);
          setFileRecordList((prevState) => {
            const existingIndex = prevState.findIndex(
              (obj) => obj[value] !== undefined,
            );
            if (existingIndex !== -1) {
              // If key already exists, replace the whole object
              const newState = [...prevState];
              newState[existingIndex] = fileRecord;
              return newState;
            } else {
              // Otherwise, add the new object to the state
              return [...prevState, fileRecord];
            }
          });
          dispatch(setMedicalRecord(fileRecordList));
        }
      });
    } catch (error) {
      throw new Error(`Could not fetch doctor list by id: ${error.message}`);
    }
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
    <View style={styles.scrollViewContainer}>
      <ScrollView>
        <View style={styles.logo}>
          <Image
            source={require("../../assets/contribute-data/peach-logo-3x.png")}
            style={{
              width: 60,
              height: 60,
              marginTop: 70,
              marginLeft: 30,
            }}
          />
        </View>

        <View style={styles.containerLogo}>
          <Text style={styles.loginLogo}>{t("loginScreen.title")}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <PInput
              style={styles.input}
              value={username}
              onChangeText={setUser}
              secureTextEntry={false}
              label={t("loginScreen.emailInput")}
              isValid={isUserValid}
            />
            <View style={styles.passwordContainer}>
              <PInput
                style={styles.input}
                value={password}
                onChangeText={setPass}
                secureTextEntry={secureTextEntry}
                label={t("loginScreen.passwordInput")}
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
              <Text style={styles.forgotText}>
                {t("loginScreen.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView>
          <View style={styles.loginContainer}>
            <PIbutton
              onPress={handleLogin}
              text={t("loginScreen.loginBtn")}
              type="primary"
              style={{
                backgroundColor: "white",
                borderRadius: 45,
                borderColor: "white",
                marginBottom: 5,
                padding: 7,
              }}
            />
            <PIbutton
              onPress={handleLogin}
              text={
                <Text style={{ color: "white" }}>
                  {t("loginScreen.loginWithFaceIDBtn")}
                </Text>
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
            <Text style={{ fontSize: 14, color: "#ECF1E8", marginTop: 150 }}>
              {t("loginScreen.signUp")}
            </Text>
          </View>
        </KeyboardAvoidingView>
        {/*<View style={styles.container}>*/}
        {/*  <TouchableOpacity onPress={handleBiometric}>*/}
        {/*    <Icon name={"finger-print"} size={37} />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </ScrollView>
      <Image
        source={require("../../assets/contribute-data/wave.png")}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 1,
    marginLeft: 0,
    zIndex: -1,
    width: "100%",
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
    marginTop: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#7BA040",
    color: "#606461",
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
    marginTop: 15,
  },
  secureTextIcon: {
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    right: 10,
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
    marginTop: 30,
  },
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0.5,
    flex: 4,
    paddingBottom: 60,
    marginBottom: 250,
  },
  logo: {
    padding: 3,
  },
});

export default LoginScreen;
