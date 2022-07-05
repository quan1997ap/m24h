const { src, dest } = require("gulp");
var less = require("gulp-less");
var path = require("path");
var gulp = require("gulp");
var gzip = require("gulp-gzip");
var javascriptObfuscator = require("gulp-javascript-obfuscator");
const JScrewIt = require("jscrewit"); // CommonJS syntax

exports.default = function () {
  return (
    src("./build/static/js/*.js")
      .pipe(
        javascriptObfuscator({
          compact: true,
          // transformObjectKeys: true,
          debugProtection: true,
          deadCodeInjectionThreshold: 0.8,
          identifierNamesGenerator: "hexadecimal",
          unicodeEscapeSequence: false,
          // domainLock: ["mf24h.com", "www.mf24h.com"],
          deadCodeInjection: true,
          selfDefending: true,
          stringArray: true,
          stringArrayEncoding: "base64",
          stringArrayThreshold: 1,
          shuffleStringArray: true,
          seed: 9485792742,
          rotateStringArray: true,
          splitStrings: true,
          splitStringsChunkLength: 5,
          disableConsoleOutput: true,
        })
      )
      // .pipe(gzip())
      .pipe(dest("./build/static/js"))
  );
};

// gulp.task('less', function () {
//   return gulp.src('./less/*.less')
//     .pipe(less({
//       paths: [ path.join(__dirname, 'less', 'includes') ]
//     }))
//     .pipe(gulp.dest('./src/css'));
// });

// gulp.task('compress', (done) => {
// 	gulp
// 		.src('./build/static/js/*.js')
// 		.pipe(
// 			javascriptObfuscator({
// 				compact: true,
// 				deadCodeInjection: true,
// 				selfDefending: true,
// 				stringArray: true,
// 				rotateStringArray: true
// 			})
// 		)
// 		.pipe(gulp.dest('./build/static/js'));
// 	done();
// });

// // Clean assets
// function done() {
// 	console.log('Done!');
// }

// gulp.task('done', done);

// // Just running the two tasks
// // gulp.task('default', gulp.series(done, gulp.series('compress')));
// // Just running the two tasks
// // gulp.task('default', ['less']);
// gulp.task('default', (done) => {
// 	gulp.series('compress');
// 	done();
// });
