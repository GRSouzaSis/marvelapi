module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/standard",
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "prettier"],
  overrides: [{
    files: ["src/**/*.ts", "src/**/*.tsx"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/ban-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },],
};