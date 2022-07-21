module.exports = {
    "parser": '@typescript-eslint/parser',
    "plugins": [
        '@typescript-eslint',
    ],
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    "rules": {
        "semi": 2,
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "eol-last": ["error", "always"],
        "no-multiple-empty-lines": ["error", {
            "max": 2,
            "maxEOF": 1,
            "maxBOF": 0
        }],
        "func-names": ["error", "as-needed"],
        "eqeqeq": ["error", "always"],
        "require-jsdoc": 0,
        "valid-jsdoc": 0,
        "max-len": 0,
        "quotes": [2, "double", {
            allowTemplateLiterals: true
        }],
        "comma-dangle": [2, "always-multiline"],
        'space-before-function-paren': [2, {
            asyncArrow: 'always',
            anonymous: 'always',
            named: 'never',
        }],
        "block-scoped-var": "error",
        "default-case": "error",
        "no-console": ["error", {
            allow: ["warn"]
        }],
        "no-alert": "error",
        "no-else-return": "error",
        "no-empty-function": "error",
        "no-eval": "error",
        "no-implied-eval": "error",
        "no-floating-decimal": "error",
        "no-invalid-this": "error",
        "no-lone-blocks": "error",
        "no-multi-spaces": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-return-assign": ["error", "always"],
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-undef": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-with": "error",
        "prefer-promise-reject-errors": "error",
        "radix": ["error", "always"],
        "require-await": "error",
        "no-shadow-restricted-names": "error",
        "no-use-before-define": "error",
        "callback-return": ["error", ["done", "send.error", "send.success", "callback", "cb", "resHandler"]],
        "no-path-concat": "error",
        "no-process-exit": "error",
        "no-process-env": "error",
        "brace-style": ["error", "1tbs", {
            "allowSingleLine": false
        }],
        "comma-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "func-style": ["error", "declaration"],
        "no-bitwise": "error",
        "no-lonely-if": "error",
        "no-mixed-operators": "error",
        "no-nested-ternary": "error",
        "no-plusplus": "error",
        "no-tabs": "error",
        "arrow-parens": ["error", "always"],
        "arrow-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "generator-star-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "no-duplicate-imports": ["error", {
            "includeExports": true
        }],
        "no-var": "error",
        "prefer-rest-params": "error",
        "array-element-newline": ["error", "always"],
        "array-bracket-newline": ["error", {
            "multiline": true,
            "minItems": 1
        }],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "@typescript-eslint/no-explicit-any": "off",
        "func-style": "off",
    },
    "env": {
        "node": true,
        "es6": true
    },
};
