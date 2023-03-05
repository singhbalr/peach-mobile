import React, { useMemo, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme, useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import {} from "@react-navigation/native";

/**
 * ? Local Imports
 */
import createStyles from "./ProfileScreen.style";
// import Text from "@shared-components/text-wrapper/TextWrapper";
import { PRIVATESCREENS } from "@shared-constants";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/rx/reducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import PIbutton from "@shared-components/buttons/Pbutton";
import { useMutation, useSubscription } from "@apollo/client";
import {
  GET_DOCTOR_REQUEST,
  UPDATE_TRANSACTION_BY_TRANSACTION_TYPE_ID,
} from "../../connection/mutation";
import {
  TRANSACTION_UPDATED_SUBSCRIPTION,
  NEW_TRANSACTION,
} from "../../connection/subscription";
import Notification from "@shared-components/notification/notification";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  //TO BE REFACTOR
  const PATIENT_APPROVED_TRANSACTION_ID = "6404c1ac79e1302362924b15";
  const PATIENT_ID = "6400f4fde5a8cc3d77993d81";
  //

  const isFocused = useIsFocused();
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Screen1");
  const [showNotification, setShowNotification] = useState(false);
  const [doctorRequest, setDoctorRequest] = useState([]);
  const [getDoctorRequest, { data, loading, error }] =
    useMutation(GET_DOCTOR_REQUEST);
  const [
    updateTransaction,
    { transactionData, transactionLoading, transactionError },
  ] = useMutation(UPDATE_TRANSACTION_BY_TRANSACTION_TYPE_ID);

  const { _a, _b, _c } = useSubscription(TRANSACTION_UPDATED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data) {
        console.log(data);
      }
    },
  });

  const { _aa, _bb, _cc } = useSubscription(NEW_TRANSACTION, {
    onData: async ({ data }) => {
      if (data) {
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
        await callGraphQlAPI();
      }
    },
  });

  const handleTabPress = async (tabName: string) => {
    setActiveTab(() => {
      const newCount = tabName;
      if (newCount === "Screen3") {
        callGraphQlAPI();
      }
      return newCount;
    });
  };
  const handleLogout = () => {
    dispatch(setLogout());
  };
  const handleItemPress = (OpportunityRecord: any) => {
    NavigationService.push(PRIVATESCREENS.OPPORTUNITY_RECORD, {
      OpportunityRecord,
    });
  };

  const callGraphQlAPI = async () => {
    getDoctorRequest({
      variables: {
        input: {
          // eslint-disable-next-line camelcase
          patient_id: PATIENT_ID,
        },
      },
    });

    if (data) {
      setDoctorRequest([]);
      setDoctorRequest(data.getTransactionByPatientId);
      console.log("API CALLED");
    }
  };

  const approveRequest = async (transaction_id: string) => {
    console.log(transaction_id);

    updateTransaction({
      variables: {
        updateTransactionId: transaction_id,
        input: {
          transaction_type_id: PATIENT_APPROVED_TRANSACTION_ID,
        },
      },
    });

    if (transactionData) {
      await callGraphQlAPI();
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Screen1 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <OpportunityCard />
        <OpportunityCard />
      </View>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const Screen2 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <SharedDataCard />
      </View>
    );
  };

  const Screen3 = () => {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        {renderDoctorRequest()}
      </View>
    );
  };

  const renderDoctorRequest = () => {
    return (
      // const {doctor_name, doctor_last_name, hospital_name, hospital_address, hospital_city, hospital_state, hospital_email} = props
      <FlatList
        data={doctorRequest}
        renderItem={({ item }) => (
          <DoctorCard
            transaction_id={item._id}
            doctor_name={item.doctor.doctor_name}
            doctor_last_name={item.doctor.doctor_last_name}
            hospital_name={item.doctor.hospital_id.hospital_name}
            hospital_address={item.doctor.hospital_id.hospital_address}
            hospital_city={item.doctor.hospital_id.hospital_city}
            hospital_state={item.doctor.hospital_id.hospital_state}
            hospital_email={item.doctor.hospital_id.hospital_email}
            transaction_type_text={item.transaction_type.transaction_type_text}
          />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const OpportunityCard = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#000000",
          width: ScreenWidth * 0.9,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>expired in 2023-03-01 (48 days left) </Text>
          <TouchableOpacity
            onPress={() => handleItemPress("Opportunity Record")}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7BA23F" }}>
              Read more
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
            Support colorectal screening to save lives{" "}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#1C1C1C" }}>
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            name={"gift"}
            type="AntDesign"
            color={colors.iconBlack}
            size={30}
          />
          {/* reward component */}
          <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#7BA23F",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>2 dose</Text>
            </View>
            <View
              style={{
                backgroundColor: "#B5CAA0",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>Shingrix vaccine</Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#7BA23F",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>100 HKD</Text>
            </View>
            <View
              style={{
                backgroundColor: "#B5CAA0",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>K11 Musea</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const SharedDataCard = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#000000",
          width: ScreenWidth * 0.9,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>shared until 2023-03-01 </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#7BA23F" }}>
              Securely Shared
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
            Support colorectal screening to save lives{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            name={"gift"}
            type="AntDesign"
            color={colors.iconBlack}
            size={30}
          />
          {/* reward component */}
          <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#696C69",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>2 dose</Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>Shingrix vaccine</Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#696C69",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>100 HKD</Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>K11 Musea</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const DoctorCard = (props) => {
    const {
      transaction_id,
      doctor_name,
      doctor_last_name,
      hospital_name,
      hospital_address,
      hospital_city,
      hospital_state,
      hospital_email,
      transaction_type_text,
    } = props;
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor:
            transaction_type_text === "DOCTOR_REQUEST" ? "#000000" : "green",
          width: ScreenWidth * 0.9,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text>{hospital_email}</Text>
          <TouchableOpacity
            onPressIn={async () => await approveRequest(transaction_id)}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color:
                  transaction_type_text === "DOCTOR_REQUEST"
                    ? "#7BA23F"
                    : "#000000",
              }}
            >
              Accept Request
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
            Dr. {doctor_name} {""} {doctor_last_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 5 }}>
            {hospital_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            {hospital_address} {", "} {hospital_city}
            {", "}
            {hospital_state}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* <Icon
            name={"gift"}
            type="AntDesign"
            color={colors.iconBlack}
            size={30}
          /> */}
          {/* reward component */}
          {/* <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#696C69",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>2 dose</Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>Shingrix vaccine</Text>
            </View>
          </View> */}
          {/* <View
            style={{
              borderRadius: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#696C69",
                borderTopStartRadius: 5,
                borderBottomStartRadius: 5,
                padding: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>100 HKD</Text>
            </View>
            <View
              style={{
                backgroundColor: "#999C9A",
                borderTopEndRadius: 5,
                borderBottomEndRadius: 5,
                padding: 5,
              }}
            >
              <Text>K11 Musea</Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  };
  const borderStyle1 = () => {
    if (activeTab === "Screen1") {
      return {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000000",
        height: 35,
        justifyContent: "center",
        backgroundColor: "#7BA23F",
        color: "#FFFFFF",
      };
    }
  };

  const borderStyle2 = () => {
    if (activeTab === "Screen2") {
      return {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000000",
        height: 35,
        justifyContent: "center",
        backgroundColor: "#7BA23F",
        color: "#FFFFFF",
      };
    }
  };
  const borderStyle3 = () => {
    if (activeTab === "Screen3") {
      return {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000000",
        height: 35,
        justifyContent: "center",
        backgroundColor: "#7BA23F",
        color: "#FFFFFF",
      };
    }
  };

  const renderScreen = (activeTab: string) => {
    switch (activeTab) {
      case "Screen1":
        return <Screen1 />;
      case "Screen2":
        return <Screen2 />;

      case "Screen3":
        return <Screen3 />;
      default:
        return <Screen1 />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contribute Data</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 35,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#000000",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={async () => handleTabPress("Screen1")}
          style={[
            borderStyle1(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Screen1" ? "bold" : "normal",
              color: activeTab === "Screen1" ? "#FFFFFF" : "#000000",
            }}
          >
            Opportunities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => handleTabPress("Screen2")}
          style={[
            borderStyle2(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Screen2" ? "bold" : "normal",
              color: activeTab === "Screen2" ? "#FFFFFF" : "#000000",
            }}
          >
            Shared Data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => handleTabPress("Screen3")}
          style={[
            borderStyle3(),
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text
            style={{
              fontWeight: activeTab === "Screen3" ? "bold" : "normal",
              color: activeTab === "Screen3" ? "#FFFFFF" : "#000000",
            }}
          >
            Follow On Request
          </Text>
        </TouchableOpacity>
      </View>
      {renderScreen(activeTab)}
      <Notification
        message="A new doctor request has been received!"
        visible={showNotification}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
