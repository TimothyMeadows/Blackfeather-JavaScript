var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var text = "caw caw caw!"; // any text should work Utf8, Utf16 have been tested.
var salt = "tNfyIx2PZjf6C+KC9N7Ydg==";

var hash = new Blackfeather.Security.Cryptology.Hash().Compute(text, salt);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("hash salt: " + hash.Salt.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64));
console.log("hash: " + hash.Data.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64));