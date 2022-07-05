const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const { useBabelRc, useEslintRc } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#FD6565",
      "@brand-primary": "#FD6565",
      "@brand-primary-tap": "#C93737",
    },
  }),
  useBabelRc(),
  useEslintRc()
);
