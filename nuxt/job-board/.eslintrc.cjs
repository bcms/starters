module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'no-debugger': 'warn',
    'no-shadow': 'error',
    'no-unused-labels': 'error',
    'no-unused-expressions': 'error',
    'comma-dangle': 0,
    'require-await': 0,
    semi: 0,
    'space-before-function-paren': 0,
    quotes: ['error', 'single'],
    'vue/multi-word-component-names': 0,
  },
};
