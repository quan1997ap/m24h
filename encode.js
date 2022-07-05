const JScrewIt = require("jscrewit"); // CommonJS syntax
var fs = require("fs");

fs.readFile("./build/static/js/main.3240ac64.chunk.js", "utf8", function (
  err,
  contents
) {
  const output = JScrewIt.encode(contents);

  // write to a new file named 2pac.txt
  fs.writeFile("./build/static/js/main.3240ac64.chunk.js", output, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("File saved!");
  });
});
