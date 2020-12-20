import * as DEV_ENV from './env.dev'
import * as PROD_ENV from './env.prod'
const ENV = __DEV__ ? DEV_ENV : PROD_ENV

export default ENV
