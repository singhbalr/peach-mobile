import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@react-navigation/native";
import createStyles from "@screens/opportunities/OpportunitiesRecord.style";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PIbutton from "@shared-components/buttons/Pbutton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-dynamic-vector-icons";
import { calculateDateDiff } from "@utils";
import { useMutation } from "@apollo/client";
import { REDEEM_REWARD } from "../../connection/mutation";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import { t } from "i18next";

interface RewardDetailsScreenProps {
  navigation: any;
  route: any;
}

const RewardDetails: React.FC<RewardDetailsScreenProps> = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  const [detail, setDetail] = useState({});
  const [redeemRewardMutation] = useMutation(REDEEM_REWARD);

  const handleRedeemReward = async () => {
    const { data } = await redeemRewardMutation({
      variables: {
        reward: {
          // eslint-disable-next-line camelcase
          patient_reward_id: detail?._id,
        },
      },
    });
    console.log(data);
  };

  useEffect(() => {
    setDetail(props.route.params.Reward);
    handleRedeemReward();
  }, [props.route.params]);

  const MenuButton = () => (
    <RNBounceable>
      <Icon
        name="arrow-back"
        type="Ionicons"
        color={colors.iconBlack}
        size={30}
      />
    </RNBounceable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton />
        <Text style={styles.headerText}>{t("RewardDetails.title")}</Text>
      </View>
      <View
        style={{
          marginBottom: 26,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
            }}
          >
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
                    width: ScreenWidth * 0.9,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: detail?.opportunity?.opportunity_picture_banner,
                      }}
                      style={{
                        width: 323,
                        height: 184,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: "#383D39",
                        // borderRadius: 8,
                        // paddingHorizontal: 10,
                        paddingVertical: 4,
                        position: "absolute",
                        bottom: 9,
                        // left: 7,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 11,
                          fontWeight: "900",
                        }}
                      >
                        {calculateDateDiff(
                          detail?.opportunity?.opportunity_expiration,
                        )}{" "}
                        Days
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "700",
                        marginBottom: 16,
                        color: "#383D39",
                      }}
                    >
                     {t("RewardDetails.title-content")}{" "}
                    </Text>
                    <View
                      style={{
                        borderBottomColor: "#BABCB7",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 16,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Image
                      source={require("../../assets/contribute-data/reward-icon.png")}
                      style={{
                        width: 20,
                        height: 20,
                        alignItems: "center",
                      }}
                    />
                    <View
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 4,
                          lineHeight: 17,
                          fontWeight: "600",
                          fontSize: 18,
                          alignItems: "center",
                          color: "#D1AE6C",
                        }}
                      >
                        {t("RewardDetails.reward")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      marginBottom: 24,
                    }}
                  >
                    <View
                      style={{
                        width: 140,
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: "#BABCB7",
                        flexDirection: "column",
                        padding: 4,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../../assets/reward/qr-sample.png")}
                        style={{
                          width: 132,
                          height: 132,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 22,
                        }}
                      >
                        {detail?.opportunity?.reward[0].reward_amount}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 13,
                        }}
                      >
                        {detail?.opportunity?.reward[0].reward_name}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "#606461",
                      lineHeight: 21,
                    }}
                  >
                    {t("RewardDetails.terms")}
                  </Text>
                  <View
                    style={{
                      marginTop: 15,
                      marginBottom: 16,
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          marginRight: 5,
                        }}
                      >
                        {"\u2022"}
                      </Text>
                      <Text>
                        {t("RewardDetails.text")}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          marginRight: 5,
                        }}
                      >
                        {"\u2022"}
                      </Text>
                      <Text>
                        {t("RewardDetails.text")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RewardDetails;
