const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
    {
        ignores: ['**/node_modules/', '**/dist/'],
    },
    {
        files: ['exercise/**/*.{js,ts}'],
        extends: [...tseslint.configs.recommended, prettierConfig],
        rules: {
            // Starters contain stub functions that students fill in, so
            // unused values are a warning rather than an error here.
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
);
