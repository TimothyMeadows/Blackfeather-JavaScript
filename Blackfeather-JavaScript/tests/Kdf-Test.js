var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var text = "caw caw caw!"; // any text should work Utf8, Utf16 have been tested.
var salt = new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(8); // 8 byte salting required
var rounds = 1; // more rounds = more cpu, more cpu = more security, must match when re-computed.

var kdf = new Blackfeather.Security.Cryptology.Kdf().Compute(text, salt, rounds);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("example kdf rachet: " + kdf);