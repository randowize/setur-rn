/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const reduceMultiple = (
  state: { key: string }[],
  payload: { key: string },
  selectedValuesRef: React.MutableRefObject<any>,
) => {
  const key = payload.key
  if (selectedValuesRef.current[key]) {
    delete selectedValuesRef.current[key]
    return state.filter((x) => x.key !== key)
  }
  selectedValuesRef.current[key] = true
  return [...state, payload]
}

const reduceSingle = (...[, payload]: Parameters<typeof reduceMultiple>) => {
  return [payload]
}

export const useMultiple = (multiple: boolean, onChange?: (v: unknown) => void) => {
  const [values, setValue] = useState([])
  const selectedValuesRef = useRef({})
  const firstValueRef = useRef(values)
  const reducer = useMemo(() => (multiple ? reduceMultiple : reduceSingle), [multiple])
  const toggleCheckBox = useCallback(
    (v, payload) => {
      setValue((state) => reducer(state, payload, selectedValuesRef))
    },
    [reducer],
  )
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    if (firstValueRef.current !== values) onChange?.(values)
  }, [values])
  return { values, toggleCheckBox }
}
