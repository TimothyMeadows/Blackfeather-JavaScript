var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var cipher = "R1nYMMFKleDdobi4MY09EaGSx6hA6U9jYwNa2JqX3hm3mvGVsHET1Is0QHVguOgM8d88f2VEeP9xP0CyxhiVi+0eO6XQL9C1oUPVWPnXL8xtgzLufoIHMxMISBEIvnUBuXXfI7qQk9RNrCHEw6yjtzy/QRwYlulfMr9WeNt70B2+U5eE";
var textEncoding = Blackfeather.Data.Encoding.TextEncoding.Utf8; // Latin1, Utf8, Utf16, Utf16BigEndian and, Utf16LittleEndian supported.
var password = "water123";
var verifier = "321retaw";
var rounds = 1; // more rounds = more cpu, more cpu = more security, must match when re-computed.

var plain = new Blackfeather.Security.Cryptology.Decryption(textEncoding).Compute(cipher, password, verifier, rounds);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("example text length: " + plain.length);
console.log("example text: " + plain);