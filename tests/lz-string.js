var Blackfeather = require('../blackfeather-2.0.0');

var compressed = Blackfeather.Data.Compression.LZString.Compress("caw caw caw");
var decompressed = Blackfeather.Data.Compression.LZString.Decompress(compressed);

console.log(`compressed: ${compressed}, length: ${compressed.length}`);
console.log(`decompressed: ${decompressed}, length: ${decompressed.length}`);