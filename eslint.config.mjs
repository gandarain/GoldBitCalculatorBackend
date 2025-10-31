import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "no-undef": "error",
      "prefer-const": "warn",
      "eqeqeq": ["error", "always"],
      "semi": ["error", "never"],
      "quotes": ["error", "single"],
    },
  },
]
