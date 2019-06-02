module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
      sourceType: 'module'
    },
    rules: {
      'no-console': 0,
      'prettier/prettier': ['error']
    }
  };
