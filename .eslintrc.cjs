/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "prettier",
    "@antfu"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  },
  "rules": [
    "@typescript-eslint/no-unused-vars": 'off',
    "@typescript-eslint/no-unused-types": 'off',
  ],
  "extends": 
}