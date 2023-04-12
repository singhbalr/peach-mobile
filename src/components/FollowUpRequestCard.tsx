import React, { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import * as NavigationService from "react-navigation-helpers";
import { PRIVATESCREENS } from "@shared-constants";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import countDaysLeft from "./countDayLeft";

export const FollowUpRequestCard = (followupRequest) => {
  const { opportunity } = followupRequest;

  const handleFollowupPress = (followupRequestData: any) => {
    NavigationService.push(PRIVATESCREENS.FOLLOWUP_REQUEST, {
      followupRequestData,
    });

    console.log(followupRequestData, "followupRequest");
  };

  return (
    <TouchableOpacity onPress={() => handleFollowupPress(followupRequest)}>
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
              source={{ uri: opportunity?.opportunity_picture_banner }}
              style={{
                width: 115,
                height: 155,
                borderRadius: 15,
                marginTop: 5,
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
                {countDaysLeft(opportunity.opportunity_expiration)} Days
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
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginTop: 10,
                marginBottom: 20,
                color: "#383D39",
              }}
            >
              {opportunity?.opportunity_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./../assets/contribute-data/reward-icon.png")}
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
                  {opportunity?.reward ? "Reward" : "Additional Reward"}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              {opportunity?.reward?.map((item, key) => (
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
