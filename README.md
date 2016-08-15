# Blackfeather in JavaScript / Node
#Installing
Browser
```html
  <script src="blackfeather-1.0.0.min.js"></script>
```
Node.js
```bash
  npm install blackfeather@1.0.0 --save
```
Source
```bash
  git clone https://github.com/TimothyMeadows/Blackfeather-JavaScript
```

#Blackfeather.Data.ManagedMemory
Ths is a helper class for storing data in memory in JavaScript. It supports serialization between languages allowing you to import, and, export serializable types.

##ManagedMemorySpace
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
##Read(ponter:string, name:string):ManagedMemorySpace
Read entry from memory that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var caw = memory.Read("birds", "raven");
  console.log(caw);
```
##ReadAll(ponter:string):[ManagedMemorySpace]
Read all entries from memory that matches the pointer.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var birds = memory.ReadAll("birds");
  console.log(birds);
```
##Write(ponter:string, name:string, value:any):void
Write entry into memory. Remove any previous entry that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Write("birds", "raven", "caw");
```
##WriteAll(spaces:[ManagedMemorySpace]):void
Write all entres into memory. Remove any previous entries that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var spaces = [new Blackfeather.Data.ManagedMemorySpace("birds", "raven", "caw", 0, 0, 0)];
  
  memory.WriteAll(spaces);
```
##Delete(ponter:string, name:string):void
Remove any entry from memory that matches the pointer, and, name.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Delete("birds", "raven");
```
##DeleteAll(ponter:string):void
Remove all entries from memory that matches the pointer.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.DeleteAll("birds");
```
##Import(memory:ManagedMemory):void
Load ManagedMemory class as current MangedMemory class.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var memory2 = new Blackfeather.Data.ManagedMemory();
  memory.Import(memory2);
```
##Export():ManagedMemory
Return current ManagedMemory class.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  var memory2 = memory.Export();
```
##Clear():void
Remove all entries from memory. Leaves memory still usable.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Clear();
```
##Dispose():void
Remove all entries from memory. Leaves memory unusable until reconstructed.
```javascript
  var memory = new Blackfeather.Data.ManagedMemory();
  memory.Dispose();
```
#Blackfeather.Data.Compression
This is a collection of usable compression libraries in JavaScript. Right now only LZStrng is supported.

#LZString 
##Compress(data:string):string
```javascript
  var compressed = Blackfeather.Data.Compression.LZString.Compress("caw caw caw!");
  console.log(compressed);
```
##Decompress(data:string):string
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

#Testing
Tests require node.js, and, node-stopwatch.
```bash
  npm install node-stopwatch
  node tests/Hash-Test
```
