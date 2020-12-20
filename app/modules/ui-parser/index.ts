import InputField from "@components/base/input-field"
import Checkboxes from "@components/multi-checkboxes"
import * as choice from "./choice"
import * as input from "./input"
import uiDescription from "./fixtures/ui.json"

const ComponentRegistry = {
  input: InputField,
  choice: Checkboxes,
}

type Parsers = {
  [key: string]: {
    parse(desc: any): any
  }
}

const defaultParsers: Parsers = {
  choice,
  input,
}

const EmptyUi = () => null

export const parserFactory = (registry = ComponentRegistry, parsers = defaultParsers) => (
  description = uiDescription,
) => {
  const { title, controls } = description
  const ui = controls.map((desc) => {
    return {
      Component: registry[desc.type] ?? EmptyUi,
      props: parsers[desc.type]?.parse(desc) ?? {},
      type: desc.type,
      label: desc.caption,
    }
  })
  return {
    title,
    ui,
  }
}

const defaultParse = parserFactory()

export default defaultParse
