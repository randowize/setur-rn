/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo, useRef, useState } from "react"
import Checkbox from "@components/base/checkbox"

type Props = {
  items?: any[]
  multiple?: boolean
}

const reduceMultiple = (
  state: string[],
  v: string,
  selectedValuesRef: React.MutableRefObject<any>,
) => {
  if (selectedValuesRef.current[v]) {
    delete selectedValuesRef.current[v]
    return state.filter((x) => x !== v)
  }
  selectedValuesRef.current[v] = true
  return [...state, v]
}

const reduceSingle = (...[, v]: Parameters<typeof reduceMultiple>) => {
  return [v]
}

const useMultiple = (multiple: boolean) => {
  const [values, setValue] = useState([])
  const selectedValuesRef = useRef({})
  const reducer = useMemo(() => (multiple ? reduceMultiple : reduceSingle), [multiple])
  const toggleCheckBox = useCallback(
    (v) => {
      setValue((state) => reducer(state, v, selectedValuesRef))
    },
    [reducer],
  )
  return { values, toggleCheckBox }
}
const Checkboxes = (props: Props) => {
  const { values, toggleCheckBox } = useMultiple(props.multiple)
  return (props.items ?? []).map((x) => (
    <Checkbox
      key={x.key}
      onToggle={() => toggleCheckBox(x.key)}
      text={x.label}
      value={values.includes(x.key)}
      style={{ marginRight: 40 }}
    />
  ))
}

export default Checkboxes
