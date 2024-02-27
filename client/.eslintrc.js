module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['react-app', 'react-app/jest', 'prettier', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['react', 'prettier', 'react-hooks', 'eslint-plugin-import', 'unused-imports'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    __IS_DEV__: true,
  },
  rules: {
    'no-undef': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'error',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'import/no-cycle': ['error'],
    'import/no-unresolved': 'off',

    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 120,
      },
    ],
    'react/no-unused-prop-types': 'warn',
  },
};
