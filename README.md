# Blackfeather in JavaScript / Node
#Installing
#Browser
```html
  <script src="blackfeather-1.0.0.min.js"></script>
```
#Node.js
https://www.npmjs.com/package/Blackfeather
```bash
  npm install Blackfeather --save
```
#Nuget
#https://www.nuget.org/packages/Blackfeather-JavaScript/
```bash
  Install-Package Blackfeather-JavaScript
```
#Source
```bash
  git clone https://github.com/TimothyMeadows/Blackfeather-JavaScript
```

#Blackfeather.Data.ManagedMemory
Ths is a helper class for storing data in memory in JavaScript. It supports serialization between languages allowing you to import, and, export serializable types.

#ManagedMemorySpace
Model that data in memory is read, and, written too.
```javascript
  Blackfeather.Data.ManagedMemorySpace = function (pointer, name, value, created, accessed, updated) {
    this.Created = created; // unix time
    this.Accessed = accessed; // unix time
    this.Updated = updated; // unix time
    this.Pointer = pointer; // string
    this.Name = name; // string
    this.Value = value; // any
  };
```
#Read(ponter:string, name:string):ManagedMemorySpace
Read entry from memory that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var caw = memory.Read("birds", "raven");
  console.log(caw);
```
#ReadAll(ponter:string):[ManagedMemorySpace]
Read all entries from memory that matches the pointer.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var birds = memory.ReadAll("birds");
  console.log(birds);
```
#Write(ponter:string, name:string, value:any):void
Write entry into memory. Remove any previous entry that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Write("birds", "raven", "caw");
```
#WriteAll(spaces:[ManagedMemorySpace]):void
Write all entres into memory. Remove any previous entries that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var spaces = [new Blackfeather.Data.ManagedMemorySpace("birds", "raven", "caw", 0, 0, 0)];
  
  memory.WriteAll(spaces);
```
#Delete(ponter:string, name:string):void
Remove any entry from memory that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Delete("birds", "raven");
```
#DeleteAll(ponter:string):void
Remove all entries from memory that matches the pointer.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.DeleteAll("birds");
```
#Import(memory:ManagedMemory):void
Load ManagedMemory class as current MangedMemory class.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var memory2 = new Blackfeather.Data.ManagedMemory();
  memory.Import(memory2);
```
#Export():ManagedMemory
Return current ManagedMemory class.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var memory2 = memory.Export();
```
#Clear():void
Remove all entries from memory. Leaves memory still usable.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Clear();
```
#Dispose():void
Remove all entries from memory. Leaves memory unusable until reconstructed.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Dispose();
```
#Blackfeather.Data.Compression
This is a collection of usable compression libraries in JavaScript. Right now only LZStrng is supported.

