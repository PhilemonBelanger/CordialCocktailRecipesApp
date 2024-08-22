module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native", "unused-imports"],
  ignorePatterns: [
    "coverage/*",
    "*/assets/*",
    "*.md",
    "*.json",
    "**/__tests__/*",
    "**/web_files/*",
    "src/tests/*",
    "junit.xml",
    "*.patch",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react-native/no-unused-styles": ["warn"],
    "react-native/split-platform-components": ["error"],
    "react-native/no-inline-styles": ["error"],
    "react-native/no-color-literals": ["off"],
    "react-native/no-raw-text": ["off"],
    "react-native/no-single-element-style-arrays": ["error"],
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-useless-escape": ["off"],
    "react/prop-types": ["off"],
    "no-var": ["error"],
  },
};
