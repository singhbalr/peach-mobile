import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ImageSource } from 'react-native-vector-icons/Icon'
import * as NavigationService from "react-navigation-helpers"
import { PRIVATESCREENS } from "@shared-constants"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { setSidebarState } from '@screens/auth/rx/reducer'
import { t } from "i18next";

type Props = {
}
type ItemProps = {
  index: string | number,
  icon: ImageSource,
  title: string,
  length: number,
  onPressList: (arg0: string | number) => void,
}

const Item: React.FC<ItemProps> = ({title, icon, index, length, onPressList}: ItemProps) => {
  return (
    <View style={[styles.itemView, index === length - 1 ? {borderBottomWidth: 0} : {}]}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPressList(index)}
      >
          <Image source={icon} style={styles.itemIcon}></Image>
          <Text style={styles.itemTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const Sidebar: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const sidebarState = useSelector((state: RootState) => state.auth.sidebarState)
  const navList = [
    {
      title: t("Sidebar.Settings"),
      icon: require('../assets/sidebar/settings.png'),
      command: 'settings',
    },
    {
      title: t("Sidebar.MyShareData"),
      icon: require('../assets/sidebar/bell.png'),
      command: 'sharedData',
    },
    {
      title: t("Sidebar.Useful"),
      icon: require('../assets/sidebar/info.png'),
      command: 'info',
    },
    {
      title: t("Sidebar.Support"),
      icon: require('../assets/sidebar/support.png'),
      command: 'support',
    },
    {
      title: t("Sidebar.LogOut"),
      icon: require('../assets/sidebar/logout.png'),
      command: 'logout',
    },
  ]
  const clickNavItem = (command: string) => {
    console.log(command)
    switch (command) {
      case 'settings':
        break
      case 'sharedData':
        NavigationService.push(PRIVATESCREENS.MY_SHARE_DATA, {})
        break
      case 'info':
        break
      case 'support':
        break
      case 'logout':
        // setLogoutModalVisible(true)
        break
      default:
        break
    }
    dispatch(setSidebarState(false))
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
      >
        {navList.map((item, index) => {
          return (
            <Item
              key={`nav-item-${index}`}
              index={index}
              icon={item.icon}
              title={item.title}
              onPressList={() => {
                clickNavItem(item.command)
              }}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}
export default Sidebar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 82,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  scrollViewContainer: {
    paddingLeft: 38,
    paddingRight: 43,
  },
  itemView: {
    borderBottomWidth: 1,
    borderColor: '#BABCB7',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
  },
  itemIcon: {
    width: 16,
    height: 16,
    marginRight: 19
  },
  itemTitle: {
    fontSize: 16,
    color: '#383D39'
  }
})
