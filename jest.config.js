module.exports = {
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/node_modules/react-native/jest/setup.js',
    '<rootDir>/test/setup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/e2e'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-native|@react-navigation|@storybook|@react-native-community)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
}
