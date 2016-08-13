var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var cipher = "cJHuTYcAV5j798aJuSwPtLcemE86qhXOPDfRWQffIzwVUqctciDLIZNFspmBB3ym7hwVvydcsJeqtE/HmiLwiJCbu6Pwq/V5NZopupTq00BO34PMeQ+DcOkZvKrA/mLlxB0uZO3clclmMXj9+hfLtKKdNnGJTYHWg4dJEg==";
var password = "water123";
var verifier = "321retaw";
var salt = "tNfyIx2PZjf6C+KC9N7Ydg==";

var plain = new Blackfeather.Security.Cryptology.Decryption().Compute(cipher, password, salt, verifier);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("plain text: " + plain);