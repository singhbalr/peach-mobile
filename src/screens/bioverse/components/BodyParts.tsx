import React, { useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import ArrowRightSvg from "../../../assets/dashboard/arrow-right.svg";
import ReportSvg from "../../../assets/dashboard/report.svg";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { toggleNotificationIconState } from 'redux/reducer'

type ItemProps = {
  index: string | number;
  item: string;
  length: number;
  fileRecordList: any;
  onPressList: (arg1: string | number) => void;
};
const Item: React.FC<ItemProps> = ({
  index,
  item,
  length,
  fileRecordList,
  onPressList,
}: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPressList(item, index)}
      style={[
        styles.itemContainer,
        index === length - 1 ? { borderBottomWidth: 0 } : {},
      ]}
    >
      <View style={styles.itemView}>
        <View style={item.icon ? styles.svgIcon : {}}>
          {item.icon}
        </View>
        <Text>{item.name}</Text>
        {fileRecordList[item.name.toLowerCase()] > 0 && (
          <>
            <ReportSvg style={styles.reportIcon}></ReportSvg>
            <Text style={styles.reportCount}> {fileRecordList[item.name.toLowerCase()]}</Text>
          </>
        )}
      </View>
      <ArrowRightSvg />
    </TouchableOpacity>
  );
};

type Props = {
  title: string
  dataList: string[]
  fileRecordList: any
  onPressList: (index: number | string) => void;
}

const BodyParts: React.FC<Props> = (props: Props) => {
  const {
    title, dataList, fileRecordList, onPressList,
  } = props
  const dispatch = useDispatch()
  const notificationIconState = useSelector((state: RootState) => state.app.notificationIconState)

  useEffect(() => {
    dispatch(toggleNotificationIconState(true))
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
        <FlatList
          data={dataList}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              fileRecordList={fileRecordList}
              length={dataList.length}
              onPressList={() => onPressList(item.name)}
            />
          )}
          style={[styles.flatList]}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  )
}
export default BodyParts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    // fontFamily: 'Titillium Web',
    width: "100%",
    fontWeight: "bold",
    fontSize: 22,
    color: "#383D39",
    lineHeight: 33,
    textAlign: "left",
  },
  flatList: {
    width: "100%",
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72,
    borderBottomWidth: 1,
    borderColor: "#BABCB7",
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
  },
  svgIcon: {
    marginRight: 13,
  },
  reportIcon: {
    marginLeft: 10,
    marginRight: 6,
  },
  reportCount: {
    fontSize: 13,
    color: "#888B88",
  },
})
