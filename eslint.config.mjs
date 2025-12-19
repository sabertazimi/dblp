import { defineConfig } from '@dg-scripts/eslint-config'

export default defineConfig(
  { typescript: true },
  {
    files: ['**/*.js?(x)'],
    rules: {
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
    },
  },
)
