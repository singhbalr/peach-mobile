import React from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import Header from "../../components/Header"
import { SafeAreaView } from "react-native"
import { PRIVATESCREENS } from "@shared-constants"
import * as NavigationService from "react-navigation-helpers"
import ButtonTabs from "components/ButtonTabs"
import InstitutionsSvg from "../../assets/icons/institutions.svg"
const ClinicalReport: React.FC = () => {
  const handleItemPress = () => {
    NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
      activeIndex: 2
    })
  }
  const reportList = [{
    date: '25 JUL 2022',
    doctor: 'Dr. Ho Wai Ming',
    buttonIndexs: [0, 1, 2] //Corresponding button： [0: Genetic Data, 1: Genetic Data, 2: Clinical Record]
  }, {
    date: '25 JUL 2022',
    doctor: 'Dr. Ho Wai Ming',
    buttonIndexs: [0, 2]
  }]

  return (
    <SafeAreaView style={styles.container}>
      <Header titleText={"Clinical Report"}></Header>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.topInfo}>
            <Image source={require('../../assets/icons/user.png')} style={styles.userIcon}></Image>
            <Text style={styles.username}>Alan Turing</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.itemTitle}>HKID</Text>
            <Text style={styles.itemValue}>Z123****</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.itemTitle}>Date of Birth</Text>
            <Text style={styles.itemValue}>07 JUN 1954</Text>
          </View>
        </View>
        <View style={styles.reportTitle}>
          <Text style={styles.title}>Existing Record</Text>
          <View style={styles.titleRight}>
            <InstitutionsSvg />
            <Text style={styles.rightText}>Institutions</Text>
          </View>
        </View>
        {
          reportList.map((item, index) => {
            return (
              <View key={index} style={styles.reportItem}>
                <View style={styles.dateView}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <View style={styles.dateLine}></View>
                </View>
                <Text style={styles.greenText}>Medtimes</Text>
                <Text style={styles.subText}>{item.doctor}</Text>
                <View style={styles.buttonList}>
                  <ButtonTabs key={index + 99}  showAll={true} buttonIndexs={item.buttonIndexs} setIndex={(index) => {
                    NavigationService.push(PRIVATESCREENS.MEDICAL_FILE_VIEWER, {
                      activeIndex: index
                    });
                  }}></ButtonTabs>
                </View>
              </View>
            )
          })
        }
      </View>
    </SafeAreaView>
  )
}
export default ClinicalReport

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
    backgroundColor: '#fafafa'
  },
  infoContainer: {
    paddingHorizontal: 36,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#BABCB7',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userIcon: {
    width: 65,
    height: 65,
    marginRight: 18,
    marginBottom: 16
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#383D39',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24
  },
  itemTitle: {
    fontSize: 13,
    color: '#888B88',
  },
  itemValue: {
    fontSize: 13,
    color: '#383D39',
  },
  reportTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    paddingTop: 27,
    paddingBottom: 22,
  },
  title: {
    fontSize: 18,
    color: "#000",
  },
  titleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 13,
    color: "#888B88",
    marginLeft: 8,
  },
  reportItem: {
    paddingHorizontal: 36,
    marginBottom: 20
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },
  dateText: {
    fontSize: 13,
    color: "#888B88",
    lineHeight: 19,
    marginRight: 15,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#BABCB7",
  },
  greenText: {
    fontSize: 13,
    color: "#7BA040",
    lineHeight: 17,
    marginBottom: 2,
  },
  subText: {
    fontSize: 16,
    color: "#383D39",
    lineHeight: 24,
    marginBottom: 9,
  },
  buttonList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})
