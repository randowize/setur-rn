module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.ts', '.tsx', '.ios.js', '.android.js'],
        alias: {
          '@components': './app/components',
          '@config': './app/config',
          '@services': './app/services',
          '@navigation': './app/navigation',
          '@models': './app/models',
          '@modules': './app/modules',
          '@theme': './app/theme',
          '@screens': './app/screens',
          '@utils': './app/utils',
          '@package.json': './package.json',
          '@assets': './assets',
        },
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
  ],
}
