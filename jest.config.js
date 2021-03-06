module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: [
    './node_modules',
    './example',
    './lib/',
    '<rootDir>/__tests__/test-utils.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.[jt]s?(x)',
    '!src/**/*.d.[jt]s?(x)',
    '!src/index.ts',
    '!src/types/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
  },
  testResultsProcessor: 'jest-sonar-reporter',
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__tests__/setup.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-native-picker|@react-navigation|redux-persist)',
  ],
};
