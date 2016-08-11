var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var server = new Blackfeather.Security.Cryptology.DiffieHellman().Mix(); // alice
var client = new Blackfeather.Security.Cryptology.DiffieHellman().Mix(); // bob

var KeyPair = new Blackfeather.Security.Cryptology.DiffieHellman().KeyPair;
var serverHandshake = new KeyPair(server.Private, client.Public);
var clientHandshake = new KeyPair(client.Private, server.Public);
var serverSecret = new Blackfeather.Security.Cryptology.DiffieHellman().Remix(serverHandshake);
var clientSecret = new Blackfeather.Security.Cryptology.DiffieHellman().Remix(clientHandshake);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log(serverHandshake);
console.log(clientHandshake);
console.log("secret's match? " + (clientSecret === serverSecret).toString());