import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../components/Navigation";
import { SafeAreaView } from "react-native";
import { t } from "i18next";
type Props = {
  navigation: any;
  route: any;
};

const HealthInfoDetail: React.FC<Props> = (props: Props) => {
  const [showBtn, setShowBtn] = useState<boolean>(false,)
  const staticContent = {
    title: 'Latest Product to Detect Multiple Cancers based on Large-scale Clinical Research Results on Blood-based Early Cancer Screening in the Chinese Population',
    company: 'Prenetics Limited',
    date: '09 April 2023',
    imageTitle: '(Detecting six cancer types in one single lab test)',
    content: 
      `Berry Oncology is a biotechnology company in China which runs China’s first and only large-scale, forward-looking cohort study of early liver cancer screening based on next-generation sequencing (NGS) technology. It is also one of the largest and fastest-growing prospective cohort studies of liver cancer in the world. The PreCar project (Prospective suRveillance for very Early hepatocelluar CARcinoma) involves approximately 10,000 people (5,000 liver cirrhosis patients and 5,000 with hepatitis B virus). And subsequently Berry Oncology has launched its new HIFI Pan-Cancer Screening, which can detect six high-risk cancers in one test.

Developed using the company’s HIFI technology platform, the early screening product can accurately detect six cancers that are highly prevalent in China. They include liver, colorectal, oesophagal, pancreatic, gastric and lung cancer. The product has demonstrated an 82% traceability accuracy, 99.09% specificity and 87.58% sensitivity.
      
The HIFI technology platform can help reduce product development and testing service costs, which in turn contributes to the effort to make early multi-cancer screening more affordable. Berry Oncology’s new one-time precision product is claimed to be the first of its kind in the world to be developed using whole-genome sequencing (WGS) of cell-free DNA (cfDNA).`,
    bottomText: 'For more articles, read in '
  }
  return (
    <SafeAreaView style={styles.container}>
      <Navigation titleText={t('UsefulHealthInfo.title')}></Navigation>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{staticContent.title}</Text>
          <View style={styles.tipsView}>
            <Text style={styles.company}>{staticContent.company}</Text>
            <Text>·</Text>
            <Text style={styles.date}>{staticContent.date}</Text>
          </View>
          <Image source={require('../../assets/healthInfo/six-cancer.png')} style={styles.image} resizeMode="cover"></Image>
          <Text style={styles.imageTitle}>{staticContent.imageTitle}</Text>
          <Text style={styles.content}>{staticContent.content}</Text>
        </View>
        {
          showBtn ? (
            <View style={styles.bottomBtnView}>
              <Text style={styles.bottomText}>
                <Text style={styles.bottomText}>{staticContent.bottomText}</Text>
                <Text style={styles.bottomBoldText}>{t('UsefulHealthInfo.title')}.</Text>
              </Text>
              <TouchableOpacity style={styles.bottomTouch}>
                <View style={styles.bottomBtn}>
                  <Text style={styles.btnText}>{t('UsefulHealthInfo.title')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.opportunitiesCard}>
              <Text style={styles.opportunitiesTitle}>Related Opportunities</Text>
            </View>
          )
        }
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
    borderBottomColor: '#BABCB7'
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: '#383D39'
  },
  tipsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 21
  },
  company: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#7BA040',
    marginRight: 7
  },
  date: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 19,
    color: '#888B88',
    marginLeft: 7
  },
  image: {
    flex: 1,
    width: '100%',
    height: 320,
    marginBottom: 8
  },
  imageTitle: {
    fontStyle: 'italic',
    fontSize: 13,
    lineHeight: 19,
    color: '#606461',
    marginBottom: 44
  },
  content: {
    fontSize: 13,
    lineHeight: 19,
    color: '#373C38',
  },
  bottomBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 65
  },
  bottomText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#606461',
    marginVertical: 25,
  },
  bottomBoldText: {
    fontWeight: 'bold'
  },
  bottomTouch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 35,
  },
  bottomBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 55,
    backgroundColor: '#7BA040'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#fff',
  },
  opportunitiesCard: {
    marginTop: 26,
    paddingHorizontal: 35,
    paddingBottom: 100
  },
  opportunitiesTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#383D39',
  }
});
