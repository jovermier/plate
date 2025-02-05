const path = require('path');

const prettierConfig = require('./prettier.config.js');

module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
    'plugin:perfectionist/recommended-natural-legacy',
  ],
  plugins: ['tailwindcss', 'unused-imports', 'perfectionist', 'prettier'],
  rules: {
    'react/jsx-key': 'off',
    'prettier/prettier': ['warn', { ...prettierConfig }],
    'react/display-name': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/no-unescaped-entities': 'off',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'none',
        vars: 'all',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    // Perfectionist
    ...{
      '@typescript-eslint/adjacent-overload-signatures': 'off',

      'perfectionist/sort-array-includes': [
        'warn',
        {
          type: 'natural',
          groupKind: 'literals-first',
          ignoreCase: false,
        },
      ],

      'perfectionist/sort-classes': [
        'warn',
        {
          type: 'natural',
          groups: [
            'index-signature',
            'static-property',
            'private-property',
            'protected-property',
            'property',
            'constructor',
            'static-method',
            'private-method',
            'protected-method',
            'method',
            ['get-method', 'set-method'],
            'static-block',
            'unknown',
          ],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-enums': [
        'warn',
        {
          type: 'natural',
          ignoreCase: false,
          sortByValue: true,
        },
      ],
      'perfectionist/sort-exports': [
        'warn',
        { type: 'natural', ignoreCase: false },
      ],
      'perfectionist/sort-imports': [
        'warn',
        {
          internalPattern: ['^@/.*'],
          type: 'natural',
          customGroups: {
            type: {
              next: 'next',
              react: 'react',
            },
            value: {
              next: ['next'],
              react: ['react', 'react-*'],
            },
          },
          groups: [
            'react',
            ['type', 'internal-type'],
            'next',
            ['builtin', 'external'],
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'side-effect',
            'style',
            'object',
            'unknown',
          ],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-interfaces': [
        'warn',
        {
          type: 'natural',
          customGroups: {
            key: ['key', 'keys'],
            id: ['id', '_id'],
          },
          groupKind: 'required-first',
          groups: ['key', 'id', 'multiline', 'unknown'],
          ignoreCase: false,
        },
      ],
      // breaking: ordering matters
      'perfectionist/sort-intersection-types': 'off',
      'perfectionist/sort-jsx-props': [
        'warn',
        {
          type: 'natural',
          customGroups: {
            key: ['key', 'keys'],
            id: ['id', 'name', 'testId', 'data-testid'],
            accessibility: [
              'title',
              'alt',
              'placeholder',
              'label',
              'description',
              'fallback',
            ],
            callback: ['on*', 'handle*'],
            className: ['className', 'class', 'style'],
            data: ['data-*', 'aria-*'],
            ref: ['ref', 'innerRef'],
            state: [
              'value',
              'checked',
              'selected',
              'open',
              'defaultValue',
              'defaultChecked',
              'defaultOpen',
              'disabled',
              'required',
              'readOnly',
              'loading',
            ],
            variant: ['variant', 'size', 'orientation', 'color'],
            control: ['asChild', 'as'],
          },
          groups: [
            'id',
            'key',
            'ref',
            'control',
            'variant',
            'className',
            'state',
            'callback',
            'accessibility',
            'data',
            'unknown',
            'shorthand',
          ],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-maps': [
        'warn',
        { type: 'natural', ignoreCase: false },
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        { type: 'natural', groupKind: 'types-first', ignoreCase: false },
      ],
      // 'perfectionist/sort-named-imports': ['off'],
      'perfectionist/sort-named-imports': [
        'warn',
        { type: 'natural', groupKind: 'types-first', ignoreCase: false },
      ],
      'perfectionist/sort-object-types': [
        'warn',
        {
          type: 'natural',
          customGroups: {
            key: ['key', 'keys'],
            id: ['id', '_id'],
            callback: ['on*', 'handle*'],
          },
          groupKind: 'required-first',
          groups: ['key', 'id', 'multiline', 'unknown', 'callback'],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-objects': [
        'warn',
        {
          type: 'natural',
          customGroups: {
            key: ['key', 'keys'],
            id: ['id', '_id'],
            callback: ['on*', 'handle*'],
          },
          groups: ['key', 'id', 'unknown', 'callback'],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-sets': [
        'warn',
        {
          type: 'natural',
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-switch-case': [
        'warn',
        {
          type: 'natural',
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-union-types': [
        'warn',
        {
          type: 'natural',
          groups: [
            'conditional',
            'function',
            'import',
            ['intersection', 'union'],
            'named',
            'operator',
            'object',
            'keyword',
            'literal',
            'tuple',
            'nullish',
            'unknown',
          ],
          ignoreCase: false,
        },
      ],
      'perfectionist/sort-variable-declarations': [
        'warn',
        {
          type: 'natural',
          ignoreCase: false,
        },
      ],
      'react/jsx-sort-props': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
    },
  },
  settings: {
    next: {
      rootDir: ['./'],
    },
    tailwindcss: {
      callees: ['cn', 'cva', 'withCn'],
      config: path.join(__dirname, './tailwind.config.js'),
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
  root: true,
};
