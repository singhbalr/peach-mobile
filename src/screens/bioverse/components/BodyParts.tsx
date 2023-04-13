import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ArrowRightSvg from "../../../assets/dashboard/arrow-right.svg";
import ReportSvg from "../../../assets/dashboard/report.svg";

type ItemProps = {
  index: string | number;
  item: { name: string; icon: any; reportCount: number };
  length: number;
  fileRecordList: any;
  onPressList: any;
};
const Item: React.FC<ItemProps> = ({
  index,
  item,
  length,
  fileRecordList,
  onPressList,
}: ItemProps) => {
  console.log(item);
  return (
    <TouchableOpacity
      onPress={() => onPressList(item.name)}
      style={[
        styles.itemContainer,
        index === length - 1 ? { borderBottomWidth: 0 } : {},
      ]}
    >
      <View style={styles.itemView}>
        <View style={item.icon ? styles.svgIcon : {}}>{item.icon}</View>
        <Text>{item.name}</Text>
        {fileRecordList[item.name.toLowerCase()] > 0 && (
          <>
            <ReportSvg style={styles.reportIcon}></ReportSvg>
            <Text style={styles.reportCount}>
              {" "}
              {fileRecordList[item.name.toLowerCase()]}
            </Text>
          </>
        )}
      </View>
      <ArrowRightSvg />
    </TouchableOpacity>
  );
};

type Props = {
  title: string;
  dataList: { name: string; icon: any; reportCount: number }[];
  fileRecordList: any;
  onPressList: any;
};

const BodyParts: React.FC<Props> = (props: Props) => {
  const { title, dataList, fileRecordList, onPressList } = props;

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
            onPressList={onPressList}
          />
        )}
        style={[styles.flatList]}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default BodyParts;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
});
