import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig.append({
  files: ['**/*.js?(x)'],
  rules: {
    'react/prop-types': 'off',
  },
})
