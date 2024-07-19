// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  // Standard prettier options
  trailingComma: "es5",
  singleQuote: false,
  tabWidth: 2,
  semi: true,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // This plugin's options
  importOrder: [
    "^react$",
    "^next$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "",
    "^@/lib/(.*)$",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  // importOrderTypeScriptVersion: "5.0.0",
};
