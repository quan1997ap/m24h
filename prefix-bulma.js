var fs = require("fs");
var postcss = require("postcss");
var classPrfx = require("postcss-class-prefix");

fs.readFile("src/css/bulma.css", (err, css) => {
  postcss([classPrfx("bulma-")])
    .process(css, { from: "src/css/bulma.css", to: "src/css/bulma-bulma.css" })
    .then(result => {
      fs.writeFile("src/css/bulma-bulma.css", result.css, () => true);
      if (result.map) {
        fs.writeFile("src/css/bulma-bulma.css.map", result.map, () => true);
      }
    });
});
