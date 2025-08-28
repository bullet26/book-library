import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'ban-ts-comment': 0,
      'react/react-in-jsx-scope': 0,
      'react/function-component-definition': 0,
      'import/prefer-default-export': 0,
      'react/jsx-props-no-spreading': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'no-param-reassign': 0,
      'react/require-default-props': 0,
      'no-nested-ternary': 0,
      'no-plusplus': 0,
    },
  },
])
