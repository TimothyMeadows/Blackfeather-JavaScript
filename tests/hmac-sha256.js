var Blackfeather = require('../blackfeather-2.0.0');

var hmac = new Blackfeather.Security.Cryptology.Hmac().Compute("caw caw caw", "ravun");
var saltedHmac = new Blackfeather.Security.Cryptology.Hmac().ComputeSalted("caw caw caw", "ravun");

console.log(`hmac: ${hmac}`);
console.log(`salted hmac: ${saltedHmac.Data}, salt: ${saltedHmac.Salt}`);