import * as validators from "@utils/validators"
type InputDescription = {
  caption: string
  validator?: keyof typeof validators
  items: { [key: string]: string }
}

export const parse = ({ caption, validator }: InputDescription) => {
  return {
    label: caption,
    validate: validators[validator],
  }
}
