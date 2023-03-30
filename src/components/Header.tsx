import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import InfoSvg from "../assets/dashboard/info.svg"
import MenuSvg from "../assets/dashboard/menu.svg"

type Props = {
  titleText: string
  subTitleText?: string
}
// props: [propsType: defaultValue] props introduce
// props.titleText: [String] header title
// props.subTitleText: [String] header subtitle
const Header: React.FC<Props> = (props: Props) => {
  const {
    titleText,
    subTitleText,
  } = props
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>
          {titleText}
        </Text>
        <View style={styles.buttonContainer}>
          <InfoSvg style={[styles.icon, styles.infoIcon]}></InfoSvg>
          <MenuSvg style={[styles.icon, styles.menuIcon]}></MenuSvg>
        </View>
      </View>
      <Text style={styles.subTitle}>
        {subTitleText}
      </Text>
    </View>
  )
}
export default Header

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: 74,
    paddingBottom: 20,
    paddingHorizontal: 35,
    color: '#fff',
    backgroundColor: '#fafafa',
    zIndex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    // fontFamily: 'Titillium Web',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#383D39',
    lineHeight: 33,
    marginBottom: 3,
  },
  subTitle: {
    // fontFamily: 'Roboto',
    fontSize: 13,
    color: '#606461',
    lineHeight: 19,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  icon: {
    color: '#ff5655'
  },
  infoIcon: {
    marginRight: 30,
  },
  menuIcon: {
    marginTop: 2
  }
})
