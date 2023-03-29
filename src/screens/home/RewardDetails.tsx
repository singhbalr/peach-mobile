import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import createStyles from "@screens/opportunities/OpportunitiesRecord.style";
import { Image, Text, View } from "react-native";
import PIbutton from "@shared-components/buttons/Pbutton";
import { SafeAreaView } from "react-native-safe-area-context";

interface RewardDetailsScreenProps {
  navigation: any;
  route: any;
}

const RewardDetails: React.FC<RewardDetailsScreenProps> = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 114, height: 114 }}
          resizeMode={"stretch"}
          source={require("./../../assets/medical-record/copysuccess_green.png")}
        />
        <Text style={{ fontSize: 27, fontWeight: "600", marginBottom: 20 }}>
          Successful
        </Text>
        <View style={{ marginBottom: 20, width: 300 }}>
          <Text
            style={{ fontSize: 17, fontWeight: "400", textAlign: "center" }}
          >
            congratulations! you just received a reward. Go to Reward Centor to
            redeem it.
          </Text>
        </View>
        <View style={{ marginBottom: 50 }}>
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
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <PIbutton
              text={"Go to Reward Center"}
              type={"secondary"}
              // onPress={handleItemPress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RewardDetails;
