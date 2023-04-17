import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import Header from "../../components/Header";
import { t } from "i18next";
import * as NavigationService from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRIVATESCREENS } from "@shared-constants";
import { useMutation } from "@apollo/client";
import { GET_MEDICAL_HEALTH_INFO } from "connection/mutation";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { formatUnixTimestamp } from "utils";
import { toggleNotificationIconState } from "redux/reducer";

type Props = {
  navigation: any;
  route: any;
};
type ItemProps = {
  item: object;
};

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const item = props.item;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.itemView}
      onPress={() => {
        NavigationService.push(PRIVATESCREENS.HEALTH_INFO_DETAIL, {
          opportunityData: item.opportunity,
          index: item.index,
          showMoreOpportunities: true,
        });
      }}
    >
      {item.isNew && <View style={styles.redDot}></View>}
      <Image style={styles.image} source={{ uri: item.image }}></Image>
      <View style={styles.contentView}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.tipsView}>
          <Text style={styles.company}>{item.company}</Text>
          <Text>·</Text>
          <Text style={styles.date}>{formatUnixTimestamp(item.date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const UsefulHealthInfo: React.FC<Props> = (props: Props) => {
  const patientId = useSelector((state: RootState) => state.auth.patientId);
  const [getMedicalHealthInfo] = useMutation(GET_MEDICAL_HEALTH_INFO);
  const [medicalInfo, setMedicalInfo] = useState({});
  const dispatch = useDispatch();
  const infoList = [
    {
      isNew: true,
      image: require("../../assets/healthInfo/info-image.png"),
      title: "New Screening Method for Colon Cancer......",
      company: "McCann Health",
      date: "12 April 2023",
    },
    {
      isNew: false,
      image: require("../../assets/healthInfo/six-cancer.png"),
      title: "New Screening Method for Colon Cancer......",
      company: "McCann Health",
      date: "12 April 2023",
    },
  ];

  const renderMedicalHealthInfoList = async () => {
    const { data } = await getMedicalHealthInfo({
      variables: {
        input: {
          patient_id: patientId,
        },
      },
    });

    if (data.getMedicalHealthInfo) {
      console.log(JSON.stringify(data.getMedicalHealthInfo));

      const newDataArray = data.getMedicalHealthInfo
        .map((item) => {
          const medicalHealthInfo = item.opportunity.medical_health_info;
          const medicalHealthInfoArray = Array.isArray(medicalHealthInfo)
            ? medicalHealthInfo
            : [medicalHealthInfo];

          return medicalHealthInfoArray.map((info, index) => ({
            image: info.advertisement_image,
            title: info.advertisement_title,
            company: item.organization.organization_name,
            date: info.created_at,
            opportunity: item.opportunity,
            index: index,
          }));
        })
        .flat();

      setMedicalInfo(newDataArray);
    }
  };

  useEffect(() => {
    dispatch(toggleNotificationIconState(false));
    renderMedicalHealthInfoList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header isBackHome titleText={t("UsefulHealthInfo.title")}></Header>
      <FlatList
        data={medicalInfo}
        style={styles.list}
        renderItem={({ item }) => <Item item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default UsefulHealthInfo;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    color: "#fff",
    backgroundColor: "#fafafa",
    zIndex: 1,
  },
  list: {
    paddingHorizontal: 35,
  },
  itemView: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 23,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  redDot: {
    width: 6,
    height: 6,
    marginRight: 15,
    backgroundColor: "#F196A8",
    borderRadius: 6,
  },
  image: {
    flexShrink: 0,
    width: 65,
    height: 65,
    marginRight: 15,
    borderRadius: 15,
  },
  contentView: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: "#383D39",
  },
  tipsView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  company: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 12,
    color: "#7BA040",
    marginRight: 7,
  },
  date: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 19,
    color: "#888B88",
    marginLeft: 7,
  },
});
