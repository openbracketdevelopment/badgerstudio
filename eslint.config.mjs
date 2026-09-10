import nextTypescript from "eslint-config-next/typescript";
import nextWebVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"],
  },
  ...nextWebVitals,
  ...nextTypescript,
  ...tseslint.configs.recommended,
];

export default eslintConfig;
