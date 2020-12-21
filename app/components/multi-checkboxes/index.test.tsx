import React from 'react'
import { render, fireEvent, within } from '@testing-library/react-native'
import MultiCheckboxes from './'

describe('multi checkboxes', () => {
  test('multiple disabled: allows only one value to be selected', () => {
    const onChange = jest.fn()
    const items = [
      { key: 0, label: 'zero' },
      { key: 1, label: 'one' },
    ]
    const { getByTestId } = render(<MultiCheckboxes items={items} onChange={onChange} />)
    const firstCheckbox = getByTestId('checkbox-0')
    const secondCheckbox = getByTestId('checkbox-1')
    fireEvent.press(firstCheckbox)
    expect(within(firstCheckbox).getByTestId('fill')).toBeTruthy()
    expect(() => within(secondCheckbox).getByTestId('fill')).toThrow()
    fireEvent.press(secondCheckbox)
    expect(within(secondCheckbox).getByTestId('fill')).toBeTruthy()
    expect(() => within(firstCheckbox).getByTestId('fill')).toThrow()
  })
  test('multiple enabled: allows  multiples value to be selected', () => {
    const onChange = jest.fn()
    const items = [
      { key: 0, label: 'zero' },
      { key: 1, label: 'one' },
    ]
    const { getByTestId } = render(<MultiCheckboxes items={items} onChange={onChange} multiple />)
    const firstCheckbox = getByTestId('checkbox-0')
    const secondCheckbox = getByTestId('checkbox-1')
    fireEvent.press(firstCheckbox)
    expect(within(firstCheckbox).getByTestId('fill')).toBeTruthy()
    expect(() => within(secondCheckbox).getByTestId('fill')).toThrow()
    fireEvent.press(secondCheckbox)
    expect(within(secondCheckbox).getByTestId('fill')).toBeTruthy()
    expect(within(firstCheckbox).getByTestId('fill')).toBeTruthy()
    fireEvent.press(secondCheckbox)
    expect(() => within(secondCheckbox).getByTestId('fill')).toThrow()
  })
})
