var Blackfeather = require('../blackfeather-2.0.0');

var macerated = new Blackfeather.Security.Cryptology.Kdf().Compute("caw caw caw");

console.log(`macerated: ${macerated.Data.toString(Blackfeather.Data.Encoding.BinaryEncoding.Hex)}, salt: ${macerated.Salt}`);