const hostname = window && window.location && window.location.hostname;
const prefix = "[MF24H]";
const debug = hostname === "localhost" ? true : false;

var log = function() {
  /** Log a message to the console, prepended with `LOG_PREFIX`, granted
        `DEBUG` is set.
    */
  if (process.env.NODE_ENV !== "production") {
    if (debug) {
      // Convert args to a normal array
      var args = Array.prototype.slice.call(arguments);

      // Prepend log prefix log string
      args.unshift(prefix + " ");

      // Pass along arguments to console.log
      console.log.apply(console, args);
      // console.log(JSON.stringify(args[1]));
    }
  }
};

export default log;
