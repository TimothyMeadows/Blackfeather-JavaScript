var Blackfeather = require('../blackfeather-2.0.0');

var salt = new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16).toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64);
var encrypted = new Blackfeather.Security.Cryptology.EncryptionAtRest().Compute("caw caw caw", "ravun", salt, "raven");
var decrypted = new Blackfeather.Security.Cryptology.DecryptionAtRest().Compute(encrypted.Data.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64), "ravun", salt, "raven");

console.log(`encrypted: ${encrypted.Data}, salt: ${encrypted.Salt}`);
console.log(`decrypted: ${decrypted}`);