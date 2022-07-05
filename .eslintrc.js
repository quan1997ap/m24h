module.exports = {
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  plugins: ["babel"],
  rules: {
    "babel/no-unused-expressions": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    "eslint/no-unused-vars": "off",
    "react/no-unused-vars": "off",
  },
};
