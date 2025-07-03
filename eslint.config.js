import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import prettier from "eslint-plugin-prettier";

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react-native/all"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-native": reactNative,
      "@typescript-eslint": tseslint.plugin,
      prettier,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "prettier/prettier": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "react-native/no-inline-styles": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