#LZString 
#Compress(data:string):string
```javascript
  var compressed = Blackfeather.Data.Compression.LZString.Compress("caw caw caw!");
  console.log(compressed);
```
#Decompress(data:string):string
```javascript
  var decompressed = Blackfeather.Data.Compression.LZString.Decompress(
    Blackfeather.Data.Compression.LZString.Compress("caw caw caw!")
  );
  console.log(compressed);
```
#Blackfeather.Data.Encoding
#TextEncoding
```text
  Latin1
  Utf8
  Utf16
  Utf16BigEndian
  Utf16LittleEndian
```
#BinaryEncoding
```text
  Hex
  Base64
```
#Blackfeather.Security.Cryptology
```javascript
  Blackfeather.Security.Cryptology.SaltedData = function () {
    this.Data = null;
    this.Salt = null;
  }
```
#Blackfeather.Security.Cryptology.SecureRandom
#NextBytes(length:number):string
Returns random bytes to the specified length.
```javascript
  var rng = new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16);
  console.log(rng);
```
#NextBigInt(length:number):string
Returns random bytes to the specified length.
```javascript
  var rng = new Blackfeather.Security.Cryptology.SecureRandom().NextBigInt(2048);
  console.log(rng);
```
##Next(min:number, max:number):number
Returns random bytes to the specified length.
```javascript
  var rng = new Blackfeather.Security.Cryptology.SecureRandom().Next(32, 134);
  console.log(rng);
```
#Blackfeather.Security.Cryptology.Kdf
#Compute(data:string, salt:Base64, length:number):SaltedData
Compute PBKDF2 returning SaltedData.
```javascript
  var kdf = new Blackfeather.Security.Cryptology.Kdf().Compute(
    "caw caw caw!",
    "tNfyIx2PZjf6C+KC9N7Ydg==",
    32
  );
  console.log(kdf);
```
#Blackfeather.Security.Cryptology.Hash
#Compute(data:string, salt:Base64):SaltedData
Compute SHA256 wth PBKDF2 returning SaltedData.
```javascript
  var hash = new Blackfeather.Security.Cryptology.Hash().Compute(
    "caw caw caw!",
    "tNfyIx2PZjf6C+KC9N7Ydg=="
  );
  console.log(hash);
```
#Blackfeather.Security.Cryptology.Hmac
#Compute(data:string, key:string, salt:Base64):SaltedData
Compute HMAC-SHA256 wth PBKDF2 returning SaltedData.
```javascript
  var hmac = new Blackfeather.Security.Cryptology.Hmac().Compute(
    "caw caw caw!",
    "water123",
    "tNfyIx2PZjf6C+KC9N7Ydg=="
  );
  console.log(hmac);
```
#Blackfeather.Security.Cryptology.Encryption
#Compute(data:string, password:string, salt:Base64, secondaryVerifier:string):SaltedData
Compute authentcated AES-CTR wth HMAC-SHA256, and, PBKDF2.
```javascript
  var cipher = new Blackfeather.Security.Cryptology.Encryption().Compute(
    "caw caw caw!",
    "water123",
    "tNfyIx2PZjf6C+KC9N7Ydg==",
    "321retaw"
  );
  console.log(cipher);
```
#Blackfeather.Security.Cryptology.Decryption
#Compute(data:string, password:string, salt:Base64, secondaryVerifier:string):string
Compute authentcated AES-CTR wth HMAC-SHA256, and, PBKDF2.
```javascript
  var plain = new Blackfeather.Security.Cryptology.Decryption().Compute(
    "cJHuTYcAV5j798aJuSwPtLcemE86qhXOPDfRWQffIzwVUqctciDLIZNFspmBB3ym7hwVvydcsJeqtE/HmiLwiJCbu6Pwq/V5NZopupTq00BO34PMeQ+DcOkZvKrA/mLlxB0uZO3clclmMXj9+hfLtKKdNnGJTYHWg4dJEg==",
    "water123",
    "tNfyIx2PZjf6C+KC9N7Ydg==",
    "321retaw"
  );
  console.log(plain);
```
#Blackfeather.Security.Cryptology.KeyExchange
```javascript
ar client = new Blackfeather.Security.Cryptology.KeyExchange().Mix();
var serverPublic = "10072451067358128667370122172133565286426273520457081541202696009092543305211841094697906349575345674115923241301922156530480175764026481816770507437923200637573363088905607034558695241173246307009995878117784478243313131685968854799300800700691656662848606744118040971840314947233291339212661690749394423715891911134762717021019928988569780826551116299625361903924016859140944701252642684457210980390047869449067290007099386872773076553494951935303123004213090275240758545751867197472450416424811618764768165224643793362948959692975844359439266365789906954808980720889327586602558296556297716800168958101769299242493";

var KeyPair = new Blackfeather.Security.Cryptology.KeyExchange().KeyPair;
var clientHandshake = new KeyPair(client.Private, serverPublic);
var clientSecret = new Blackfeather.Security.Cryptology.KeyExchange().Remix(clientHandshake);
console.log(client);
console.log(clientSecret);
```
#Testing
Tests require node.js, and, node-stopwatch.
```bash
  npm install node-stopwatch
  node tests/Hash-Test
```
