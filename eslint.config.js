import airbnbBestPractices from 'eslint-config-airbnb-base/rules/best-practices';
import airbnbErrors from 'eslint-config-airbnb-base/rules/errors';
import airbnbEs6 from 'eslint-config-airbnb-base/rules/es6';
import airbnbImports from 'eslint-config-airbnb-base/rules/imports';
import airbnbNode from 'eslint-config-airbnb-base/rules/node';
import airbnbStrict from 'eslint-config-airbnb-base/rules/strict';
import airbnbStyle from 'eslint-config-airbnb-base/rules/style';
import airbnbVariables from 'eslint-config-airbnb-base/rules/variables';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginImport from 'eslint-plugin-import';
import configPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import globals from 'globals';

const sourceFiles = ['servers'];
const projectFiles = ['eslint.config.js', 'config.js'];
const fileAllowList = [...sourceFiles, ...projectFiles];

const airbnbRules = [
  airbnbBestPractices,
  airbnbErrors,
  airbnbEs6,
  airbnbImports,
  airbnbNode,
  airbnbStrict,
  airbnbStyle,
  airbnbVariables,
].map((ruleFile) => ({ rules: ruleFile.rules }));

const languageOptions = {
  globals: {
    NS: true,
    ...globals.node,
  },

  ecmaVersion: 'latest',
  sourceType: 'module',
};

const settings = {
  'import/resolver': {
    node: {
      paths: ['.'],
    },
  },
};

const customImportRules = {
  'import/extensions': ['error', 'ignorePackages'],
  'import/no-extraneous-dependencies': [
    'error',
    // Don't check for devDeps on these files
    { devDependencies: projectFiles },
  ],
};

const customUnicornRules = {
  'unicorn/better-regex': 'warn',
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
};

const customStyleRules = {
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
};

const customRules = {
  'no-unused-vars': 'warn',
  'no-console': 'off',
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
      checkLoops: 'allExceptWhileTrue',
    },
  ],

  ...customStyleRules,
  ...customImportRules,
  ...customUnicornRules,
};

const configArray = [
  { ignores: ['*', ...fileAllowList.map((globStr) => `!${globStr}`)] },
  js.configs.recommended,
  ...airbnbRules,
  pluginUnicorn.configs['flat/recommended'],
  pluginImport.flatConfigs.recommended,
  {
    languageOptions,
    settings,
    rules: customRules,
  },
  configPrettier,
];

export default configArray;
