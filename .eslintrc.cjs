module.exports = {
  env: {
    browser: false,
  },
  overrides: [{ files: ['*.js'] }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'plugin:unicorn/recommended', 'prettier'],
  ignorePatterns: ['*', '!src', '!src/**/*'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'unicorn/better-regex': 'warn',
    'unicorn/numeric-separators-style': [
      'error',
      { number: { minimumDigits: 0 } },
    ],
    'import/extensions': ['error', 'ignorePackages'],
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { props: false }],

    'lines-between-class-members': [
      'error',
      {
        enforce: [
          { blankLine: 'always', prev: '*', next: 'method' },
          { blankLine: 'always', prev: 'method', next: '*' },
          { blankLine: 'never', prev: 'field', next: 'field' },
        ],
      },
    ],
  },
};
