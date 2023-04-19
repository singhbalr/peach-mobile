import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderNavigation from "../../components/HeaderNavigation";
import { useTheme } from "@react-navigation/native";
import createStyles from "@screens/dataReceiver/DataReceiver.style";
import Line from "../../components/Line";
import { t } from "i18next";
import OpportunityCard from "@screens/opportunities/OpportunityCard";
import { useMutation } from "@apollo/client";
import {
  GET_FOLLOW_UP_REQUEST_BY_PATIENT_ID,
  GET_OPPORTUNITY_BY_ORGANIZATION_ID_FILTERED,
} from "connection/mutation";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { FollowUpRequestCard } from "components/FollowUpRequestCard";
const DataReceiver: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [opportunities, setOpportunities] = useState([]);
  const [getOppByOrg] = useMutation(
    GET_OPPORTUNITY_BY_ORGANIZATION_ID_FILTERED,
  );
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  const [getFollowUpRequestByPatientId] = useMutation(
    GET_FOLLOW_UP_REQUEST_BY_PATIENT_ID,
  );
  const [followUpRequest, setFollowUpRequest] = useState([]);
  const fetchFollowUpRequest = async () => {
    try {
      const { data } = await getFollowUpRequestByPatientId({
        variables: {
          input: {
            patient_id: patientId,
          },
        },
      });
      setFollowUpRequest(data.getFollowUpRequestByPatientId);
    } catch (err) {
      console.log("Failed to fetch followup request by patient id", err);
    }
  };

  const loadOpportunity = async () => {
    const { data } = await getOppByOrg({
      variables: {
        opportunity: {
          opportunity_type_id: "6419e3b9db51e4ec7511f1bc",
          organization_id: "6434afe5d2fb27638e768583",
        },
      },
    });

    if (data) {
      console.log(data.getOpportunityByOrganizationIdOpp);
      setOpportunities(data.getOpportunityByOrganizationIdOpp);
    }
  };
  useEffect(() => {
    loadOpportunity();
    fetchFollowUpRequest();
  }, []);

  const opportunityData = [
    {
      _id: 1,
      opportunity_picture_banner: require("../../assets/contribute-data/sample-image-list-1.png"),
      opportunity_expiration: "1680325932000",
      opportunity_data_accesibility_duration: 1680325932000,
      opportunity_name: t("ProfileScreen.opportunity-title1"),
      reward: [
        {
          title: t("ProfileScreen.reward-title1"),
          detail: t("ProfileScreen.reward-detail1"),
        },
        {
          title: t("ProfileScreen.reward-title2"),
          detail: t("ProfileScreen.reward-detail2"),
        },
      ],
    },
    {
      _id: 1,
      opportunity_picture_banner: require("../../assets/contribute-data/sample-image-list-1.png"),
      opportunity_expiration: "1680325932000",
      opportunity_data_accesibility_duration: 1680325932000,
      opportunity_name: t("ProfileScreen.opportunity-title1"),
      reward: [
        {
          title: t("ProfileScreen.reward-title1"),
          detail: t("ProfileScreen.reward-detail1"),
        },
        {
          title: t("ProfileScreen.reward-title2"),
          detail: t("ProfileScreen.reward-detail2"),
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: "white",
      }}
    >
      <HeaderNavigation title="Postnetics Limited" />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingLeft: 33,
            paddingRight: 33,
          }}
        >
          <Image
            source={require("../../assets/data-receiver/prenetics-logo-full-colour.png")}
            style={{
              width: 281,
              height: 61,
            }}
            resizeMode={"contain"}
          />
          <Text
            style={{
              marginTop: 38,
              fontWeight: "400",
              fontSize: 13,
              color: "#1C1C1C",
            }}
          >
            {t("DataReceiver.Prenetics")}
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                marginTop: 15,
                fontWeight: "400",
                fontSize: 13,
                color: "#7BA23F",
              }}
            >
              {t("DataReceiver.link-prenetics")}
            </Text>
          </TouchableOpacity>

          <Line />

          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: "#383D39",
              alignSelf: "flex-start",
            }}
          >
            {t("DataReceiver.opportunity-prenetics")}
          </Text>

          {opportunities.map((item, key) => (
            <OpportunityCard key={key} {...item} />
          ))}
          {followUpRequest?.map((item: any, key: any) => (
            <FollowUpRequestCard
              key={`followup-request-card-${key}`}
              {...item}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DataReceiver;
