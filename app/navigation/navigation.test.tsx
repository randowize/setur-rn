import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent, within } from '@testing-library/react-native'
import { translate } from '@modules/i18n'
import AppNavigator from './tab-navigator'
import * as userService from '@services/user'
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))
jest.mock('@services/user', () => ({ addUser: jest.fn(() => ({ data: () => 1, id: 1 })) }))
// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
const component = (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
)

describe('App Navigation', () => {
  test('renders tabs', async () => {
    const { findByText } = render(component)
    const homeTab = await findByText(translate('tabs.home'))
    const settingsTab = await findByText(translate('tabs.settings'))

    expect(homeTab).toBeTruthy()
    expect(settingsTab).toBeTruthy()
  })

  test('renders home screen by default', async () => {
    const { findByTestId } = render(component)
    const WebView = await findByTestId('webview')
    expect(WebView).toBeTruthy()
  })

  test('clicking on `seetings` tab takes you to the settings screen', async () => {
    const { findByText } = render(component)
    const toClick = await findByText(translate('tabs.settings'))

    fireEvent(toClick, 'press')
    const poolOption = await findByText(/havuz/gi)
    expect(poolOption).toBeTruthy()
  })

  test.only('activates `submit button` if mail is valid and language is set', async () => {
    const { findByText, debug, findByTestId } = render(component)
    const toClick = await findByText(translate('tabs.settings'))
    await fireEvent(toClick, 'press')
    const trLang = await findByText(/Turk/gi)
    const input = await findByTestId('email')
    const btn = await findByText(translate('common.send'))
    await fireEvent.changeText(input, 'wron.fr')
    await fireEvent(btn, 'press')
    expect(userService.addUser).not.toHaveBeenCalled()
    await fireEvent.changeText(input, 'amil@setur.tr')
    await fireEvent(input, 'blur')
    await fireEvent(trLang, 'press')
    expect(within(trLang.parent).findByTestId('fill')).toBeTruthy()
    await fireEvent(btn, 'press')
    expect(userService.addUser).toHaveBeenCalled()
  })
})
