type ChoiceDescription = {
  caption: string
  multiple?: boolean
  items: { [key: string]: string }
}
export const parse = ({ caption, multiple, items }: ChoiceDescription) => {
  return {
    label: caption,
    items: Object.keys(items).map((key) => ({ key, label: items[key] })),
    multiple,
  }
}
