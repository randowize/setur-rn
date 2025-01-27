import Tron, { networking } from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { ReactotronConfig, DEFAULT_REACTOTRON_CONFIG } from './reactotron-config'
import { clear } from '@utils/storage'
import { RootNavigation } from '@navigation'

// Teach TypeScript about the bad things we want to do.
declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: typeof Tron
  }
}

/** Do Nothing. */
const noop = () => undefined

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__) {
  console.tron = Tron // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
  console.tron = {
    benchmark: noop,
    clear: noop,
    close: noop,
    configure: noop,
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    onCustomCommand: noop,
    overlay: noop,
    reportError: noop,
    send: noop,
    startTimer: noop,
    storybookSwitcher: noop,
    use: noop,
    useReactNative: noop,
    warn: noop,
  }
}

/**
 * You'll probably never use the service like this since we hang the Reactotron
 * instance off of `console.tron`. This is only to be consistent with the other
 * services.
 */
export class Reactotron {
  config: ReactotronConfig

  rootStore: any

  /**
   * Create the Reactotron service.
   *
   * @param config the configuration
   */
  constructor(config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG) {
    // merge the passed in config with some defaults
    this.config = {
      host: 'localhost',
      useAsyncStorage: true,
      ...config,
      state: {
        initial: false,
        snapshots: false,
        ...(config && config.state),
      },
    }
  }

  /**
   * Configure reactotron based on the the config settings passed in, then connect if we need to.
   */
  async setup() {
    // only run this in dev... metro bundler will ignore this block: 🎉
    if (__DEV__) {
      // configure reactotron
      Tron.configure({
        name: this.config.name || require('@package.json').name,
        host: this.config.host,
      })

      // hookup middleware
      if (this.config.useAsyncStorage) {
        Tron.setAsyncStorageHandler(AsyncStorage)
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      Tron.useReactNative({
        asyncStorage: this.config.useAsyncStorage ? undefined : false,
      })
      Tron.use(
        networking({
          ignoreUrls: /\/(logs|symbolicate|firebase|firestore)$/,
        }),
      )
      // connect to the app
      Tron.connect()

      // Register Custom Commands
      Tron.onCustomCommand({
        title: 'Reset Root Store',
        description: 'Resets the MST store',
        command: 'resetStore',
        handler: () => {
          console.tron.log('resetting store')
          clear()
        },
      })

      Tron.onCustomCommand({
        title: 'Reset Navigation State',
        description: 'Resets the navigation state',
        command: 'resetNavigation',
        handler: () => {
          console.tron.log('resetting navigation state')
          RootNavigation.resetRoot({ routes: [] })
        },
      })

      Tron.onCustomCommand({
        title: 'Go Back',
        description: 'Goes back',
        command: 'goBack',
        handler: () => {
          console.tron.log('Going back')
          RootNavigation.goBack()
        },
      })

      // clear if we should
      if (this.config.clearOnLoad) {
        Tron.clear()
      }
    }
  }
}

export const ReactotronInstance = new Reactotron()
