module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // Jika Anda menggunakan TypeScript
  ],
  parser: '@babel/eslint-parser', // Jika Anda menggunakan Babel
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Matikan aturan ini untuk menghindari kesalahan saat mengimpor React
    'react/prop-types': 'off', // Matikan aturan prop-types jika Anda tidak menggunakannya
  },
  settings: {
    react: {
      version: 'detect', // Secara otomatis mendeteksi versi React
    },
  },
};
