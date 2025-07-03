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
  {
    files: [
      "expo-secure-rng/.eslintrc.js",
      "expo-secure-rng/example/babel.config.js",
      "expo-secure-rng/example/metro.config.js",
      "expo-secure-rng/example/webpack.config.js",
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        module: "writable",
        require: "writable",
        __dirname: "writable",
      },
    },
  },
  {
    ignores: [
      "expo-secure-rng/build/**",
      "expo-secure-rng/example/webpack.config.js",
    ],
  },
];
