/* eslint-disable unicorn/filename-case */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:react/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "requireConfigFile": false,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-func",
        "@typescript-eslint",
        "unicorn",
        "import"
    ],
    "rules": {
        "import/no-unresolved": "error",
        "import/named":"error",
        "import/namespace":"error",
        "import/default":"error",
        "import/export":"error",
        "array-bracket-newline": [
            "error", "always"
        ],
        "arrow-body-style": [
            "error", "always"
        ],
        "arrow-parens": [
            "error", "always"
        ],
        "arrow-spacing": "error",
        "block-spacing": "error",
        "brace-style": [
            "error", "1tbs"
        ],
        "function-paren-newline": [
            "error", "multiline-arguments"
        ],
        "semi": [
            "error", "always"
        ],
        "quotes": [
            "error", "double"
        ],
        "no-multi-spaces": "error",
        "no-var": "error",
        "no-undefined": "error",
        "array-callback-return": "error",
        "no-await-in-loop": "error",
        "no-constructor-return": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "error",
        "no-unreachable-loop": "error",
        "no-implied-eval": "error",
        "no-unused-private-class-members": "error",
        "no-use-before-define": "error",
        "no-empty-function": [
            "error", {
                "allow": [
                    "constructors"
                ]
            }
        ],
        "no-eq-null": "error",
        "no-lonely-if": "error",
        "no-else-return": "error",
        "@typescript-eslint/no-shadow": [
            "error", {
                "builtinGlobals": true,
                "hoist": "functions",
                "allow": [
                ]
            }
        ],
        "accessor-pairs": [
            "error", {
                "setWithoutGet": true,
                "getWithoutSet": true,
                "enforceForClassMembers": true
            }
        ],
        "max-lines": [
            "error", {
                "max": 600,
                "skipComments": true,
                "skipBlankLines": true
            }
        ],
        "max-len": [
            "error", {
                "code": 120,
                "tabWidth": 4,
                "ignoreComments": true,
                "ignoreTrailingComments": true,
                "ignoreUrls": true,
                "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\("
            }
        ],
        "max-params": [
            "error", 5
        ],
        "block-scoped-var": "error",
        "camelcase": [
            "error", {
                "properties": "always",
                "ignoreImports": true
            }
        ],
        "class-methods-use-this": "off",
        "comma-spacing": [
            "error", {
                "before": false, "after": true
            }
        ],
        "computed-property-spacing": [
            "error", "always"
        ],
        "consistent-return": "error",
        "constructor-super": "error",
        "default-case-last": "error",
        "default-case": [
            "error", {
                "commentPattern": "^skip\\sdefault"
            }
        ],
        "default-param-last": "error",
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": "error",
        "func-name-matching": [
            "error", "always"
        ],
        "func-names": [
            "error", "as-needed"
        ],
        "func-style": [
            "error", "declaration", {
                "allowArrowFunctions": true
            }
        ],
        "getter-return": "error",
        "handle-callback-err": "error",
        "id-denylist": [
            "error", "data", "err", "e", "cb", "callback", "i", "j",
            "test", "onchange", "onselect", "onclick"
        ],
        "id-length": [
            "error", { "min": 3, "properties": "never" }
        ],
        "indent": [
            "error", 4, {
                "SwitchCase": 1
            }
        ],
        "init-declarations": [
            "error", "always"
        ],
        "jsx-quotes": [
            "error", "prefer-double"
        ],
        "keyword-spacing": [
            "error", { "after": true, "before": true }
        ],
        "lines-between-class-members": [
            "error", "always"
        ],
        "max-classes-per-file": "error",
        "max-depth": [
            "error", 3
        ],
        "react-func/max-lines-per-function": [
            "error", { "max": 50, "skipBlankLines": true, "skipComments": true }
        ],
        "max-nested-callbacks": [
            "error", 3
        ],
        "max-statements-per-line": [
            "error", { "max": 1 }
        ],
        "multiline-ternary": [
            "error", "always-multiline"
        ],
        "new-cap": [
            "error", {
                "capIsNew": false
            }
        ],
        "no-alert": "error",
        "no-async-promise-executor": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-extra-bind": "error",
        "no-extra-semi": "error",
        "no-import-assign": "error",
        "no-invalid-this": "error",
        "no-irregular-whitespace": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-multi-assign": "error",
        "no-multi-str": "error",
        "no-multiple-empty-lines": [
            "error", { "max": 2, "maxEOF": 0 }
        ],
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-setter-return": "error",
        "no-underscore-dangle": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "padding-line-between-statements": [
            "error",
            { blankLine: "always", prev: "multiline-block-like", next: "multiline-block-like" },
            { blankLine: "always", prev: "class", next: "class" },
            { blankLine: "always", prev: "multiline-const", next: "multiline-const" },
            { blankLine: "always", prev: "multiline-let", next: "multiline-let" },
            { blankLine: "always", prev: "return", next: "return" },
            { blankLine: "always", prev: "throw", next: "throw" },
        ],
        "prefer-template": "error",
        "sort-imports": [
            "error", { "ignoreCase": true }
        ],
        "space-before-blocks": [
            "error", { "functions": "always", "keywords": "always", "classes": "always" }
        ],
        "use-isnan": "error",
        "valid-typeof": "error",
        "unicorn/filename-case": [
            "error",
            {
                "case": "pascalCase",
                "ignore": [
                    "react-app-env.d.ts"
                ]
            }
        ],

        // Other Web Rules
        "react/prop-types": "off",
        "no-mixed-operators": "error",
        "no-unneeded-ternary": "error",
        "no-duplicate-imports": "error",
        "line-comment-position": [
            "error", {
                "position": "above"
            }
        ],
        "no-template-curly-in-string": "error",
        "yoda": "error",
    },
    "settings": {
        "react": {
            "version": "detect"
        },
        "import/ignore": [
            "node_modules"
        ],
        "import/resolver": {
            node: {
                moduleDirectory: [
                    "node_modules", "src"
                ],
            },
        }
    }
};
