var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var text = "caw caw caw!";
var compressed = Blackfeather.Data.Compression.LZString.Compress(text);
var decompressed = Blackfeather.Data.Compression.LZString.Decompress(compressed);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("text length: " + text.length);
console.log("text: " + text);
console.log("compressed: " + compressed);
console.log("compressed length: " + compressed.length);
console.log("decompressed: " + decompressed);
console.log("decompressed length: " + decompressed.length);