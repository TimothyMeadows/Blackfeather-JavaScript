var Blackfeather = require('../blackfeather-1.0.0');
var JSON = require('node-json');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var memory = new Blackfeather.Data.ManagedMemory();

memory.Write("Test", "TestName", "TestValue");
var json = new Blackfeather.Data.Storage.ManagedMemory().toJSON(memory, JSON);
cosole.log(json);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log("Test name: " + testName.Value);