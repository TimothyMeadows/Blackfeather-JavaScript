var Blackfeather = require('../blackfeather-2.0.0');

var salt = "tNfyIx2PZjf6C+KC9N7Ydg=="
var encrypted = new Blackfeather.Security.Cryptology.EncryptionAtRest().Compute("caw caw caw!", "water123", salt, "321retaw");
var decrypted = new Blackfeather.Security.Cryptology.DecryptionAtRest().Compute(encrypted.Data.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64), "water123", encrypted.Salt.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64), "321retaw");

console.log(`encrypted: ${encrypted.Data.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64)}, salt: ${encrypted.Salt.toString(Blackfeather.Data.Encoding.BinaryEncoding.Base64)}`);
console.log(`decrypted: ${decrypted}`);