/** @type {import('eslint').Linter.FlatConfig} */
export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        NodeJS: 'readonly',
        mocha: 'readonly',
      },
    },
    env: {
      browser: true,
      es6: true,
      node: true,
      mocha: true,
    },
    plugins: {
      // Plugins will be loaded by the config below
    },
    extends: [
      'airbnb-base',
    ],
    rules: {
      // Add custom rules here if needed
    },
  },
];
