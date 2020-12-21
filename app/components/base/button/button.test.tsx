import React from 'react'
import { render } from '@testing-library/react-native'
import Button from './'

describe('Button', () => {
  test('fallack text to `text` prop', () => {
    const { getByText } = render(<Button text="Click here" />)
    expect(getByText(/Click/i)).toBeTruthy()
  })
  test('i18n text has priotory', () => {
    const { getByText } = render(<Button tx="common.ok" text="ok" />)
    expect(getByText(/common\.ok\.test/)).toBeTruthy()
  })
})
