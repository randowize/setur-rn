/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-unused-styles */
import React, { useCallback, useMemo, useState } from 'react'
import { Alert, View, ViewStyle } from 'react-native'
import Screen from '@components/screen'
import parse from '@modules/ui-parser'
import Text from '@components/base/text'
import Button from '@components/base/button'
import { translate } from '@modules/i18n'
import { ExtraProps, styles } from './utils'
import * as userService from '@services/user'

const saveState = async (state) => {
  const doc = await userService.addUser(state)
  return { data: doc.data(), id: doc.id }
}

const parsedDescription = parse()

const Section: React.FC<{ title?: string; style?: ViewStyle }> = ({ title, children, style }) => {
  return (
    <View style={styles.section}>
      {title ? (
        <Text text={translate(title)} style={styles.sectionTitle} preset="fieldLabel" />
      ) : null}
      <View style={[styles.sectionContent, style]}>{children}</View>
    </View>
  )
}

const computeStateKey = (label: string) => {
  switch (label.toLowerCase().trim()) {
    case 'dil':
      return 'language'
    case 'filtre':
      return 'filter'
    default:
      return 'email'
  }
}

export const SettingsScreen = () => {
  const [state, setState] = useState({ email: '', language: [], filter: [] })
  const [isMailValid, setMailValid] = useState(undefined)
  const options = useMemo(() => ({ input: { setMailValid, email: state.email, isMailValid } }), [
    setMailValid,
    state.email,
    isMailValid,
  ])
  const updateState = useCallback(
    (label: string) => (v) => {
      setState((s) => ({ ...s, [computeStateKey(label)]: v }))
    },
    [],
  )
  console.tron.log(isMailValid)
  return (
    <Screen style={styles.container} unsafe>
      {parsedDescription.ui.map(({ Component, props, type: componentType, label }, key) => (
        <Section key={key} {...(ExtraProps.sectionContent(label, componentType) ?? {})}>
          <Component
            {...props}
            {...(ExtraProps[componentType]?.(label, updateState(label), options[componentType]) ??
              {})}
          />
        </Section>
      ))}
      <View style={styles.buttonContainer}>
        <Button
          tx="common.send"
          style={[styles.button, isMailValid ? {} : { opacity: 0.5 }]}
          textStyle={{ fontSize: 19 }}
          disabled={!isMailValid || !state.language.length}
          onPress={async () => {
            const d = await saveState(state)
            Alert.alert(`
            ${translate('success.sendToFirestore')}
             ${JSON.stringify(d, null, 2)}
            `)
          }}
        />
      </View>
    </Screen>
  )
}

export default SettingsScreen
