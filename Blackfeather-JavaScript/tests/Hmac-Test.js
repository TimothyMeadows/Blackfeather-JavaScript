var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var text = "caw caw caw!"; // any text should work Utf8, Utf16 have been tested.
var rounds = 1; // more rounds = more cpu, more cpu = more security, must match when re-computed.
var password = "water123"; // any text should work Utf8, Utf16 have been tested.

var hmac = new Blackfeather.Security.Cryptology.Hmac().Compute(text, password, rounds); // can also supply your own salt
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("example hmac: " + hmac.toJSON());