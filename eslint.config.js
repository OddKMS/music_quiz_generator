import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
  ],
  languageOptions: {
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  },
  plugins: { 'react-refresh': reactRefresh, 'react-hooks': reactHooks },
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
});
