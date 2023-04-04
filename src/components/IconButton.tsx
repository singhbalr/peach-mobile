import React from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

type Props = {
  buttonText: string
  buttonIcon?: Element
  buttonStyle?: ViewStyle
  buttonTextStyle?: TextStyle
  onPress?: () => void
}

const IconButton: React.FC<Props> = (props: Props) => {
  const {
    buttonText,
    buttonIcon,
    buttonStyle,
    buttonTextStyle,
    onPress
  } = props
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      activeOpacity={0.5}
      onPress={onPress}
    >
      {buttonIcon}
      <Text style={[styles.buttonText, buttonTextStyle]}>{ buttonText }</Text>
    </TouchableOpacity>
  )
}
export default IconButton

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 10,
    color: "#F196A8",
    marginLeft: 4,
  },
})
