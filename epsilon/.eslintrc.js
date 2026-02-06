/* eslint config: minimal, correctness-focused */
module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    extends: [
        'next/core-web-vitals',         // includes react, react-hooks, jsx-a11y
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked', // very light defaults
        'prettier'                      // disable stylistic rules that clash with Prettier
    ],
    parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
    },
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-import-module-exports': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'no-use-before-define': 'off',
        'class-methods-use-this': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'import/no-cycle': 'off',
    },
    overrides: [
        // JS files shouldn’t require type info (faster)
        {
            files: ['**/*.js', '**/*.jsx'],
            parserOptions: { project: null }
        },
        // Config/test/tooling files: allow dev dependencies
        {
            files: ['**/{*.config.*,*rc.*}', '**/scripts/**/*', '**/tests/**/*'],
            rules: { 'no-console': 'off' }
        }
    ]
};
