/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    // "@vue/eslint-config-prettier"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  },
  // "extends": [
  //   "@antfu"
  //   // "plugin:vue/vue3-recommended",
  //   // "plugin:vue/vue3-essential",
  //   // "plugin:vue/vue3-strongly-recommended",
  //   // "@vue/eslint-config-typescript",
  //   // // "@vue/eslint-config-typescript/recommended",
  //   // "@vue/typescript/recommended"
  //   // "eslint:recommended"

  // ],
  "rules": { 
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-params": "off",
    "@typescript-eslint/no-unused-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"]
  }
}
