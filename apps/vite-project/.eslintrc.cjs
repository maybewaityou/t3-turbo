/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: [
    'cypress',
    'mock',
    'types',
    'test',
    '.eslintrc.cjs',
    'commitlint.config.js',
    'cypress.config.ts',
    'postcss.config.js',
    'tailwind.config.js',
    'vite.config.ts',
    'vitest.config.ts'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/unbound-method': 'off'
  }
}
