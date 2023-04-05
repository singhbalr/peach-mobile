import React from 'react'
import { StyleSheet, View } from 'react-native'
import GeneticSvg from "../assets/icons/genetic.svg";
import GeneticUnselectSvg from "../assets/icons/genetic-unselect.svg";
import MedicalSvg from "../assets/icons/medical.svg";
import MedicalUnselectSvg from "../assets/icons/medical-unselect.svg";
import ClinicalSvg from "../assets/icons/clinical.svg";
import ClinicalUnselectSvg from "../assets/icons/clinical-unselect.svg";
import IconButton from './IconButton';

type Props = {
  activeIndex?: number
  setIndex?: (index: number) => void
  showAll?: boolean
  buttonIndexs?: Array<number>
}

const ButtonTabs: React.FC<Props> = (props: Props) => {
  const { activeIndex, setIndex, showAll, buttonIndexs } = props
  const selectTab = (index: number) => {
    setIndex && setIndex(index)
  }
  const buttonList = [{
    title: 'Genetic Data',
    activeBgColor: '#edf1e9',
    activeTextColor: '#7BA040',
    icon: <GeneticSvg />,
    unselectIcon: <GeneticUnselectSvg />
  }, {
    title: 'Medical Imaging',
    activeBgColor: '#eef2f3',
    activeTextColor: '#66A3AF',
    icon: <MedicalSvg />,
    unselectIcon: <MedicalUnselectSvg />
  }, {
    title: 'Clinical Record',
    activeBgColor: '#F8F1F2',
    activeTextColor: '#F596AA',
    icon: <ClinicalSvg />,
    unselectIcon: <ClinicalUnselectSvg />
  }]
  return (
    <View style={[styles.buttonTabs, showAll ? styles.showAllView : {}]}>
      {
        buttonList.map((item, index) => {
          if (buttonIndexs && buttonIndexs.length > 0 && !buttonIndexs.includes(index)) {
            return <></>
          }
          return (
            <View key={index} style={styles.btnView}>
              <IconButton
                key={index}
                buttonIcon={activeIndex === index || showAll ? item.icon :item.unselectIcon}
                buttonText={item.title}
                buttonStyle={{backgroundColor: activeIndex === index || showAll ? item.activeBgColor : '#fff'}}
                buttonTextStyle={{color: activeIndex === index || showAll ? item.activeTextColor : '#BABCB7'}}
                onPress={() => selectTab(index)}
              />
            </View>
          )
        })
      }
    </View>
  )
}
export default ButtonTabs

const styles = StyleSheet.create({
  buttonTabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 33,
    backgroundColor: '#fff'
  },
  showAllView: {
    flex: 1,
    paddingHorizontal: 0
  },
  btnView: {
    marginRight: 6
  }
})
