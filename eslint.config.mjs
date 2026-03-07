import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Disable unused vars check globally
      "@typescript-eslint/no-unused-vars": "off",

      // OR: keep it but allow unused variables prefixed with "_"
      // "@typescript-eslint/no-unused-vars": [
      //   "warn",
      //   { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      // ],
    },
  },
];

export default eslintConfig;
