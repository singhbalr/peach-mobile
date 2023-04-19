import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import countDaysLeft from "../../components/countDayLeft";
import React from "react";
import * as NavigationService from "react-navigation-helpers";
import { PRIVATESCREENS } from "@shared-constants";

interface RewardProps {
  reward_name: string;
  detail: string;
  reward_amount: string;
}

interface OpportunityProps {
  _id: string;
  opportunity_picture_banner: any;
  opportunity_expiration: string;
  opportunity_name: string;
  opportunity_data_accesibility_duration: number;
  reward?: undefined | RewardProps[];
  additionalRewards?: undefined | RewardProps[];
}

const OpportunityCard: React.FC<OpportunityProps> = (opportunityData) => {
  const handleItemPress = (OpportunityRecord: any) => {
    NavigationService.push(PRIVATESCREENS.OPPORTUNITY_RECORD, {
      OpportunityRecord,
    });
  };

  return (
    <TouchableOpacity onPress={() => handleItemPress(opportunityData)}>
      <View
        style={{
          borderRadius: 15,
          borderColor: "#BABCB7",
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: "#ffffff",
          width: ScreenWidth * 0.85,
          marginVertical: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={
                typeof opportunityData?.opportunity_picture_banner === "string"
                  ? { uri: opportunityData?.opportunity_picture_banner }
                  : opportunityData?.opportunity_picture_banner
              }
              style={{
                width: 115,
                height: 155,
              }}
            />
            <View
              style={{
                backgroundColor: "#383D39",
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
                position: "absolute",
                bottom: 9,
                left: 7,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  fontWeight: "900",
                }}
              >
                {countDaysLeft(opportunityData.opportunity_expiration)} Days
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 15,
                color: "#383D39",
              }}
            >
              {opportunityData.opportunity_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/contribute-data/reward-icon.png")}
                style={{
                  width: 16,
                  height: 16,
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
                    fontWeight: "700",
                    fontSize: 11,
                    alignItems: "center",
                    color: "#D1AE6C",
                  }}
                >
                  {opportunityData.reward ? "Rewards" : "Additional Rewards"}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              {opportunityData.reward?.map((item, key) => (
                <View
                  key={`reward-item-${key}`}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      color: "#606461",
                      lineHeight: 21,
                      fontFamily: "TitilliumWeb-SemiBold",
                    }}
                  >
                    {item.reward_type_description.reward_type === "CASH_COUPON"
                      ? "HK$"
                      : ""}
                    {item.reward_amount}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 10,
                      color: "#888B88",
                      marginRight: 5,
                    }}
                  >
                    {item.reward_name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OpportunityCard;
