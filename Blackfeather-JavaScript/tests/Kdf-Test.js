var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var text = "caw caw caw!";
var salt = "tNfyIx2PZjf6C+KC9N7Ydg==";

var kdf = new Blackfeather.Security.Cryptology.Kdf().Compute(text, salt, 32);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("kdf salt: " + kdf.Salt.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64));
console.log("kdf rachet: " + kdf.Data.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64));