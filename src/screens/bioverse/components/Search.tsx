import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import InputSearchSvg from "../../../assets/dashboard/input-search.svg";
import ReportSvg from "../../../assets/dashboard/report.svg";

type ItemProps = {
  index: string | number;
  item: { name: string; icon: any; reportCount: number; };
  length: number;
  onPressList: (arg1: { name: string; icon: any; reportCount: number; }) => void;
};
const Item: React.FC<ItemProps> = ({
  index,
  item,
  length,
  onPressList,
}: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPressList(item)}
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
      </View>
    </TouchableOpacity>
  );
};

type Props = {
  buttonList: []
  // title: string
  // fileRecordList: any
  // onPressList: (index: number | string) => void;
}

const Search: React.FC<Props> = (props: Props) => {
  const {
    buttonList
  } = props
  const [searchVal, setSearchVal] = useState<string>('')
  const [searchResult, setSearchResult] = useState<[]>([])
  const searchChange = (nativeEvent) => {
    console.log(111, nativeEvent?.text)
    if (!nativeEvent?.text) {
      setSearchResult([])
      return false
    }
    const arr = []
    buttonList.map(item => {
      if (item.children) {
        item.children.filter(child => {
          if (child.name.includes(nativeEvent?.text)) {
            arr.push(child)
          }
        })
      }
    })
    setSearchResult(arr)
  }
  const onPressList = (name: string) => {
    console.log({name})
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <InputSearchSvg></InputSearchSvg>
        <TextInput
          style={styles.textInput}
          autoFocus
          onChangeText={text => setSearchVal(text)}
          value={searchVal}
          onChange={({nativeEvent}) => searchChange(nativeEvent)}
        />
      </View>
      <FlatList
        data={searchResult}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            index={index}
            length={searchResult.length}
            onPressList={() => onPressList(item.name)}
          />
        )}
        style={[styles.flatList]}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
export default Search

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 45,
    backgroundColor: '#606461'
  },
  textInput: {
    flex: 1,
    height: 45,
    color: '#fff',
    paddingLeft: 15,
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
