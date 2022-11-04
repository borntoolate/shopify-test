module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', 'prettier', "import"
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: latest,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'prettier'
  ],
  rules: {
    'sort-imports': 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    'import/order': [
      2,
      {
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ],
    'import/no-named-as-default': [
      1
    ],
    'import/no-named-as-default-member': [
      1
    ],
    'import/no-duplicates': [
      1
    ],
    'import/no-unresolved': [
      2
    ],
    'import/named': [
      2
    ],
    'import/namespace': [
      2
    ],
    'import/default': [
      2
    ],
    'import/export': [
      2
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        'argsIgnorePattern': '^_'
      }
    ],
    'no-console': [
      2,
      {
        'allow': [
          'warn',
          'error'
        ]
      }
    ],
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'es5',
      },
    ]
  },
};
