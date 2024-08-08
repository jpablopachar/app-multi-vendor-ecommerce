import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js}'],
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
]
