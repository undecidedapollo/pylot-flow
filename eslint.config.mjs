import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/test"],
    },
    ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: "module",

            parserOptions: {
                jsx: true,
                useJSXTextNode: true,
                project: "./tsconfig.json",
            },
        },
        rules: {
            "prefer-const": "off",

            "prettier/prettier": [
                "warn",
                {
                    semi: true,
                    trailingComma: "all",
                    singleQuote: false,
                    printWidth: 120,
                    tabWidth: 4,
                    useTabs: false,
                    endOfLine: "auto",
                    jsxBracketSameLine: false,
                },
            ],

            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                },

                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                    // Allow lodash as _
                    filter: {
                        regex: "^_$",
                        match: false,
                    },
                },

                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                    trailingUnderscore: "allow",
                },

                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
                // Prisma + Agones support
                // support for the camelCase_camelCase syntax with optional leading underscore (e.g. (_count, _sum), (leaderboardId_game_id), etc.)
                // support for keywords with OR | AND
                // Agones support is PascalCase on the start
                {
                    selector: "objectLiteralProperty",
                    format: null,
                    custom: {
                        regex: "^(?:_?[a-zA-Z][a-zA-Z0-9]*(_[a-z][a-zA-Z0-9]*)*|OR|AND)",
                        match: true,
                    },
                },
                // Allow PascalCase for exported functions
                {
                    selector: 'variable',
                    modifiers: ['const', 'exported'],
                    types: ['function'],
                    format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
                },
                // Allow PascalCase for exported functions
                {
                    selector: 'function',
                    modifiers: ['exported'],
                    format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
                },
                // Require uppercase, pascalcase for enum members
                {
                    selector: "enumMember",
                    format: ["UPPER_CASE", "PascalCase"],
                },
                // Allow class properties to be camelCase or UPPER_CASE if they are readonly
                {
                    selector: "classProperty",
                    modifiers: ["readonly"],
                    format: ["camelCase", "UPPER_CASE"],
                },
                // Custom
                // Agones support
                {
                    selector: "typeProperty",
                    format: null,
                    custom: {
                        regex: "^(?:_?[a-zA-Z][a-zA-Z0-9]*(_[a-z][a-zA-Z0-9]*)*)",
                        match: true,
                    },
                },
            ],
            "no-unused-vars": "off",
            "no-new-wrappers": "error", // You should use Number(10) instead of new Number(10) because Number(10) === 10 but (new Number(10)) !== 10 as it returns an wrapper object

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
];
