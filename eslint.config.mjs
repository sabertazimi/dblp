import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig.append({
  files: ['**/*.js?(x)'],
  rules: {
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'security/detect-object-injection': 'off',
  },
})
