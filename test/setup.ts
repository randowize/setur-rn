// we always make sure 'react-native' gets included first
import 'react-native'

// libraries to mock
import './mock-async-storage'
import './mock-i18n'
import './mock-react-native-localize'

declare global {
  let __TEST__
}
