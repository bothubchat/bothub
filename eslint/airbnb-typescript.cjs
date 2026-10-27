/*
 * The TypeScript part of eslint-config-airbnb-typescript, which supports
 * typescript-eslint up to 7 only. Formatting rules are left out: prettier
 * formats the code and typescript-eslint 8 no longer has them.
 */
const {
  rules: bestPractices,
} = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: es6 } = require('eslint-config-airbnb-base/rules/es6');
const { rules: imports } = require('eslint-config-airbnb-base/rules/imports');
const { rules: style } = require('eslint-config-airbnb-base/rules/style');
const {
  rules: variables,
} = require('eslint-config-airbnb-base/rules/variables');

// Airbnb rules replaced by their typescript-eslint versions with the same options
const replaced = {
  'default-param-last': bestPractices['default-param-last'],
  'dot-notation': bestPractices['dot-notation'],
  'no-array-constructor': style['no-array-constructor'],
  'no-dupe-class-members': es6['no-dupe-class-members'],
  'no-empty-function': bestPractices['no-empty-function'],
  'no-implied-eval': bestPractices['no-implied-eval'],
  'no-loop-func': bestPractices['no-loop-func'],
  'no-magic-numbers': bestPractices['no-magic-numbers'],
  'no-redeclare': bestPractices['no-redeclare'],
  'no-shadow': variables['no-shadow'],
  'no-unused-expressions': bestPractices['no-unused-expressions'],
  'no-unused-vars': variables['no-unused-vars'],
  'no-use-before-define': variables['no-use-before-define'],
  'no-useless-constructor': es6['no-useless-constructor'],
  'require-await': bestPractices['require-await'],
};

module.exports = {
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
      },
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
  rules: {
    ...Object.fromEntries(
      Object.entries(replaced).flatMap(([name, value]) => [
        [name, 'off'],
        [`@typescript-eslint/${name}`, value],
      ]),
    ),
    // `no-new-func` is covered by `@typescript-eslint/no-implied-eval`
    'no-new-func': 'off',
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
    ],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': [
      bestPractices['no-return-await'],
      'in-try-catch',
    ],
    'import/extensions': [
      imports['import/extensions'][0],
      imports['import/extensions'][1],
      { ...imports['import/extensions'][2], ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': [
      imports['import/no-extraneous-dependencies'][0],
      {
        ...imports['import/no-extraneous-dependencies'][1],
        devDependencies: imports[
          'import/no-extraneous-dependencies'
        ][1].devDependencies.flatMap((pattern) => {
          const tsPattern = pattern.replace(/\bjs(x?)\b/g, 'ts$1');
          return tsPattern === pattern ? [pattern] : [pattern, tsPattern];
        }),
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Checked by the TypeScript compiler
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-const-assign': 'off',
        'no-dupe-args': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-new-symbol': 'off',
        'no-obj-calls': 'off',
        'no-redeclare': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'valid-typeof': 'off',
        'import/named': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
