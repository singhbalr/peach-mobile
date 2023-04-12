import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Navigation from "../../components/Navigation";
import { SafeAreaView } from "react-native";
import { t } from "i18next";
import { PRIVATESCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import { formatUnixTimestamp } from "utils";
import { useMutation } from "@apollo/client";
import { GET_OPPORTUNITY_BY_ORGANIZATION_ID_FILTERED } from "connection/mutation";
import OpportunityCard from "@screens/opportunities/OpportunityCard";

type Props = {
  navigation: any;
  route: any;
};

const HealthInfoDetail: React.FC<Props> = (props: Props) => {
  const { route } = props;
  const { opportunityData, index, showMoreOpportunities } = route.params;
  const [opportunities, setOpportunities] = useState([]);
  const [getOppByOrg] = useMutation(
    GET_OPPORTUNITY_BY_ORGANIZATION_ID_FILTERED,
  );

  const PROMOTIONAL_TYPE_ID = "6419e3e9db51e4ec7511f1be";
  const DEMO_ORG_ID = "6434afe5d2fb27638e768583";

  console.log(JSON.stringify(opportunityData));

  const loadOpportunity = async () => {
    const { data } = await getOppByOrg({
      variables: {
        opportunity: {
          opportunity_type_id: PROMOTIONAL_TYPE_ID,
          organization_id: DEMO_ORG_ID,
        },
      },
    });

    if (data) {
      console.log(data.getOpportunityByOrganizationIdOpp);
      setOpportunities(data.getOpportunityByOrganizationIdOpp);
    }
  };

  useEffect(() => {
    if (showMoreOpportunities === true) {
      loadOpportunity();
    }
  }, []);

  const staticContent = {
    title: opportunityData.medical_health_info[index].advertisement_title,
    company: opportunityData.organization.organization_name,
    date: opportunityData.medical_health_info[index].created_at,
    content: opportunityData.medical_health_info[index].advertisement_content,
    bottomText: "For more articles, read in ",
    imgUrl: opportunityData.medical_health_info[index].advertisement_image,
  };
  const goToHealthInfo = () => {
    NavigationService.push(PRIVATESCREENS.USEFUL_HEALTH_INFO);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Navigation titleText={t("UsefulHealthInfo.title")}></Navigation>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{staticContent.title}</Text>
          <View style={styles.tipsView}>
            <Text style={styles.company}>{staticContent.company}</Text>
            <Text>·</Text>
            <Text style={styles.date}>
              {formatUnixTimestamp(staticContent.date)}
            </Text>
          </View>
          <Image
            source={{ uri: staticContent.imgUrl }}
            style={styles.image}
            resizeMode="cover"
          ></Image>
          <Text style={styles.content}>{staticContent.content}</Text>
        </View>
        {showMoreOpportunities ? (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#383D39",
                marginHorizontal: 35,
                marginTop: 35,
              }}
            >
              Related Opportunities
            </Text>
            {opportunities.map((item, key) => (
              <View style={styles.opportunitiesCard}>
                <OpportunityCard key={key} {...item} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.bottomBtnView}>
            <Text style={styles.bottomText}>
              <Text style={styles.bottomText}>{staticContent.bottomText}</Text>
              <Text style={styles.bottomBoldText}>
                {t("UsefulHealthInfo.title")}.
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.bottomTouch}
              onPress={goToHealthInfo}
            >
              <View style={styles.bottomBtn}>
                <Text style={styles.btnText}>
                  {t("UsefulHealthInfo.title")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HealthInfoDetail;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    color: "#fff",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 32,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#BABCB7",
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: "#383D39",
  },
  tipsView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 21,
  },
  company: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#7BA040",
    marginRight: 7,
  },
  date: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 19,
    color: "#888B88",
    marginLeft: 7,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 320,
    marginBottom: 8,
  },
  imageTitle: {
    fontStyle: "italic",
    fontSize: 13,
    lineHeight: 19,
    color: "#606461",
    marginBottom: 44,
  },
  content: {
    fontSize: 13,
    lineHeight: 19,
    color: "#373C38",
  },
  bottomBtnView: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 65,
  },
  bottomText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#606461",
    marginVertical: 25,
  },
  bottomBoldText: {
    fontWeight: "bold",
  },
  bottomTouch: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 35,
  },
  bottomBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 55,
    backgroundColor: "#7BA040",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 27,
    color: "#fff",
  },
  opportunitiesCard: {
    marginTop: 15,
    paddingHorizontal: 35,
    paddingBottom: 100,
  },
  opportunitiesTitle: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 27,
    color: "#383D39",
  },
});
