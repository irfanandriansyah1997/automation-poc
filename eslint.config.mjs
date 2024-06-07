import eslint from "@eslint/js";
import jest from "eslint-plugin-jest";
import playwright from "eslint-plugin-playwright";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import eslintPluginSortKeysFix from "eslint-plugin-sort-keys-fix";
import eslintPluginTypescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "playwright-report/**",
      "test-results/**",
      "node_modules",
      "eslint.config.mjs",
      "playwright.config.js",
    ],
  },
  {
    languageOptions: { globals: globals.node },
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
      "sort-destructure-keys": eslintPluginSortDestructureKeys,
      "sort-keys-fix": eslintPluginSortKeysFix,
      "typescript-sort-keys": eslintPluginTypescriptSortKeys,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/unbound-method": "off",
      "import/default": "off",
      "import/namespace": "off",
      "import/no-named-as-default-member": "off",
      "import/order": "off",
      indent: "off",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-unused-vars": "off",
      "prettier/prettier": [
        "error",
        {
          arrowParens: "always",
          bracketSameLine: false,
          bracketSpacing: true,
          embeddedLanguageFormatting: "auto",
          experimentalTernaries: false,
          htmlWhitespaceSensitivity: "css",
          insertPragma: false,
          jsxBracketSameLine: false,
          jsxSingleQuote: false,
          proseWrap: "preserve",
          quoteProps: "as-needed",
          rangeStart: 0,
          requirePragma: false,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "none",
          useTabs: false,
        },
        {
          usePrettierrc: false,
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^@?\\w"],
            ["@/pages", "@/utils"],
            ["@/types"],
            [
              "^\\u0000",
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
            ],
          ],
        },
      ],
      "sort-destructure-keys/sort-destructure-keys": [
        "error",
        {
          caseSensitive: false,
        },
      ],
      "sort-imports": "off",
      "sort-keys-fix/sort-keys-fix": "error",
    },
  },
  eslintPluginPrettierRecommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname, // use __dirname for older Node.js versions
      },
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ...playwright.configs["flat/jest-playwright"],
    files: ["tests/**"],
  },
  { files: ["tests/**"], plugins: { jest } },
];
