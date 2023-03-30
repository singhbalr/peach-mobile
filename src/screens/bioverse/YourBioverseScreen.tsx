import React, { useState } from "react"
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Animated
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as NavigationService from "react-navigation-helpers"
import { PRIVATESCREENS } from "@shared-constants"
import Header from "../../components/Header"
import Popup from "../../components/Popup"
import MaleBodySvg from "../../assets/dashboard/male-body.svg"
import ReportSvg from "../../assets/dashboard/report.svg"
import { TouchableOpacity } from "react-native-gesture-handler"
interface HomeScreenProps {}
interface ButtonProps {
  buttonText: string
  reportCount?: Number
  buttonStyles?: ViewStyle
  onPress?: () => void
}
const BodyButton: React.FC<ButtonProps> = (props) => {
  const { buttonText, reportCount, buttonStyles, onPress } = props
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.bodyButton, buttonStyles]} onPress={onPress}>
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{buttonText}</Text>
        {
          reportCount ? (
            <>
              <ReportSvg style={styles.btnIcon}></ReportSvg>
              <Text style={styles.reportCount}>{reportCount}</Text>
            </>
          ) : <></>
        }
      </View>
    </TouchableOpacity>
  )
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<object>({
    name: '',
    children: [],
  })
  const onPressList = () => {
    setPopupVisible(false)
    NavigationService.push(PRIVATESCREENS.BIOVERSE_DETAIL_SCREEN, {})
  }
  const selectBodyParts = (item: React.SetStateAction<object>) => {
    setPopupVisible(true)
    setActiveItem(item)
    handlePress()
  }
  const [animation] = useState(new Animated.Value(0));
  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const buttonList = [{
    name: 'Head & Neck',
    classname: 'buttonOne',
    reportCount: 4,
    children: [],
  }, {
    name: 'Thorax',
    classname: 'buttonTwo',
    reportCount: 4,
    children: [],
  }, {
    name: 'Upper Abdomen',
    classname: 'buttonThree',
    reportCount: 0,
    children: [{
      name: 'Liver',
      reportCount: 0,
    }, {
      name: 'Pancreas',
      reportCount: 0,
    }, {
      name: 'Stomach',
      reportCount: 0,
    }, {
      name: 'Gallbladder',
      reportCount: 4,
    }, {
      name: 'Spleen',
      reportCount: 4,
    }, ],
  }, {
    name: 'Lower Abdomen',
    classname: 'buttonFour',
    reportCount: 0,
    children: [],
  }, {
    name: 'Limbs',
    classname: 'buttonFive',
    reportCount: 0,
    children: [],
  }, {
    name: 'Blood & Others',
    classname: 'buttonSix',
    reportCount: 0,
    children: [{
      name: 'Blood',
    }, {
      name: 'Bones',
    }, {
      name: 'Genetics',
    }, {
      name: 'glands',
    }, {
      name: 'joints and bones (Other than limbs or ribs)',
    }, {
      name: 'lymph',
    }, {
      name: 'medication',
    }, {
      name: 'mental',
    }, {
      name: 'other bodily fluids',
    }, {
      name: 'semen',
    }, {
      name: 'skin',
    }],
  }]

  return (
    <SafeAreaView style={styles.container}>
      <Header titleText={"Your Bioverse"} subTitleText={"Explore your body anytime, anywhere."}></Header>
      <View style={styles.bodyContainer}>
        {
          buttonList.map((item, index) => {
            return (
              <View key={item.name} style={styles[item.classname]}>
                <BodyButton buttonText={item.name} reportCount={item.reportCount} onPress={() => {
                  selectBodyParts(item)
                }}></BodyButton>
              </View>
            )
          })
        }
        {/* <View style={styles.buttonOne}>
          <BodyButton buttonText={'Head & Neck'} reportCount={4} onPress={selectBodyParts}></BodyButton>
        </View>
        <View style={styles.buttonTwo}>
          <BodyButton buttonText={'Thorax'} reportCount={4}></BodyButton>
        </View>
        <View style={styles.buttonThree}>
          <BodyButton buttonText={'Upper Abdomen'}></BodyButton>
        </View>
        <View style={styles.buttonFour}>
          <BodyButton buttonText={'Lower Abdomen'}></BodyButton>
        </View>
        <View style={styles.buttonFive}>
          <BodyButton buttonText={'Limbs'}></BodyButton>
        </View>
        <View style={styles.buttonSix}>
          <BodyButton buttonText={'Blood &\n Others'}></BodyButton>
        </View> */}
        <View style={styles.bodySvg}>
          <MaleBodySvg height={460}></MaleBodySvg>
        </View>
      </View>
      {
        popupVisible && (
          <View style={styles.bodyDetailView}>
            {/* <Animated.Image
              source={require("../../assets/dashboard/body-detail-1x.png")}
              style={[styles.bodyDetailImage, { transform: [{ translateY }, { scale }] }]}
            /> */}
            <Image source={require("../../assets/dashboard/body-detail1.png")} style={styles.bodyDetailImage} resizeMode={'cover'}></Image>
          </View>
        )
      }
      <Popup
        visible={popupVisible}
        title={activeItem.name}
        dataList={activeItem.children}
        onPressList={onPressList}
        onClose={() => {
          setPopupVisible(false)
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  bodyContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    flex: 1,
  },
  bodySvg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 460,
    zIndex: -1,
  },
  bodyButton: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minWidth: 100,
    fontSize: 13,
    color: '#7BA040',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  buttonOne: {
    position: 'absolute',
    top: '5%',
    right: '9%',
  },
  buttonTwo: {
    position: 'absolute',
    top: '20%',
    left: '15%',
  },
  buttonThree: {
    position: 'absolute',
    top: '31%',
    right: '11%',
  },
  buttonFour: {
    position: 'absolute',
    top: '42%',
    left: '9%',
  },
  buttonFive: {
    position: 'absolute',
    top: '62%',
    right: '19%',
  },
  buttonSix: {
    position: 'absolute',
    top: '83%',
    right: '10%',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  btnIcon: {
    marginLeft: 15
  },
  buttonText: {
    // fontFamily: 'Roboto',
    color: '#7BA040',
  },
  reportCount: {
    fontSize: 13,
    color: '#888B88',
    marginLeft: 6
  },
  bodyDetailView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9,
    backgroundColor: '#fafafa'
  },
  bodyDetailImage: {
    width: '100%',
    height: '110%',
  }
})