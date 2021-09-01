module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'prettier', 'cypress'],
  rules: {
    eqeqeq: 'error',
    'no-console': 0,
    'react/prop-types': 0,
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
