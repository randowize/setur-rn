/* eslint-disable react-native/no-inline-styles */
import React from "react"
import Checkbox from "@components/base/checkbox"
import { useMultiple } from "./hooks"
import { ViewStyle } from "react-native"

type Props = {
  items?: any[]
  multiple?: boolean
  outlineStyle?: ViewStyle
  fillStyle?: ViewStyle
  tx?: string
  onChange?: (v: unknown) => void
}

const Checkboxes = (props: Props) => {
  const { values, toggleCheckBox } = useMultiple(props.multiple, props.onChange)
  return (props.items ?? []).map((x) => (
    <Checkbox
      key={x.key}
      onToggle={() => toggleCheckBox(x.key, x)}
      text={x.label}
      value={values.filter((v) => v.key === x.key).length !== 0}
      style={{ marginRight: 40 }}
      outlineStyle={props.outlineStyle}
      fillStyle={props.fillStyle}
      tx={props.tx}
    />
  ))
}

export default Checkboxes
