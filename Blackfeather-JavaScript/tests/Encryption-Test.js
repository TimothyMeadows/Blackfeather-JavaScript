var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var textEncoding = Blackfeather.Data.Encoding.TextEncoding.Utf8; // Latin1, Utf8, Utf16, Utf16BigEndian and, Utf16LittleEndian supported.
var text = "caw caw caw!"; // Can be any text matching the specified text encoding.
var password = "water123";
var verifier = "321retaw";
var rounds = 1; // more rounds = more cpu, more cpu = more security, must match when re-computed.

var cipher = new Blackfeather.Security.Cryptology.Encryption(textEncoding).Compute(text, password, verifier, rounds);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("example cipher length: " + cipher.length);
console.log("example cipher: " + cipher);