module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/no-danger': 0,
    'import/no-unresolved': 0,
    'react/sort-comp': 0,
    'no-console': 1,
    'import/no-extraneous-dependencies': 0,
    'lines-between-class-members': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
