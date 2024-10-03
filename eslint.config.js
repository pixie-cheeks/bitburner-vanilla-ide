import airbnbBestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import airbnbErrors from 'eslint-config-airbnb-base/rules/errors';
import airbnbEs6 from 'eslint-config-airbnb-base/rules/es6';
import airbnbStrict from 'eslint-config-airbnb-base/rules/strict';
import airbnbVariables from 'eslint-config-airbnb-base/rules/variables';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginImport from 'eslint-plugin-import';
import configPrettier from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
  { files: ['**/*.js'] },
  { ignores: ['*', '!servers', '!servers/**/*', '!{config,eslint.config}.js'] },
  js.configs.recommended,
  { rules: airbnbBestPractices.rules },
  { rules: airbnbErrors.rules },
  { rules: airbnbEs6.rules },
  { rules: airbnbStrict.rules },
  { rules: airbnbVariables.rules },
  pluginUnicorn.configs['flat/recommended'],
  pluginImport.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        NS: true,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        node: {
          paths: ['.'],
        },
      },
    },

    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'unicorn/better-regex': 'warn',
      'func-style': 'error',
      'no-plusplus': 'off',
      'no-await-in-loop': 'off',
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
      'no-constant-condition': [
        'error',
        {
          checkLoops: false,
        },
      ],
      'lines-between-class-members': [
        'error',
        {
          enforce: [
            {
              blankLine: 'always',
              prev: '*',
              next: 'method',
            },
            {
              blankLine: 'always',
              prev: 'method',
              next: '*',
            },
            {
              blankLine: 'never',
              prev: 'field',
              next: 'field',
            },
          ],
        },
      ],

      'import/extensions': ['error', 'ignorePackages'],

      'unicorn/no-array-for-each': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/numeric-separators-style': [
        'error',
        {
          number: {
            minimumDigits: 0,
          },
        },
      ],
    },
  },
  configPrettier,
];
