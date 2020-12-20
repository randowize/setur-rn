import { StyleSheet, ViewStyle } from "react-native"
import { color } from "@theme"
import * as validators from "@utils/validators"

export const styles = StyleSheet.create({
  button: {
    backgroundColor: color.palette.red,
    height: 48,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    position: "relative",
  },
  input: {
    borderColor: color.line,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  labelStyle: {
    color: color.palette.black,
  },
  section: {
    marginVertical: 20,
    position: "relative",
  },
  sectionContent: {},
  sectionTitle: {
    color: color.palette.black,
    marginBottom: 10,
    position: "relative",
  },
})

export const ExtraProps = {
  input: (
    label: string,
    onChangeText: (v: string) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { email = "", setMailValid = (b: boolean) => null, isMailValid = undefined } = {},
  ) => ({
    inputWrapperStyle: styles.input,
    labelStyle: styles.labelStyle,
    placeholderTx: "placeholder.email",
    onChangeText,
    onBlur: () => setMailValid?.(validators.email(email.trim())),
  }),
  choice: (label: string, onChange: (v: unknown) => void) => {
    const isLanguageSection = /dil/i.test(label)
    return {
      multiline: isLanguageSection,
      outlineStyle: {
        borderColor: color.palette.red,
        ...(!isLanguageSection ? { borderRadius: 2 } : {}),
      },
      fillStyle: {
        backgroundColor: color.palette.red,
        ...(!isLanguageSection ? { borderRadius: 1 } : {}),
      },
      onChange,
    }
  },
  sectionContent: (label: string, type: string) => {
    return {
      style: {
        flexDirection: /dil/i.test(label) ? "row" : "column",
      } as ViewStyle,
      title: type !== "input" ? (/dil/i.test(label) ? "label.language" : "label.filter") : null,
    }
  },
}
