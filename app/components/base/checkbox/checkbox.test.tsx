import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import Checkbox from './'

test('CheckBox', () => {
  const onToggle = jest.fn()
  const testId = 'checkbox'
  const { getByTestId, update } = render(<Checkbox onToggle={onToggle} testId={testId} />)
  fireEvent.press(getByTestId(testId))
  // not present
  expect(() => getByTestId('fill')).toThrow()
  expect(onToggle).toHaveBeenCalledWith(true)
  const [[v1]] = onToggle.mock.calls
  update(<Checkbox onToggle={onToggle} testId={testId} value={v1} />)
  // present
  expect(() => getByTestId('fill')).not.toThrow()
  fireEvent.press(getByTestId(testId))
  expect(onToggle).toHaveBeenCalledWith(false)
  const [, [v2]] = onToggle.mock.calls
  update(<Checkbox onToggle={onToggle} testId={testId} value={v2} />)
  // not present
  expect(() => getByTestId('fill')).toThrow()
})
