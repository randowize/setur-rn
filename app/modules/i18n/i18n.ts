// import * as RNLocalize from "react-native-localize"
import i18n from 'i18n-js'
import en from './en.json'
import tr from './tr.json'

i18n.fallbacks = true
i18n.translations = { en, tr }

const fallback = { languageTag: 'tr', isRTL: false }

// const { languageTag } =
//   RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback

i18n.locale = 'tr'
