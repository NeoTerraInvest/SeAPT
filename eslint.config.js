import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import preferArrow from 'eslint-plugin-prefer-arrow';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prefer-arrow': preferArrow,
    },

    rules: {
      ...reactHooks.configs.recommended.rules, //--> Primarily enforces the rules for using React Hooks to prevent hook-related bugs.
      'react-refresh/only-export-components': [
        //--> Ensures that only components are exported, as exporting other items may cause refresh issues
        'warn',
        { allowConstantExport: true },
      ],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }], //--> (ESlint core rules)Requires all of the use of arrow functions in the project.
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }], //--> (plugin)Disallows named function expressions.
      'prefer-arrow/prefer-arrow-functions': [
        //--> (plugin)Forces the use of arrow functions details in all cases instead of traditional function expressions.
        'error',
        {
          disallowPrototype: true, //--> Prevents functions defined with the function keyword from being used as prototype methods.
          singleReturnOnly: false, //--> Enforces the use of arrow functions for all function expressions.
          classPropertiesAllowed: false, //->Disallows the use of arrow functions when defined as class properties.
        },
      ],
    },
  },
);
