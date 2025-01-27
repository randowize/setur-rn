import React from 'react'
import { View, TextInput, TextStyle, ViewStyle } from 'react-native'
import { color, spacing, typography } from '../../../theme'
import { translate } from '../../../modules/i18n'
import { Text } from '../text/text'
import { InputFieldProps } from './input-field.props'
import { mergeAll, flatten } from 'ramda'

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.palette.black,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export function InputField(props: InputFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    inputWrapperStyle,
    labelStyle,
    ...rest
  } = props
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] }
  containerStyle = enhance(containerStyle, styleOverride)

  let inputStyle: TextStyle = INPUT
  inputStyle = enhance(inputStyle, inputStyleOverride)
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyle}>
      <Text preset="fieldLabel" tx={labelTx} text={label} style={labelStyle} />
      <View style={inputWrapperStyle}>
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
          onChangeText={(text) => rest.onChangeText?.(text)}
          testID="email"
        />
      </View>
    </View>
  )
}

export default InputField
