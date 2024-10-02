module.exports = {
  env: {
    browser: false,
  },
  overrides: [{ files: ['*.js'] }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: { NS: true },
  plugins: ['jsdoc'],
  extends: [
    'airbnb-base',
    'plugin:unicorn/recommended',
    'plugin:jsdoc/recommended',
    'prettier',
  ],
  ignorePatterns: ['*', '!servers', '!servers/**/*'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'unicorn/better-regex': 'warn',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prevent-abbreviations': ['error', { allowList: { i: true } }],
    'unicorn/numeric-separators-style': [
      'error',
      { number: { minimumDigits: 0 } },
    ],
    'import/extensions': ['error', 'ignorePackages'],
    // Disable until I figure out how to resolve project-level imports for eslint
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-await-in-loop': 'off',
    'no-constant-condition': ['error', { checkLoops: false }],

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
