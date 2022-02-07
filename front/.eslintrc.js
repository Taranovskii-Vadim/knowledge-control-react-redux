'use strict';

const clientRules = {
  'import/prefer-default-export': 'off',
  'jsx-a11y/no-static-element-interactions': 'off',
  'jsx-a11y/click-events-have-key-events': 'off',
  'jsx-a11y/no-noninteractive-element-interactions': 'off',
  'no-undef': 'off',
  'react/destructuring-assignment': 'off',
  'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  'no-underscore-dangle': ['error', { allow: ['__ENV__'] }],
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    { allowExpressions: true, allowHigherOrderFunctions: true, allowTypedFunctionExpressions: true },
  ],
  '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
  '@typescript-eslint/no-unused-vars': 'error',
  'react/prop-types': 'off',

  'react/state-in-constructor': 'off',
  'max-classes-per-file': 'off',
  'react/jsx-props-no-spreading': 'off',
  '@typescript-eslint/ban-ts-ignore': 'off',
  // '@typescript-eslint/no-object-literal-type-assertion': 'off',
};

module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['json', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['./src/**/*.{ts,tsx}'],
      globals: {
        __ENV__: 'readonly',
      },
      env: {
        browser: true,
      },
      rules: clientRules,
    },
    {
      files: ['./configs/jest/**/*.js', '**/*.spec.{ts,tsx}'],
      env: {
        jest: true,
      },
    },
    {
      files: ['./*.js', './configs/**/*.js', './scripts/**/*.js'],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: ['error', 'global'],
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  root: true,
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['./*.js', './configs/**/*.js', './**/spec/**/*.{ts,tsx}', './**/*.stories.{ts,tsx}'] },
    ],
    'no-console': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
};
