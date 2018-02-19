var LZString = require('lz-string');
var CryptoJS = require('crypto-js');
var bigInt = require('node-math-bigint');

var Blackfeather = (function () {
    Blackfeather = Blackfeather || {};
    Blackfeather.VERSION = "2.0.0";

    Blackfeather.Data = Blackfeather.Data || {};
    Blackfeather.Data.Serialization = Blackfeather.Data.Serialization || {};

    Blackfeather.Data.Compression = Blackfeather.Data.Compression || {};
    Blackfeather.Data.Compression.LZString = {
        Compress: function (value) {
            return LZString.compress(value);
        },
        Decompress: function (value) {
            return LZString.decompress(value);
        }
    };

    Blackfeather.Data.Encoding = Blackfeather.Data.Encoding || {};
    Blackfeather.Data.Encoding.TextEncoding = Blackfeather.Data.Encoding.TextEncoding || {};
    Blackfeather.Data.Encoding.TextEncoding.Latin1 = CryptoJS.enc.Latin1;
    Blackfeather.Data.Encoding.TextEncoding.Utf8 = CryptoJS.enc.Utf8;
    Blackfeather.Data.Encoding.TextEncoding.Utf16 = CryptoJS.enc.Utf16;
    Blackfeather.Data.Encoding.TextEncoding.Utf16BigEndian = CryptoJS.enc.Utf16BE;
    Blackfeather.Data.Encoding.TextEncoding.Utf16LittleEndian = CryptoJS.enc.Utf16LE;
    Blackfeather.Data.Encoding.BinaryEncoding = Blackfeather.Data.Encoding.BinaryEncoding || {};
    Blackfeather.Data.Encoding.BinaryEncoding.Hex = CryptoJS.enc.Hex;
    Blackfeather.Data.Encoding.BinaryEncoding.Base64 = CryptoJS.enc.Base64;

    Blackfeather.Security = Blackfeather.Security || {};
    Blackfeather.Security.Cryptology = Blackfeather.Security.Cryptology || {};
    Blackfeather.Security.Cryptology = {
        PBKDF2_ITERATIONS: 1000,
        SaltedData: function () {
            this.Data = null;
            this.Salt = null;

            this.toString = function () {
                return this.toJSON();
            };

            this.toJSON = function () {
                return JSON.stringify({ Data: this.Data, Salt: this.Salt });
            };

            this.fromJSON = function (value) {
                var salted = JSON.parse(value);
                this.Data = salted.Data;
                this.Salt = salted.Salt;
            };
        },
        SecureRandom: function () {
            this.NextBytes = function (length) {
                return CryptoJS.lib.WordArray.random(length).toString();
            };

            this.NextBigInt = function (length) {
                // TODO: Need to audit, may be just as in-secure as Next
                return randBigInt(length, 0);
            };

            // TODO: Not actually secure, just temp until a better solution in js can be found
            this.Next = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
        },
        Kdf: function () {
            this.Compute = function (data, salt, length) {
                var output = new Blackfeather.Security.Cryptology.SaltedData();
                length = (typeof length === "undefined" || length === null) ? 32 : length;

                output.Salt = (typeof salt === "undefined" || salt === null) ? new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16) : CryptoJS.enc.Base64.parse(salt);
                output.Data = CryptoJS.enc.Hex.parse(CryptoJS.PBKDF2(data, output.Salt, { keySize: (length / 4), iterations: Blackfeather.Security.Cryptology.PBKDF2_ITERATIONS }).toString(CryptoJS.enc.Hex));

                return output;
            };
        },
        KeyExchange: function () {
            this.KeyPair = function (Private, Public) {
                this.Private = Private;
                this.Public = Public;
            };

            this.Commonality = function () {
                this.G = bigInt.str2bigInt("3", 10);
                // https://en.wikipedia.org/wiki/RSA_numbers#RSA-617
                // https://en.wikipedia.org/wiki/RSA_numbers#RSA-2048
                this.P = bigInt.str2bigInt("25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357", 10);
            };

            this.Mix = function () {
                var keyPair = new this.KeyPair();
                var commonality = new this.Commonality();

                keyPair.Private = bigInt.bigInt2str(bigInt.randBigInt(2048, 0), 10);
                keyPair.Public = bigInt.bigInt2str(bigInt.powMod(commonality.G, bigInt.str2bigInt(keyPair.Private, 10), commonality.P), 10);

                return keyPair;
            };

            this.Remix = function (keyPair) {
                return bigInt.bigInt2str(bigInt.powMod(bigInt.str2bigInt(keyPair.Public, 10), bigInt.str2bigInt(keyPair.Private, 10), new this.Commonality().P), 10);
            };
        }
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module['exports'] = Blackfeather;
        }

        exports.Blackfeather = Blackfeather;
    } else {
        if (typeof root !== 'undefined') {
            root.Blackfeather = Blackfeather;
        }
    }

    return Blackfeather;
})();