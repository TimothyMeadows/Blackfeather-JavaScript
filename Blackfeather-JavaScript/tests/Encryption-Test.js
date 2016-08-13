var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var text = "caw caw caw!"; // Can be any text matching the specified text encoding.
var password = "water123";
var verifier = "321retaw";
var salt = "tNfyIx2PZjf6C+KC9N7Ydg==";

var cipher = new Blackfeather.Security.Cryptology.Encryption().Compute(text, password, salt, verifier);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("cipher: " + cipher);