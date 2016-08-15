var Blackfeather = require('../blackfeather-1.0.0');
var Stopwatch = require("node-stopwatch").Stopwatch;
var stopwatch = Stopwatch.create();

stopwatch.start();
var client = new Blackfeather.Security.Cryptology.KeyExchange().Mix();
var serverPublic = "10072451067358128667370122172133565286426273520457081541202696009092543305211841094697906349575345674115923241301922156530480175764026481816770507437923200637573363088905607034558695241173246307009995878117784478243313131685968854799300800700691656662848606744118040971840314947233291339212661690749394423715891911134762717021019928988569780826551116299625361903924016859140944701252642684457210980390047869449067290007099386872773076553494951935303123004213090275240758545751867197472450416424811618764768165224643793362948959692975844359439266365789906954808980720889327586602558296556297716800168958101769299242493";

var KeyPair = new Blackfeather.Security.Cryptology.KeyExchange().KeyPair;
var clientHandshake = new KeyPair(client.Private, serverPublic);
var clientSecret = new Blackfeather.Security.Cryptology.KeyExchange().Remix(clientHandshake);
stopwatch.stop();

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("\n");

console.log(client);
console.log(clientSecret);