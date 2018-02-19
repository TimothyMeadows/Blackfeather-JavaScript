var Blackfeather = require('../blackfeather-2.0.0');

var hash = new Blackfeather.Security.Cryptology.Hash().Compute("caw caw caw");
var saltedHash = new Blackfeather.Security.Cryptology.Hash().ComputeSalted("caw caw caw");

console.log(`hash: ${hash}`);
console.log(`salted hash: ${saltedHash.Data}, salt: ${saltedHash.Salt}`);