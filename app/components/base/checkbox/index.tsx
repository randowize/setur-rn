import * as React from 'react'
import { TouchableOpacity, TextStyle, ViewStyle, View } from 'react-native'
import { Text } from '../text/text'
import { color, spacing } from '@theme'
import { CheckboxProps } from './checkbox.props'
import { mergeAll, flatten } from 'ramda'

const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: spacing[1],
  alignSelf: 'flex-start',
}

const DIMENSIONS = { width: 16, height: 16 }

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.primaryDarker,
  borderRadius: 8,
}

const fillSize = DIMENSIONS.width - 6
const FILL: ViewStyle = {
  width: fillSize,
  height: fillSize,
  backgroundColor: color.primary,
  borderRadius: fillSize / 2,
}

const LABEL: TextStyle = { paddingLeft: spacing[2] }

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = mergeAll(flatten([ROOT, props.style]))
  const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]))
  const fillStyle = mergeAll(flatten([FILL, props.fillStyle]))

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
      testID={props.testId}
    >
      <View style={outlineStyle}>
        {props.value ? <View style={fillStyle} testID="fill" /> : null}
      </View>
      <Text
        text={props.text}
        tx={props.tx}
        numberOfLines={numberOfLines}
        style={[LABEL, { color: color.palette.black }]}
      />
    </TouchableOpacity>
  )
}

export default Checkbox
