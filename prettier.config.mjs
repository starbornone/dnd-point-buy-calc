/** @type {import("prettier").Config} */
const config = {
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tailwindFunctions: ['clsx', 'tw'],
  trailingComma: 'es5',
};

export default config;
