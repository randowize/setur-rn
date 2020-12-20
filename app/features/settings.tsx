/* eslint-disable react-native/no-unused-styles */
import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import Screen from "@components/screen"
import parse from "@modules/ui-parser"
import { color } from "@theme"
import Text from "@components/base/text"

const parsedDescription = parse()

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  input: {
    borderColor: color.line,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  section: {
    marginVertical: 20,
    position: "relative",
  },
  sectionContent: {},
  sectionTitle: {
    color: color.primaryDarker,
    marginBottom: 10,
    position: "relative",
  },
})

const ExtraProps = {
  input: (label: string) => ({
    getStyleOverride: () => styles.input,
  }),
  choice: (label: string) => {
    return {
      multiline: /dil/i.test(label),
    }
  },
  sectionContent: (label: string) => {
    return {
      style: {
        flexDirection: /dil/i.test(label) ? "row" : "column",
      } as ViewStyle,
    }
  },
}

const Section: React.FC<{ title?: string; style?: ViewStyle }> = ({ title, children, style }) => {
  return (
    <View style={styles.section}>
      {title ? <Text text={title} style={styles.sectionTitle} /> : null}
      <View style={[styles.sectionContent, style]}>{children}</View>
    </View>
  )
}

export const SettingsScreen = () => {
  return (
    <Screen style={styles.container} unsafe>
      {parsedDescription.ui.map(({ Component, props, type, label }, key) => (
        <Section
          key={key}
          title={type !== "input" && label}
          {...(ExtraProps.sectionContent(label) ?? {})}
        >
          <Component {...props} {...(ExtraProps[type]?.(label) ?? {})} />
        </Section>
      ))}
    </Screen>
  )
}

export default SettingsScreen
