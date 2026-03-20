import iobrokerConfig from "@iobroker/eslint-config/eslint.config.mjs";

export default [
  ...iobrokerConfig,
  {
    languageOptions: {
      globals: {
        Blockly: "readonly",
        systemLang: "readonly",
        systemDictionary: "writable",
        main: "readonly",
        systemConfig: "readonly",
        _: "readonly",
        M: "readonly",
        sendTo: "readonly",
        instance: "readonly",
        onChange: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-redeclare": "off",
    },
  },
  {
    files: ["admin/*.js"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
