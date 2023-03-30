import React from 'react'
import { View, StyleSheet, Modal, FlatList, TouchableOpacity, Text, Dimensions } from 'react-native'
import ArrowRightSvg from "../assets/dashboard/arrow-right.svg"
import LiverSvg from "../assets/dashboard/liver.svg"
import PancreasSvg from "../assets/dashboard/pancreas.svg"
import StomachSvg from "../assets/dashboard/stomach.svg"
import ReportSvg from "../assets/dashboard/report.svg"
const height = Dimensions.get('window').height

type Props = {
  visible: boolean,
  title: string,
  dataList: string[],
  onPressList: (e: Event, index: number) => void,
  onClose: () => void
}
// props: [propsType: defaultValue] props introduce
// props.visible: [Boolean] header title

type ItemProps = {
  index: string | number,
  item: string,
  length: number,
  onPressList: (arg0: string, arg1: string | number) => void,
  onClose: () => void
}
const Item: React.FC<ItemProps> = ({index, item, length, onPressList}: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPressList(item, index)}
      style={[styles.itemContainer, index === length - 1 ? {borderBottomWidth: 0} : {}]}
    >
      <View style={styles.itemView}>
        {item.name === 'Liver' && <LiverSvg style={styles.svgIcon}></LiverSvg>}
        {item.name === 'Pancreas' && <PancreasSvg style={styles.svgIcon}></PancreasSvg>}
        {item.name === 'Stomach' && <StomachSvg style={styles.svgIcon}></StomachSvg>}
        <Text>{item.name}</Text>
        {
          Number(index) > 2 && item.reportCount > 0 && (
            <>
              <ReportSvg style={styles.reportIcon}></ReportSvg>
              <Text style={styles.reportCount}>{item.reportCount}</Text>
            </>
          )
        }
      </View>
      <ArrowRightSvg></ArrowRightSvg>
    </TouchableOpacity>
  )
}
const Header: React.FC<Props> = (props: Props) => {
  const {
    visible,
    title,
    dataList,
    onPressList,
    onClose
  } = props
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={() => {onClose()}}
        >
          <View style={styles.closeButton}></View>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={dataList}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              length={dataList.length}
              onPressList={onPressList}
            />
          )}
          style={[styles.flatList]}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Modal>
  )
}
export default Header

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxHeight: height - 70,
    minHeight: 400,
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 35,
    color: '#fff',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 999,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -65,
    width: 200,
    height: 26,
  },
  closeButton: {
    width: 30,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#e6e6e6'
  },
  title: {
    // fontFamily: 'Titillium Web',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#383D39',
    lineHeight: 33,
    textAlign: 'left'
  },
  flatList: {
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
    borderBottomWidth: 1,
    borderColor: '#BABCB7'
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  svgIcon: {
    marginRight: 13
  },
  reportIcon: {
    marginLeft: 10,
    marginRight: 6
  },
  reportCount: {
    fontSize: 13,
    color: '#888B88'
  }
})
