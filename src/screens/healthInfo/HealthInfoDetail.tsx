import React, { useState } from "react";
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
type Props = {
  navigation: any;
  route: any;
};

const HealthInfoDetail: React.FC<Props> = (props: Props) => {
  const { route } = props;
  const { opportunityData, index } = route.params;
  console.log(JSON.stringify(opportunityData));
  const [showBtn, setShowBtn] = useState<boolean>(true);

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
        {showBtn ? (
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
        ) : (
          <View style={styles.opportunitiesCard}>
            <Text style={styles.opportunitiesTitle}>Related Opportunities</Text>
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
    marginTop: 26,
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
