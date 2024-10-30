/* eslint-disable */
export default {
  displayName: 'adapter',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest', {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        // XXX: for being able to use "verbatimModuleSyntax"; see
        // https://github.com/kulshekhar/ts-jest/issues/4081#issuecomment-2308805678
        isolatedModules: true,
      }
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/adapter',
};
