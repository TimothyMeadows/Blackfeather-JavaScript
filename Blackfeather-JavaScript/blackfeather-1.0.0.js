var Blackfeather = (function () {
    Blackfeather = Blackfeather || {};
    Blackfeather.VERSION = "1.0.0";

    Blackfeather.Data = Blackfeather.Data || {};
    Blackfeather.Data.Serialization = Blackfeather.Data.Serialization || {};

    /* Blackfeather.Data.Serialization */
    Blackfeather.Data.Serialization.ManagedMemory = function (json, instance) {
        if (instance instanceof Blackfeather.Data.Serialization.ManagedMemory) {
            return instance;
        }

        if (!(this instanceof Blackfeather.Data.Serialization.ManagedMemory)) {
            return new Blackfeather.Data.Serialization.ManagedMemory(instance);
        }

        JSON = JSON || window.JSON || json;
        var toJSON = this.toJSON = function (managedMemory) {
            var memory = managedMemory.Export();
            return JSON.stringify(memory);
        };

        var fromJSON = this.fromJSON = function (managedMemory, data) {
            var managedMemory = JSON.parse(data);
            managedMemory.Import(managedMemory);
        };
    }

    /* Blackfeather.Data */
    Blackfeather.Data.ManagedMemorySpace = function (pointer, name, value, created, accessed, updated) {
        this.Created = created;
        this.Accessed = accessed;
        this.Updated = updated;
        this.Pointer = pointer;
        this.Name = name;
        this.Value = value;
    };

    Blackfeather.Data.ManagedMemoryError = function (message) {
        this.name = "ManagedMemoryError";
        this.message = message;
    }

    Blackfeather.Data.ManagedMemory = function (instance) {
        if (instance instanceof Blackfeather.Data.ManagedMemory) {
            return instance;
        }

        if (!(this instanceof Blackfeather.Data.ManagedMemory)) {
            return new Blackfeather.Data.ManagedMemory(instance);
        }

        var _disposed = false;
        var _memory = {};

        var Read = this.Read = function (pointer, name) {
            if (_disposed) {
                throw new Blackfeather.Data.ManagedMemoryError("Object is disposed!");
            }

            if (typeof _memory[pointer] === 'undefined') {
                return null;
            }

            if (typeof _memory[pointer][name] === 'undefined' || _memory[pointer][name] === null) {
                return null;
            }

            return _memory[pointer][name];
        };

        var ReadAll = this.ReadAll = function (pointer) {
            if (_disposed) {
                throw new Blackfeather.Data.ManagedMemoryError("Object is disposed!");
            }

            if (typeof _memory[pointer] === 'undefined') {
                return null;
            }

            return _memory[pointer];
        };

        var Write = this.Write = function (pointer, name, value, created, updated, accessed) {
            if (_disposed) {
                throw new Blackfeather.Data.ManagedMemoryError("Object is disposed!");
            }

            if (typeof _memory[pointer] === 'undefined') {
                _memory[pointer] = {};
            }

            _memory[pointer][name] = new Blackfeather.Data.ManagedMemorySpace(pointer, name, value, created, updated, accessed);
        };

        var WriteAll = this.WriteAll = function (spaces) {
            if (_disposed) {
                throw new Blackfeather.Data.ManagedMemoryError("Object is disposed!");
            }

            if (!(Array.isArray(spaces))) {
                throw new Blackfeather.Data.ManagedMemoryError("Object is not an array!");
            }

            for (var space in spaces) {
                if (!(space instanceof Blackfeather.Data.ManagedMemorySpace)) {
                    throw new Blackfeather.Data.ManagedMemoryError("Object is not of type Blackfeather.Data.ManagedMemorySpace!");
                }

                Write(space.pointer, space.name, space.value, space.created, space.updated, space.accessed)
            }
        };

        var Delete = this.Delete = function (pointer, name) {
            if (typeof _memory[pointer] === 'undefined') {
                return null;
            }

            if (typeof _memory[pointer][name] === 'undefined' || _memory[pointer][name] === null) {
                return null;
            }

            delete _memory[pointer][name];
        };

        var DeleteAll = this.DeleteAll = function (pointer, name) {
            if (typeof _memory[pointer] === 'undefined') {
                return null;
            }

            delete _memory[pointer];
        };

        var Clear = this.Clear = function () {
            _memory = [];
        };

        var Export = this.Export = function () {
            return _memory;
        };

        var Import = this.Import = function (managedMemory) {
            _memory = managedMemory;
        };

        var Dispose = this.Dispose = function () {
            _memory = null;
            _disposed = true;
        };
    };

    /*
   EMBEDDED OPEN SOURCE CODE
   Crypto-JS Bundle v3.1.2 (This was done for loading speed! Crypto-JS uses WAY to many files)

   https://code.google.com/p/crypto-js/
   CryptoJS v3.1.2
   code.google.com/p/crypto-js
   (c) 2009-2013 by Jeff Mott. All rights reserved.

   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

   Redistributions of source code must retain the above copyright notice, this list of conditions, and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions, and the following disclaimer in the documentation or other materials provided with the distribution.
   Neither the name CryptoJS nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS," AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

   ---------------------------------------------------------------------------------------------------------

   Big Integer Library v. 5.5
   Created 2000, last modified 2013
   Leemon Baird
   www.leemon.com
*/

    // Bundle: core.js

    /*
        CryptoJS v3.1.2
        code.google.com/p/crypto-js
        (c) 2009-2013 by Jeff Mott. All rights reserved.
        code.google.com/p/crypto-js/wiki/License
    */

    /**
     * CryptoJS core components.
     */
    var CryptoJS = CryptoJS || (function (Math, undefined) {
        /**
         * CryptoJS namespace.
         */
        var C = {};

        /**
         * Library namespace.
         */
        var C_lib = C.lib = {};

        /**
         * Base object for prototypal inheritance.
         */
        var Base = C_lib.Base = (function () {
            function F() { }

            return {
                /**
                 * Creates a new object that inherits from this object.
                 *
                 * @param {Object} overrides Properties to copy into the new object.
                 *
                 * @return {Object} The new object.
                 *
                 * @static
                 *
                 * @example
                 *
                 *     var MyType = CryptoJS.lib.Base.extend({
                 *         field: 'value',
                 *
                 *         method: function () {
                 *         }
                 *     });
                 */
                extend: function (overrides) {
                    // Spawn
                    F.prototype = this;
                    var subtype = new F();

                    // Augment
                    if (overrides) {
                        subtype.mixIn(overrides);
                    }

                    // Create default initializer
                    if (!subtype.hasOwnProperty('init')) {
                        subtype.init = function () {
                            subtype.$super.init.apply(this, arguments);
                        };
                    }

                    // Initializer's prototype is the subtype object
                    subtype.init.prototype = subtype;

                    // Reference supertype
                    subtype.$super = this;

                    return subtype;
                },

                /**
                 * Extends this object and runs the init method.
                 * Arguments to create() will be passed to init().
                 *
                 * @return {Object} The new object.
                 *
                 * @static
                 *
                 * @example
                 *
                 *     var instance = MyType.create();
                 */
                create: function () {
                    var instance = this.extend();
                    instance.init.apply(instance, arguments);

                    return instance;
                },

                /**
                 * Initializes a newly created object.
                 * Override this method to add some logic when your objects are created.
                 *
                 * @example
                 *
                 *     var MyType = CryptoJS.lib.Base.extend({
                 *         init: function () {
                 *             // ...
                 *         }
                 *     });
                 */
                init: function () {
                },

                /**
                 * Copies properties into this object.
                 *
                 * @param {Object} properties The properties to mix in.
                 *
                 * @example
                 *
                 *     MyType.mixIn({
                 *         field: 'value'
                 *     });
                 */
                mixIn: function (properties) {
                    for (var propertyName in properties) {
                        if (properties.hasOwnProperty(propertyName)) {
                            this[propertyName] = properties[propertyName];
                        }
                    }

                    // IE won't copy toString using the loop above
                    if (properties.hasOwnProperty('toString')) {
                        this.toString = properties.toString;
                    }
                },

                /**
                 * Creates a copy of this object.
                 *
                 * @return {Object} The clone.
                 *
                 * @example
                 *
                 *     var clone = instance.clone();
                 */
                clone: function () {
                    return this.init.prototype.extend(this);
                }
            };
        } ());

        /**
         * An array of 32-bit words.
         *
         * @property {Array} words The array of 32-bit words.
         * @property {number} sigBytes The number of significant bytes in this word array.
         */
        var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function (words, sigBytes) {
                words = this.words = words || [];

                if (sigBytes != undefined) {
                    this.sigBytes = sigBytes;
                } else {
                    this.sigBytes = words.length * 4;
                }
            },

            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function (encoder) {
                return (encoder || Hex).stringify(this);
            },

            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function (wordArray) {
                // Shortcuts
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;

                // Clamp excess bits
                this.clamp();

                // Concat
                if (thisSigBytes % 4) {
                    // Copy one byte at a time
                    for (var i = 0; i < thatSigBytes; i++) {
                        var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                        thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                    }
                } else if (thatWords.length > 0xffff) {
                    // Copy one word at a time
                    for (var i = 0; i < thatSigBytes; i += 4) {
                        thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                    }
                } else {
                    // Copy all words at once
                    thisWords.push.apply(thisWords, thatWords);
                }
                this.sigBytes += thatSigBytes;

                // Chainable
                return this;
            },

            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function () {
                // Shortcuts
                var words = this.words;
                var sigBytes = this.sigBytes;

                // Clamp
                words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
                words.length = Math.ceil(sigBytes / 4);
            },

            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function () {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);

                return clone;
            },

            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function (nBytes) {
                var words = [];
                for (var i = 0; i < nBytes; i += 4) {
                    words.push((Math.random() * 0x100000000) | 0);
                }

                return new WordArray.init(words, nBytes);
            }
        });

        /**
         * Encoder namespace.
         */
        var C_enc = C.enc = {};

        /**
         * Hex encoding strategy.
         */
        var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;

                // Convert
                var hexChars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    hexChars.push((bite >>> 4).toString(16));
                    hexChars.push((bite & 0x0f).toString(16));
                }

                return hexChars.join('');
            },

            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function (hexStr) {
                // Shortcut
                var hexStrLength = hexStr.length;

                // Convert
                var words = [];
                for (var i = 0; i < hexStrLength; i += 2) {
                    words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
                }

                return new WordArray.init(words, hexStrLength / 2);
            }
        };

        /**
         * Latin1 encoding strategy.
         */
        var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;

                // Convert
                var latin1Chars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    latin1Chars.push(String.fromCharCode(bite));
                }

                return latin1Chars.join('');
            },

            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function (latin1Str) {
                // Shortcut
                var latin1StrLength = latin1Str.length;

                // Convert
                var words = [];
                for (var i = 0; i < latin1StrLength; i++) {
                    words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
                }

                return new WordArray.init(words, latin1StrLength);
            }
        };

        /**
         * UTF-8 encoding strategy.
         */
        var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function (wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error('Malformed UTF-8 data');
                }
            },

            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function (utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        };

        /**
         * Abstract buffered block algorithm template.
         *
         * The property blockSize must be implemented in a concrete subtype.
         *
         * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
         */
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function () {
                // Initial values
                this._data = new WordArray.init();
                this._nDataBytes = 0;
            },

            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function (data) {
                // Convert string to WordArray, else assume WordArray already
                if (typeof data == 'string') {
                    data = Utf8.parse(data);
                }

                // Append
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
            },

            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function (doFlush) {
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4;

                // Count blocks ready
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                if (doFlush) {
                    // Round up to include partial blocks
                    nBlocksReady = Math.ceil(nBlocksReady);
                } else {
                    // Round down to include only full blocks,
                    // less the number of blocks that must remain in the buffer
                    nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
                }

                // Count words ready
                var nWordsReady = nBlocksReady * blockSize;

                // Count bytes ready
                var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

                // Process blocks
                if (nWordsReady) {
                    for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                        // Perform concrete-algorithm logic
                        this._doProcessBlock(dataWords, offset);
                    }

                    // Remove processed words
                    var processedWords = dataWords.splice(0, nWordsReady);
                    data.sigBytes -= nBytesReady;
                }

                // Return processed words
                return new WordArray.init(processedWords, nBytesReady);
            },

            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function () {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();

                return clone;
            },

            _minBufferSize: 0
        });

        /**
         * Abstract hasher template.
         *
         * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
         */
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),

            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function (cfg) {
                // Apply config defaults
                this.cfg = this.cfg.extend(cfg);

                // Set initial values
                this.reset();
            },

            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function () {
                // Reset data buffer
                BufferedBlockAlgorithm.reset.call(this);

                // Perform concrete-hasher logic
                this._doReset();
            },

            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function (messageUpdate) {
                // Append
                this._append(messageUpdate);

                // Update the hash
                this._process();

                // Chainable
                return this;
            },

            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function (messageUpdate) {
                // Final message update
                if (messageUpdate) {
                    this._append(messageUpdate);
                }

                // Perform concrete-hasher logic
                var hash = this._doFinalize();

                return hash;
            },

            blockSize: 512 / 32,

            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function (hasher) {
                return function (message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },

            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function (hasher) {
                return function (message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });

        /**
         * Algorithm namespace.
         */
        var C_algo = C.algo = {};

        return C;
    } (Math));

    // Bundle: md5.js
    var CryptoJS = CryptoJS || function (s, p) {
        var m = {}, l = m.lib = {}, n = function () { }, r = l.Base = { extend: function (b) { n.prototype = this; var h = new n; b && h.mixIn(b); h.hasOwnProperty("init") || (h.init = function () { h.$super.init.apply(this, arguments) }); h.init.prototype = h; h.$super = this; return h }, create: function () { var b = this.extend(); b.init.apply(b, arguments); return b }, init: function () { }, mixIn: function (b) { for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]); b.hasOwnProperty("toString") && (this.toString = b.toString) }, clone: function () { return this.init.prototype.extend(this) } },
            q = l.WordArray = r.extend({
                init: function (b, h) { b = this.words = b || []; this.sigBytes = h != p ? h : 4 * b.length }, toString: function (b) { return (b || t).stringify(this) }, concat: function (b) { var h = this.words, a = b.words, j = this.sigBytes; b = b.sigBytes; this.clamp(); if (j % 4) for (var g = 0; g < b; g++) h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4); else if (65535 < a.length) for (g = 0; g < b; g += 4) h[j + g >>> 2] = a[g >>> 2]; else h.push.apply(h, a); this.sigBytes += b; return this }, clamp: function () {
                    var b = this.words, h = this.sigBytes; b[h >>> 2] &= 4294967295 <<
                        32 - 8 * (h % 4); b.length = s.ceil(h / 4)
                }, clone: function () { var b = r.clone.call(this); b.words = this.words.slice(0); return b }, random: function (b) { for (var h = [], a = 0; a < b; a += 4) h.push(4294967296 * s.random() | 0); return new q.init(h, b) }
            }), v = m.enc = {}, t = v.Hex = {
                stringify: function (b) { var a = b.words; b = b.sigBytes; for (var g = [], j = 0; j < b; j++) { var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255; g.push((k >>> 4).toString(16)); g.push((k & 15).toString(16)) } return g.join("") }, parse: function (b) {
                    for (var a = b.length, g = [], j = 0; j < a; j += 2) g[j >>> 3] |= parseInt(b.substr(j,
                        2), 16) << 24 - 4 * (j % 8); return new q.init(g, a / 2)
                }
            }, a = v.Latin1 = { stringify: function (b) { var a = b.words; b = b.sigBytes; for (var g = [], j = 0; j < b; j++) g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return g.join("") }, parse: function (b) { for (var a = b.length, g = [], j = 0; j < a; j++) g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new q.init(g, a) } }, u = v.Utf8 = { stringify: function (b) { try { return decodeURIComponent(escape(a.stringify(b))) } catch (g) { throw Error("Malformed UTF-8 data"); } }, parse: function (b) { return a.parse(unescape(encodeURIComponent(b))) } },
            g = l.BufferedBlockAlgorithm = r.extend({
                reset: function () { this._data = new q.init; this._nDataBytes = 0 }, _append: function (b) { "string" == typeof b && (b = u.parse(b)); this._data.concat(b); this._nDataBytes += b.sigBytes }, _process: function (b) { var a = this._data, g = a.words, j = a.sigBytes, k = this.blockSize, m = j / (4 * k), m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0); b = m * k; j = s.min(4 * b, j); if (b) { for (var l = 0; l < b; l += k) this._doProcessBlock(g, l); l = g.splice(0, b); a.sigBytes -= j } return new q.init(l, j) }, clone: function () {
                    var b = r.clone.call(this);
                    b._data = this._data.clone(); return b
                }, _minBufferSize: 0
            }); l.Hasher = g.extend({
                cfg: r.extend(), init: function (b) { this.cfg = this.cfg.extend(b); this.reset() }, reset: function () { g.reset.call(this); this._doReset() }, update: function (b) { this._append(b); this._process(); return this }, finalize: function (b) { b && this._append(b); return this._doFinalize() }, blockSize: 16, _createHelper: function (b) { return function (a, g) { return (new b.init(g)).finalize(a) } }, _createHmacHelper: function (b) {
                    return function (a, g) {
                        return (new k.HMAC.init(b,
                            g)).finalize(a)
                    }
                }
            }); var k = m.algo = {}; return m
    } (Math);
    (function (s) {
        function p(a, k, b, h, l, j, m) { a = a + (k & b | ~k & h) + l + m; return (a << j | a >>> 32 - j) + k } function m(a, k, b, h, l, j, m) { a = a + (k & h | b & ~h) + l + m; return (a << j | a >>> 32 - j) + k } function l(a, k, b, h, l, j, m) { a = a + (k ^ b ^ h) + l + m; return (a << j | a >>> 32 - j) + k } function n(a, k, b, h, l, j, m) { a = a + (b ^ (k | ~h)) + l + m; return (a << j | a >>> 32 - j) + k } for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0; q = q.MD5 = t.extend({
            _doReset: function () { this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878]) },
            _doProcessBlock: function (g, k) {
                for (var b = 0; 16 > b; b++) { var h = k + b, w = g[h]; g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360 } var b = this._hash.words, h = g[k + 0], w = g[k + 1], j = g[k + 2], q = g[k + 3], r = g[k + 4], s = g[k + 5], t = g[k + 6], u = g[k + 7], v = g[k + 8], x = g[k + 9], y = g[k + 10], z = g[k + 11], A = g[k + 12], B = g[k + 13], C = g[k + 14], D = g[k + 15], c = b[0], d = b[1], e = b[2], f = b[3], c = p(c, d, e, f, h, 7, a[0]), f = p(f, c, d, e, w, 12, a[1]), e = p(e, f, c, d, j, 17, a[2]), d = p(d, e, f, c, q, 22, a[3]), c = p(c, d, e, f, r, 7, a[4]), f = p(f, c, d, e, s, 12, a[5]), e = p(e, f, c, d, t, 17, a[6]), d = p(d, e, f, c, u, 22, a[7]),
                    c = p(c, d, e, f, v, 7, a[8]), f = p(f, c, d, e, x, 12, a[9]), e = p(e, f, c, d, y, 17, a[10]), d = p(d, e, f, c, z, 22, a[11]), c = p(c, d, e, f, A, 7, a[12]), f = p(f, c, d, e, B, 12, a[13]), e = p(e, f, c, d, C, 17, a[14]), d = p(d, e, f, c, D, 22, a[15]), c = m(c, d, e, f, w, 5, a[16]), f = m(f, c, d, e, t, 9, a[17]), e = m(e, f, c, d, z, 14, a[18]), d = m(d, e, f, c, h, 20, a[19]), c = m(c, d, e, f, s, 5, a[20]), f = m(f, c, d, e, y, 9, a[21]), e = m(e, f, c, d, D, 14, a[22]), d = m(d, e, f, c, r, 20, a[23]), c = m(c, d, e, f, x, 5, a[24]), f = m(f, c, d, e, C, 9, a[25]), e = m(e, f, c, d, q, 14, a[26]), d = m(d, e, f, c, v, 20, a[27]), c = m(c, d, e, f, B, 5, a[28]), f = m(f, c,
                        d, e, j, 9, a[29]), e = m(e, f, c, d, u, 14, a[30]), d = m(d, e, f, c, A, 20, a[31]), c = l(c, d, e, f, s, 4, a[32]), f = l(f, c, d, e, v, 11, a[33]), e = l(e, f, c, d, z, 16, a[34]), d = l(d, e, f, c, C, 23, a[35]), c = l(c, d, e, f, w, 4, a[36]), f = l(f, c, d, e, r, 11, a[37]), e = l(e, f, c, d, u, 16, a[38]), d = l(d, e, f, c, y, 23, a[39]), c = l(c, d, e, f, B, 4, a[40]), f = l(f, c, d, e, h, 11, a[41]), e = l(e, f, c, d, q, 16, a[42]), d = l(d, e, f, c, t, 23, a[43]), c = l(c, d, e, f, x, 4, a[44]), f = l(f, c, d, e, A, 11, a[45]), e = l(e, f, c, d, D, 16, a[46]), d = l(d, e, f, c, j, 23, a[47]), c = n(c, d, e, f, h, 6, a[48]), f = n(f, c, d, e, u, 10, a[49]), e = n(e, f, c, d,
                            C, 15, a[50]), d = n(d, e, f, c, s, 21, a[51]), c = n(c, d, e, f, A, 6, a[52]), f = n(f, c, d, e, q, 10, a[53]), e = n(e, f, c, d, y, 15, a[54]), d = n(d, e, f, c, w, 21, a[55]), c = n(c, d, e, f, v, 6, a[56]), f = n(f, c, d, e, D, 10, a[57]), e = n(e, f, c, d, t, 15, a[58]), d = n(d, e, f, c, B, 21, a[59]), c = n(c, d, e, f, r, 6, a[60]), f = n(f, c, d, e, z, 10, a[61]), e = n(e, f, c, d, j, 15, a[62]), d = n(d, e, f, c, x, 21, a[63]); b[0] = b[0] + c | 0; b[1] = b[1] + d | 0; b[2] = b[2] + e | 0; b[3] = b[3] + f | 0
            }, _doFinalize: function () {
                var a = this._data, k = a.words, b = 8 * this._nDataBytes, h = 8 * a.sigBytes; k[h >>> 5] |= 128 << 24 - h % 32; var l = s.floor(b /
                    4294967296); k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360; k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360; a.sigBytes = 4 * (k.length + 1); this._process(); a = this._hash; k = a.words; for (b = 0; 4 > b; b++) h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360; return a
            }, clone: function () { var a = t.clone.call(this); a._hash = this._hash.clone(); return a }
        }); r.MD5 = t._createHelper(q); r.HmacMD5 = t._createHmacHelper(q)
    })(Math);

    // Bundle: hmac-sha1.js
    var CryptoJS = CryptoJS || function (g, l) {
        var e = {}, d = e.lib = {}, m = function () { }, k = d.Base = { extend: function (a) { m.prototype = this; var c = new m; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
            p = d.WordArray = k.extend({
                init: function (a, c) { a = this.words = a || []; this.sigBytes = c != l ? c : 4 * a.length }, toString: function (a) { return (a || n).stringify(this) }, concat: function (a) { var c = this.words, q = a.words, f = this.sigBytes; a = a.sigBytes; this.clamp(); if (f % 4) for (var b = 0; b < a; b++) c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4); else if (65535 < q.length) for (b = 0; b < a; b += 4) c[f + b >>> 2] = q[b >>> 2]; else c.push.apply(c, q); this.sigBytes += a; return this }, clamp: function () {
                    var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
                        32 - 8 * (c % 4); a.length = g.ceil(c / 4)
                }, clone: function () { var a = k.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * g.random() | 0); return new p.init(c, a) }
            }), b = e.enc = {}, n = b.Hex = {
                stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], f = 0; f < a; f++) { var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255; b.push((d >>> 4).toString(16)); b.push((d & 15).toString(16)) } return b.join("") }, parse: function (a) {
                    for (var c = a.length, b = [], f = 0; f < c; f += 2) b[f >>> 3] |= parseInt(a.substr(f,
                        2), 16) << 24 - 4 * (f % 8); return new p.init(b, c / 2)
                }
            }, j = b.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], f = 0; f < a; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255)); return b.join("") }, parse: function (a) { for (var c = a.length, b = [], f = 0; f < c; f++) b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4); return new p.init(b, c) } }, h = b.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(j.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return j.parse(unescape(encodeURIComponent(a))) } },
            r = d.BufferedBlockAlgorithm = k.extend({
                reset: function () { this._data = new p.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = h.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, b = c.words, f = c.sigBytes, d = this.blockSize, e = f / (4 * d), e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0); a = e * d; f = g.min(4 * a, f); if (a) { for (var k = 0; k < a; k += d) this._doProcessBlock(b, k); k = b.splice(0, a); c.sigBytes -= f } return new p.init(k, f) }, clone: function () {
                    var a = k.clone.call(this);
                    a._data = this._data.clone(); return a
                }, _minBufferSize: 0
            }); d.Hasher = r.extend({
                cfg: k.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { r.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, d) { return (new a.init(d)).finalize(b) } }, _createHmacHelper: function (a) {
                    return function (b, d) {
                        return (new s.HMAC.init(a,
                            d)).finalize(b)
                    }
                }
            }); var s = e.algo = {}; return e
    } (Math);
    (function () {
        var g = CryptoJS, l = g.lib, e = l.WordArray, d = l.Hasher, m = [], l = g.algo.SHA1 = d.extend({
            _doReset: function () { this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (d, e) {
                for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {
                    if (16 > a) m[a] = d[e + a] | 0; else { var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16]; m[a] = c << 1 | c >>> 31 } c = (n << 5 | n >>> 27) + l + m[a]; c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^
                        g) - 899497514); l = g; g = h; h = j << 30 | j >>> 2; j = n; n = c
                } b[0] = b[0] + n | 0; b[1] = b[1] + j | 0; b[2] = b[2] + h | 0; b[3] = b[3] + g | 0; b[4] = b[4] + l | 0
            }, _doFinalize: function () { var d = this._data, e = d.words, b = 8 * this._nDataBytes, g = 8 * d.sigBytes; e[g >>> 5] |= 128 << 24 - g % 32; e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296); e[(g + 64 >>> 9 << 4) + 15] = b; d.sigBytes = 4 * e.length; this._process(); return this._hash }, clone: function () { var e = d.clone.call(this); e._hash = this._hash.clone(); return e }
        }); g.SHA1 = d._createHelper(l); g.HmacSHA1 = d._createHmacHelper(l)
    })();
    (function () {
        var g = CryptoJS, l = g.enc.Utf8; g.algo.HMAC = g.lib.Base.extend({
            init: function (e, d) { e = this._hasher = new e.init; "string" == typeof d && (d = l.parse(d)); var g = e.blockSize, k = 4 * g; d.sigBytes > k && (d = e.finalize(d)); d.clamp(); for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; h < g; h++) n[h] ^= 1549556828, j[h] ^= 909522486; p.sigBytes = b.sigBytes = k; this.reset() }, reset: function () { var e = this._hasher; e.reset(); e.update(this._iKey) }, update: function (e) { this._hasher.update(e); return this }, finalize: function (e) {
                var d =
                    this._hasher; e = d.finalize(e); d.reset(); return d.finalize(this._oKey.clone().concat(e))
            }
        })
    })();

    // Bundle: sha1.js
    var CryptoJS = CryptoJS || function (e, m) {
        var p = {}, j = p.lib = {}, l = function () { }, f = j.Base = { extend: function (a) { l.prototype = this; var c = new l; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
            n = j.WordArray = f.extend({
                init: function (a, c) { a = this.words = a || []; this.sigBytes = c != m ? c : 4 * a.length }, toString: function (a) { return (a || h).stringify(this) }, concat: function (a) { var c = this.words, q = a.words, d = this.sigBytes; a = a.sigBytes; this.clamp(); if (d % 4) for (var b = 0; b < a; b++) c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4); else if (65535 < q.length) for (b = 0; b < a; b += 4) c[d + b >>> 2] = q[b >>> 2]; else c.push.apply(c, q); this.sigBytes += a; return this }, clamp: function () {
                    var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
                        32 - 8 * (c % 4); a.length = e.ceil(c / 4)
                }, clone: function () { var a = f.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * e.random() | 0); return new n.init(c, a) }
            }), b = p.enc = {}, h = b.Hex = {
                stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], d = 0; d < a; d++) { var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255; b.push((f >>> 4).toString(16)); b.push((f & 15).toString(16)) } return b.join("") }, parse: function (a) {
                    for (var c = a.length, b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d,
                        2), 16) << 24 - 4 * (d % 8); return new n.init(b, c / 2)
                }
            }, g = b.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255)); return b.join("") }, parse: function (a) { for (var c = a.length, b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4); return new n.init(b, c) } }, r = b.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(g.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return g.parse(unescape(encodeURIComponent(a))) } },
            k = j.BufferedBlockAlgorithm = f.extend({
                reset: function () { this._data = new n.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = r.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, b = c.words, d = c.sigBytes, f = this.blockSize, h = d / (4 * f), h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0); a = h * f; d = e.min(4 * a, d); if (a) { for (var g = 0; g < a; g += f) this._doProcessBlock(b, g); g = b.splice(0, a); c.sigBytes -= d } return new n.init(g, d) }, clone: function () {
                    var a = f.clone.call(this);
                    a._data = this._data.clone(); return a
                }, _minBufferSize: 0
            }); j.Hasher = k.extend({
                cfg: f.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { k.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (c, b) { return (new a.init(b)).finalize(c) } }, _createHmacHelper: function (a) {
                    return function (b, f) {
                        return (new s.HMAC.init(a,
                            f)).finalize(b)
                    }
                }
            }); var s = p.algo = {}; return p
    } (Math);
    (function () {
        var e = CryptoJS, m = e.lib, p = m.WordArray, j = m.Hasher, l = [], m = e.algo.SHA1 = j.extend({
            _doReset: function () { this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (f, n) {
                for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                    if (16 > a) l[a] = f[n + a] | 0; else { var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]; l[a] = c << 1 | c >>> 31 } c = (h << 5 | h >>> 27) + j + l[a]; c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^
                        k) - 899497514); j = k; k = e; e = g << 30 | g >>> 2; g = h; h = c
                } b[0] = b[0] + h | 0; b[1] = b[1] + g | 0; b[2] = b[2] + e | 0; b[3] = b[3] + k | 0; b[4] = b[4] + j | 0
            }, _doFinalize: function () { var f = this._data, e = f.words, b = 8 * this._nDataBytes, h = 8 * f.sigBytes; e[h >>> 5] |= 128 << 24 - h % 32; e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296); e[(h + 64 >>> 9 << 4) + 15] = b; f.sigBytes = 4 * e.length; this._process(); return this._hash }, clone: function () { var e = j.clone.call(this); e._hash = this._hash.clone(); return e }
        }); e.SHA1 = j._createHelper(m); e.HmacSHA1 = j._createHmacHelper(m)
    })();

    // Bundle: evpkdf.js
    (function () {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;

        /**
         * This key derivation function is meant to conform with EVP_BytesToKey.
         * www.openssl.org/docs/crypto/EVP_BytesToKey.html
         */
        var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hash algorithm to use. Default: MD5
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
                keySize: 128 / 32,
                hasher: MD5,
                iterations: 1
            }),

            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.EvpKDF.create();
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
             */
            init: function (cfg) {
                this.cfg = this.cfg.extend(cfg);
            },

            /**
             * Derives a key from a password.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function (password, salt) {
                // Shortcut
                var cfg = this.cfg;

                // Init hasher
                var hasher = cfg.hasher.create();

                // Initial values
                var derivedKey = WordArray.create();

                // Shortcuts
                var derivedKeyWords = derivedKey.words;
                var keySize = cfg.keySize;
                var iterations = cfg.iterations;

                // Generate key
                while (derivedKeyWords.length < keySize) {
                    if (block) {
                        hasher.update(block);
                    }
                    var block = hasher.update(password).finalize(salt);
                    hasher.reset();

                    // Iterations
                    for (var i = 1; i < iterations; i++) {
                        block = hasher.finalize(block);
                        hasher.reset();
                    }

                    derivedKey.concat(block);
                }
                derivedKey.sigBytes = keySize * 4;

                return derivedKey;
            }
        });

        /**
         * Derives a key from a password.
         *
         * @param {WordArray|string} password The password.
         * @param {WordArray|string} salt A salt.
         * @param {Object} cfg (Optional) The configuration options to use for this computation.
         *
         * @return {WordArray} The derived key.
         *
         * @static
         *
         * @example
         *
         *     var key = CryptoJS.EvpKDF(password, salt);
         *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
         *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
         */
        C.EvpKDF = function (password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
        };
    } ());

    // Bundle: sha256.js
    (function (Math) {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;

        // Initialization and round constants tables
        var H = [];
        var K = [];

        // Compute constants
        (function () {
            function isPrime(n) {
                var sqrtN = Math.sqrt(n);
                for (var factor = 2; factor <= sqrtN; factor++) {
                    if (!(n % factor)) {
                        return false;
                    }
                }

                return true;
            }

            function getFractionalBits(n) {
                return ((n - (n | 0)) * 0x100000000) | 0;
            }

            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
                if (isPrime(n)) {
                    if (nPrime < 8) {
                        H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                    }
                    K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

                    nPrime++;
                }

                n++;
            }
        } ());

        // Reusable object
        var W = [];

        /**
         * SHA-256 hash algorithm.
         */
        var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function () {
                this._hash = new WordArray.init(H.slice(0));
            },

            _doProcessBlock: function (M, offset) {
                // Shortcut
                var H = this._hash.words;

                // Working variables
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                var f = H[5];
                var g = H[6];
                var h = H[7];

                // Computation
                for (var i = 0; i < 64; i++) {
                    if (i < 16) {
                        W[i] = M[offset + i] | 0;
                    } else {
                        var gamma0x = W[i - 15];
                        var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
                            ((gamma0x << 14) | (gamma0x >>> 18)) ^
                            (gamma0x >>> 3);

                        var gamma1x = W[i - 2];
                        var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                            ((gamma1x << 13) | (gamma1x >>> 19)) ^
                            (gamma1x >>> 10);

                        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                    }

                    var ch = (e & f) ^ (~e & g);
                    var maj = (a & b) ^ (a & c) ^ (b & c);

                    var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
                    var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));

                    var t1 = h + sigma1 + ch + K[i] + W[i];
                    var t2 = sigma0 + maj;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                // Intermediate hash value
                H[0] = (H[0] + a) | 0;
                H[1] = (H[1] + b) | 0;
                H[2] = (H[2] + c) | 0;
                H[3] = (H[3] + d) | 0;
                H[4] = (H[4] + e) | 0;
                H[5] = (H[5] + f) | 0;
                H[6] = (H[6] + g) | 0;
                H[7] = (H[7] + h) | 0;
            },

            _doFinalize: function () {
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;

                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;

                // Add padding
                dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;

                // Hash final blocks
                this._process();

                // Return final computed hash
                return this._hash;
            },

            clone: function () {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();

                return clone;
            }
        });

        /**
         * Shortcut function to the hasher's object interface.
         *
         * @param {WordArray|string} message The message to hash.
         *
         * @return {WordArray} The hash.
         *
         * @static
         *
         * @example
         *
         *     var hash = CryptoJS.SHA256('message');
         *     var hash = CryptoJS.SHA256(wordArray);
         */
        C.SHA256 = Hasher._createHelper(SHA256);

        /**
         * Shortcut function to the HMAC's object interface.
         *
         * @param {WordArray|string} message The message to hash.
         * @param {WordArray|string} key The secret key.
         *
         * @return {WordArray} The HMAC.
         *
         * @static
         *
         * @example
         *
         *     var hmac = CryptoJS.HmacSHA256(message, key);
         */
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
    } (Math));

    // Bundle: pbkdf2.js
    var CryptoJS = CryptoJS || function (g, j) {
        var e = {}, d = e.lib = {}, m = function () { }, n = d.Base = { extend: function (a) { m.prototype = this; var c = new m; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
            q = d.WordArray = n.extend({
                init: function (a, c) { a = this.words = a || []; this.sigBytes = c != j ? c : 4 * a.length }, toString: function (a) { return (a || l).stringify(this) }, concat: function (a) { var c = this.words, p = a.words, f = this.sigBytes; a = a.sigBytes; this.clamp(); if (f % 4) for (var b = 0; b < a; b++) c[f + b >>> 2] |= (p[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4); else if (65535 < p.length) for (b = 0; b < a; b += 4) c[f + b >>> 2] = p[b >>> 2]; else c.push.apply(c, p); this.sigBytes += a; return this }, clamp: function () {
                    var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
                        32 - 8 * (c % 4); a.length = g.ceil(c / 4)
                }, clone: function () { var a = n.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * g.random() | 0); return new q.init(c, a) }
            }), b = e.enc = {}, l = b.Hex = {
                stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], f = 0; f < a; f++) { var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255; b.push((d >>> 4).toString(16)); b.push((d & 15).toString(16)) } return b.join("") }, parse: function (a) {
                    for (var c = a.length, b = [], f = 0; f < c; f += 2) b[f >>> 3] |= parseInt(a.substr(f,
                        2), 16) << 24 - 4 * (f % 8); return new q.init(b, c / 2)
                }
            }, k = b.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var b = [], f = 0; f < a; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255)); return b.join("") }, parse: function (a) { for (var c = a.length, b = [], f = 0; f < c; f++) b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4); return new q.init(b, c) } }, h = b.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(k.stringify(a))) } catch (b) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return k.parse(unescape(encodeURIComponent(a))) } },
            u = d.BufferedBlockAlgorithm = n.extend({
                reset: function () { this._data = new q.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = h.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var b = this._data, d = b.words, f = b.sigBytes, l = this.blockSize, e = f / (4 * l), e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0); a = e * l; f = g.min(4 * a, f); if (a) { for (var h = 0; h < a; h += l) this._doProcessBlock(d, h); h = d.splice(0, a); b.sigBytes -= f } return new q.init(h, f) }, clone: function () {
                    var a = n.clone.call(this);
                    a._data = this._data.clone(); return a
                }, _minBufferSize: 0
            }); d.Hasher = u.extend({
                cfg: n.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { u.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, d) { return (new a.init(d)).finalize(b) } }, _createHmacHelper: function (a) {
                    return function (b, d) {
                        return (new w.HMAC.init(a,
                            d)).finalize(b)
                    }
                }
            }); var w = e.algo = {}; return e
    } (Math);
    (function () {
        var g = CryptoJS, j = g.lib, e = j.WordArray, d = j.Hasher, m = [], j = g.algo.SHA1 = d.extend({
            _doReset: function () { this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (d, e) {
                for (var b = this._hash.words, l = b[0], k = b[1], h = b[2], g = b[3], j = b[4], a = 0; 80 > a; a++) {
                    if (16 > a) m[a] = d[e + a] | 0; else { var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16]; m[a] = c << 1 | c >>> 31 } c = (l << 5 | l >>> 27) + j + m[a]; c = 20 > a ? c + ((k & h | ~k & g) + 1518500249) : 40 > a ? c + ((k ^ h ^ g) + 1859775393) : 60 > a ? c + ((k & h | k & g | h & g) - 1894007588) : c + ((k ^ h ^
                        g) - 899497514); j = g; g = h; h = k << 30 | k >>> 2; k = l; l = c
                } b[0] = b[0] + l | 0; b[1] = b[1] + k | 0; b[2] = b[2] + h | 0; b[3] = b[3] + g | 0; b[4] = b[4] + j | 0
            }, _doFinalize: function () { var d = this._data, e = d.words, b = 8 * this._nDataBytes, l = 8 * d.sigBytes; e[l >>> 5] |= 128 << 24 - l % 32; e[(l + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296); e[(l + 64 >>> 9 << 4) + 15] = b; d.sigBytes = 4 * e.length; this._process(); return this._hash }, clone: function () { var e = d.clone.call(this); e._hash = this._hash.clone(); return e }
        }); g.SHA1 = d._createHelper(j); g.HmacSHA1 = d._createHmacHelper(j)
    })();
    (function () {
        var g = CryptoJS, j = g.enc.Utf8; g.algo.HMAC = g.lib.Base.extend({
            init: function (e, d) { e = this._hasher = new e.init; "string" == typeof d && (d = j.parse(d)); var g = e.blockSize, n = 4 * g; d.sigBytes > n && (d = e.finalize(d)); d.clamp(); for (var q = this._oKey = d.clone(), b = this._iKey = d.clone(), l = q.words, k = b.words, h = 0; h < g; h++) l[h] ^= 1549556828, k[h] ^= 909522486; q.sigBytes = b.sigBytes = n; this.reset() }, reset: function () { var e = this._hasher; e.reset(); e.update(this._iKey) }, update: function (e) { this._hasher.update(e); return this }, finalize: function (e) {
                var d =
                    this._hasher; e = d.finalize(e); d.reset(); return d.finalize(this._oKey.clone().concat(e))
            }
        })
    })();
    (function () {
        var g = CryptoJS, j = g.lib, e = j.Base, d = j.WordArray, j = g.algo, m = j.HMAC, n = j.PBKDF2 = e.extend({
            cfg: e.extend({ keySize: 4, hasher: j.SHA1, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (e, b) {
                for (var g = this.cfg, k = m.create(g.hasher, e), h = d.create(), j = d.create([1]), n = h.words, a = j.words, c = g.keySize, g = g.iterations; n.length < c;) {
                    var p = k.update(b).finalize(j); k.reset(); for (var f = p.words, v = f.length, s = p, t = 1; t < g; t++) { s = k.finalize(s); k.reset(); for (var x = s.words, r = 0; r < v; r++) f[r] ^= x[r] } h.concat(p);
                    a[0]++
                } h.sigBytes = 4 * c; return h
            }
        }); g.PBKDF2 = function (d, b, e) { return n.create(e).compute(d, b) }
    })();

    // Bundle: lib-typedarrays.js
    (function () {
        if ("function" == typeof ArrayBuffer) {
            var b = CryptoJS.lib.WordArray, e = b.init; (b.init = function (a) {
                a instanceof ArrayBuffer && (a = new Uint8Array(a)); if (a instanceof Int8Array || a instanceof Uint8ClampedArray || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array) a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength); if (a instanceof Uint8Array) {
                    for (var b = a.byteLength, d = [], c = 0; c < b; c++) d[c >>> 2] |= a[c] <<
                        24 - 8 * (c % 4); e.call(this, d, b)
                } else e.apply(this, arguments)
            }).prototype = b
        }
    })();

    // Bundle: x64-core.js
    (function (g) { var a = CryptoJS, f = a.lib, e = f.Base, h = f.WordArray, a = a.x64 = {}; a.Word = e.extend({ init: function (b, c) { this.high = b; this.low = c } }); a.WordArray = e.extend({ init: function (b, c) { b = this.words = b || []; this.sigBytes = c != g ? c : 8 * b.length }, toX32: function () { for (var b = this.words, c = b.length, a = [], d = 0; d < c; d++) { var e = b[d]; a.push(e.high); a.push(e.low) } return h.create(a, this.sigBytes) }, clone: function () { for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++) c[d] = c[d].clone(); return b } }) })();

    // Bundle: cipher-core.js
    /*
    CryptoJS v3.1.2
    code.google.com/p/crypto-js
    (c) 2009-2013 by Jeff Mott. All rights reserved.
    code.google.com/p/crypto-js/wiki/License
    */
    /**
     * Cipher core components.
     */
    CryptoJS.lib.Cipher || (function (undefined) {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;

        /**
         * Abstract base cipher template.
         *
         * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
         * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
         * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
         * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
         */
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),

            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function (key, cfg) {
                return this.create(this._ENC_XFORM_MODE, key, cfg);
            },

            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function (key, cfg) {
                return this.create(this._DEC_XFORM_MODE, key, cfg);
            },

            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function (xformMode, key, cfg) {
                // Apply config defaults
                this.cfg = this.cfg.extend(cfg);

                // Store transform mode and key
                this._xformMode = xformMode;
                this._key = key;

                // Set initial values
                this.reset();
            },

            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function () {
                // Reset data buffer
                BufferedBlockAlgorithm.reset.call(this);

                // Perform concrete-cipher logic
                this._doReset();
            },

            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function (dataUpdate) {
                // Append
                this._append(dataUpdate);

                // Process available blocks
                return this._process();
            },

            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function (dataUpdate) {
                // Final data update
                if (dataUpdate) {
                    this._append(dataUpdate);
                }

                // Perform concrete-cipher logic
                var finalProcessedData = this._doFinalize();

                return finalProcessedData;
            },

            keySize: 128 / 32,

            ivSize: 128 / 32,

            _ENC_XFORM_MODE: 1,

            _DEC_XFORM_MODE: 2,

            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: (function () {
                function selectCipherStrategy(key) {
                    if (typeof key == 'string') {
                        return PasswordBasedCipher;
                    } else {
                        return SerializableCipher;
                    }
                }

                return function (cipher) {
                    return {
                        encrypt: function (message, key, cfg) {
                            return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                        },

                        decrypt: function (ciphertext, key, cfg) {
                            return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                        }
                    };
                };
            } ())
        });

        /**
         * Abstract base stream cipher template.
         *
         * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
         */
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function () {
                // Process partial blocks
                var finalProcessedBlocks = this._process(!!'flush');

                return finalProcessedBlocks;
            },

            blockSize: 1
        });

        /**
         * Mode namespace.
         */
        var C_mode = C.mode = {};

        /**
         * Abstract base block cipher mode template.
         */
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function (cipher, iv) {
                return this.Encryptor.create(cipher, iv);
            },

            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function (cipher, iv) {
                return this.Decryptor.create(cipher, iv);
            },

            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function (cipher, iv) {
                this._cipher = cipher;
                this._iv = iv;
            }
        });

        /**
         * Cipher Block Chaining mode.
         */
        var CBC = C_mode.CBC = (function () {
            /**
             * Abstract base CBC mode.
             */
            var CBC = BlockCipherMode.extend();

            /**
             * CBC encryptor.
             */
            CBC.Encryptor = CBC.extend({
                /**
                 * Processes the data block at offset.
                 *
                 * @param {Array} words The data words to operate on.
                 * @param {number} offset The offset where the block starts.
                 *
                 * @example
                 *
                 *     mode.processBlock(data.words, offset);
                 */
                processBlock: function (words, offset) {
                    // Shortcuts
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;

                    // XOR and encrypt
                    xorBlock.call(this, words, offset, blockSize);
                    cipher.encryptBlock(words, offset);

                    // Remember this block to use with next block
                    this._prevBlock = words.slice(offset, offset + blockSize);
                }
            });

            /**
             * CBC decryptor.
             */
            CBC.Decryptor = CBC.extend({
                /**
                 * Processes the data block at offset.
                 *
                 * @param {Array} words The data words to operate on.
                 * @param {number} offset The offset where the block starts.
                 *
                 * @example
                 *
                 *     mode.processBlock(data.words, offset);
                 */
                processBlock: function (words, offset) {
                    // Shortcuts
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;

                    // Remember this block to use with next block
                    var thisBlock = words.slice(offset, offset + blockSize);

                    // Decrypt and XOR
                    cipher.decryptBlock(words, offset);
                    xorBlock.call(this, words, offset, blockSize);

                    // This block becomes the previous block
                    this._prevBlock = thisBlock;
                }
            });

            function xorBlock(words, offset, blockSize) {
                // Shortcut
                var iv = this._iv;

                // Choose mixing block
                if (iv) {
                    var block = iv;

                    // Remove IV for subsequent blocks
                    this._iv = undefined;
                } else {
                    var block = this._prevBlock;
                }

                // XOR blocks
                for (var i = 0; i < blockSize; i++) {
                    words[offset + i] ^= block[i];
                }
            }

            return CBC;
        } ());

        /**
         * Padding namespace.
         */
        var C_pad = C.pad = {};

        /**
         * PKCS #5/7 padding strategy.
         */
        var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function (data, blockSize) {
                // Shortcut
                var blockSizeBytes = blockSize * 4;

                // Count padding bytes
                var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

                // Create padding word
                var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

                // Create padding
                var paddingWords = [];
                for (var i = 0; i < nPaddingBytes; i += 4) {
                    paddingWords.push(paddingWord);
                }
                var padding = WordArray.create(paddingWords, nPaddingBytes);

                // Add padding
                data.concat(padding);
            },

            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function (data) {
                // Get number of padding bytes from last byte
                var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

                // Remove padding
                data.sigBytes -= nPaddingBytes;
            }
        };

        /**
         * Abstract base block cipher template.
         *
         * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
         */
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
                mode: CBC,
                padding: Pkcs7
            }),

            reset: function () {
                // Reset cipher
                Cipher.reset.call(this);

                // Shortcuts
                var cfg = this.cfg;
                var iv = cfg.iv;
                var mode = cfg.mode;

                // Reset block mode
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    var modeCreator = mode.createEncryptor;
                } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
                    var modeCreator = mode.createDecryptor;

                    // Keep at least one block in the buffer for unpadding
                    this._minBufferSize = 1;
                }
                this._mode = modeCreator.call(mode, this, iv && iv.words);
            },

            _doProcessBlock: function (words, offset) {
                this._mode.processBlock(words, offset);
            },

            _doFinalize: function () {
                // Shortcut
                var padding = this.cfg.padding;

                // Finalize
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    // Pad data
                    padding.pad(this._data, this.blockSize);

                    // Process final blocks
                    var finalProcessedBlocks = this._process(!!'flush');
                } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
                    // Process final blocks
                    var finalProcessedBlocks = this._process(!!'flush');

                    // Unpad data
                    padding.unpad(finalProcessedBlocks);
                }

                return finalProcessedBlocks;
            },

            blockSize: 128 / 32
        });

        /**
         * A collection of cipher parameters.
         *
         * @property {WordArray} ciphertext The raw ciphertext.
         * @property {WordArray} key The key to this ciphertext.
         * @property {WordArray} iv The IV used in the ciphering operation.
         * @property {WordArray} salt The salt used with a key derivation function.
         * @property {Cipher} algorithm The cipher algorithm.
         * @property {Mode} mode The block mode used in the ciphering operation.
         * @property {Padding} padding The padding scheme used in the ciphering operation.
         * @property {number} blockSize The block size of the cipher.
         * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
         */
        var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function (cipherParams) {
                this.mixIn(cipherParams);
            },

            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function (formatter) {
                return (formatter || this.formatter).stringify(this);
            }
        });

        /**
         * Format namespace.
         */
        var C_format = C.format = {};

        /**
         * OpenSSL formatting strategy.
         */
        var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function (cipherParams) {
                // Shortcuts
                var ciphertext = cipherParams.ciphertext;
                var salt = cipherParams.salt;

                // Format
                if (salt) {
                    var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
                } else {
                    var wordArray = ciphertext;
                }

                return wordArray.toString(Base64);
            },

            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function (openSSLStr) {
                // Parse base64
                var ciphertext = CryptoJS.enc.Base64.parse(openSSLStr);

                // Shortcut
                var ciphertextWords = ciphertext.words;

                // Test for salt
                if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
                    // Extract salt
                    var salt = WordArray.create(ciphertextWords.slice(2, 4));

                    // Remove salt from ciphertext
                    ciphertextWords.splice(0, 4);
                    ciphertext.sigBytes -= 16;
                }

                return CipherParams.create({ ciphertext: ciphertext, salt: salt });
            }
        };

        /**
         * A cipher wrapper that returns ciphertext as a serializable cipher params object.
         */
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
                format: OpenSSLFormatter
            }),

            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function (cipher, message, key, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Encrypt
                var encryptor = cipher.createEncryptor(key, cfg);
                var ciphertext = encryptor.finalize(message);

                // Shortcut
                var cipherCfg = encryptor.cfg;

                // Create and return serializable cipher params
                return CipherParams.create({
                    ciphertext: ciphertext,
                    key: key,
                    iv: cipherCfg.iv,
                    algorithm: cipher,
                    mode: cipherCfg.mode,
                    padding: cipherCfg.padding,
                    blockSize: cipher.blockSize,
                    formatter: cfg.format
                });
            },

            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function (cipher, ciphertext, key, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Convert string to CipherParams
                ciphertext = this._parse(ciphertext, cfg.format);

                // Decrypt
                var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

                return plaintext;
            },

            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function (ciphertext, format) {
                if (typeof ciphertext == 'string') {
                    return format.parse(ciphertext, this);
                } else {
                    return ciphertext;
                }
            }
        });

        /**
         * Key derivation function namespace.
         */
        var C_kdf = C.kdf = {};

        /**
         * OpenSSL key derivation function.
         */
        var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function (password, keySize, ivSize, salt) {
                // Generate random salt
                if (!salt) {
                    salt = WordArray.random(64 / 8);
                }

                // Derive key and IV
                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

                // Separate key and IV
                var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
                key.sigBytes = keySize * 4;

                // Return params
                return CipherParams.create({ key: key, iv: iv, salt: salt });
            }
        };

        /**
         * A serializable cipher wrapper that derives the key from a password,
         * and returns ciphertext as a serializable cipher params object.
         */
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
                kdf: OpenSSLKdf
            }),

            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function (cipher, message, password, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Derive key and other params
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

                // Add IV to config
                cfg.iv = derivedParams.iv;

                // Encrypt
                var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

                // Mix in derived params
                ciphertext.mixIn(derivedParams);

                return ciphertext;
            },

            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function (cipher, ciphertext, password, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Convert string to CipherParams
                ciphertext = this._parse(ciphertext, cfg.format);

                // Derive key and other params
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

                // Add IV to config
                cfg.iv = derivedParams.iv;

                // Decrypt
                var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

                return plaintext;
            }
        });
    } ());


    // Bundle: enc-base64.js
    /*
    CryptoJS v3.1.2
    code.google.com/p/crypto-js
    (c) 2009-2013 by Jeff Mott. All rights reserved.
    code.google.com/p/crypto-js/wiki/License
    */
    (function () {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;

        /**
         * Base64 encoding strategy.
         */
        var Base64 = C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var map = this._map;

                // Clamp excess bits
                wordArray.clamp();

                // Convert
                var base64Chars = [];
                for (var i = 0; i < sigBytes; i += 3) {
                    var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                    var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

                    var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

                    for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                        base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                    }
                }

                // Add padding
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    while (base64Chars.length % 4) {
                        base64Chars.push(paddingChar);
                    }
                }

                return base64Chars.join('');
            },

            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function (base64Str) {
                // Shortcuts
                var base64StrLength = base64Str.length;
                var map = this._map;

                // Ignore padding
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    var paddingIndex = base64Str.indexOf(paddingChar);
                    if (paddingIndex != -1) {
                        base64StrLength = paddingIndex;
                    }
                }

                // Convert
                var words = [];
                var nBytes = 0;
                for (var i = 0; i < base64StrLength; i++) {
                    if (i % 4) {
                        var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
                        var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
                        words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                        nBytes++;
                    }
                }

                return WordArray.create(words, nBytes);
            },

            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        };
    } ());

    // Bundle: enc-utf16
    (function () {
        var e = CryptoJS, f = e.lib.WordArray, e = e.enc; e.Utf16 = e.Utf16BE = { stringify: function (b) { var d = b.words; b = b.sigBytes; for (var c = [], a = 0; a < b; a += 2) c.push(String.fromCharCode(d[a >>> 2] >>> 16 - 8 * (a % 4) & 65535)); return c.join("") }, parse: function (b) { for (var d = b.length, c = [], a = 0; a < d; a++) c[a >>> 1] |= b.charCodeAt(a) << 16 - 16 * (a % 2); return f.create(c, 2 * d) } }; e.Utf16LE = {
            stringify: function (b) {
                var d = b.words; b = b.sigBytes; for (var c = [], a = 0; a < b; a += 2) c.push(String.fromCharCode((d[a >>> 2] >>> 16 - 8 * (a % 4) & 65535) << 8 & 4278255360 | (d[a >>>
                    2] >>> 16 - 8 * (a % 4) & 65535) >>> 8 & 16711935)); return c.join("")
            }, parse: function (b) { for (var d = b.length, c = [], a = 0; a < d; a++) { var e = c, g = a >>> 1, j = e[g], h = b.charCodeAt(a) << 16 - 16 * (a % 2); e[g] = j | h << 8 & 4278255360 | h >>> 8 & 16711935 } return f.create(c, 2 * d) }
        }
    })();

    // Bundle: format-hex.js
    (function () { var b = CryptoJS, d = b.lib.CipherParams, c = b.enc.Hex; b.format.Hex = { stringify: function (a) { return a.ciphertext.toString(c) }, parse: function (a) { a = c.parse(a); return d.create({ ciphertext: a }) } } })();

    // Bundle: aes.js
    /*
    CryptoJS v3.1.2
    code.google.com/p/crypto-js
    (c) 2009-2013 by Jeff Mott. All rights reserved.
    code.google.com/p/crypto-js/wiki/License
    */
    (function () {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;

        // Lookup tables
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];

        // Compute lookup tables
        (function () {
            // Compute double table
            var d = [];
            for (var i = 0; i < 256; i++) {
                if (i < 128) {
                    d[i] = i << 1;
                } else {
                    d[i] = (i << 1) ^ 0x11b;
                }
            }

            // Walk GF(2^8)
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
                // Compute sbox
                var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
                sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
                SBOX[x] = sx;
                INV_SBOX[sx] = x;

                // Compute multiplication
                var x2 = d[x];
                var x4 = d[x2];
                var x8 = d[x4];

                // Compute sub bytes, mix columns tables
                var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
                SUB_MIX_0[x] = (t << 24) | (t >>> 8);
                SUB_MIX_1[x] = (t << 16) | (t >>> 16);
                SUB_MIX_2[x] = (t << 8) | (t >>> 24);
                SUB_MIX_3[x] = t;

                // Compute inv sub bytes, inv mix columns tables
                var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
                INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
                INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
                INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
                INV_SUB_MIX_3[sx] = t;

                // Compute next counter
                if (!x) {
                    x = xi = 1;
                } else {
                    x = x2 ^ d[d[d[x8 ^ x2]]];
                    xi ^= d[d[xi]];
                }
            }
        } ());

        // Precomputed Rcon lookup
        var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

        /**
         * AES block cipher algorithm.
         */
        var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function () {
                // Shortcuts
                var key = this._key;
                var keyWords = key.words;
                var keySize = key.sigBytes / 4;

                // Compute number of rounds
                var nRounds = this._nRounds = keySize + 6

                // Compute number of key schedule rows
                var ksRows = (nRounds + 1) * 4;

                // Compute key schedule
                var keySchedule = this._keySchedule = [];
                for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                    if (ksRow < keySize) {
                        keySchedule[ksRow] = keyWords[ksRow];
                    } else {
                        var t = keySchedule[ksRow - 1];

                        if (!(ksRow % keySize)) {
                            // Rot word
                            t = (t << 8) | (t >>> 24);

                            // Sub word
                            t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

                            // Mix Rcon
                            t ^= RCON[(ksRow / keySize) | 0] << 24;
                        } else if (keySize > 6 && ksRow % keySize == 4) {
                            // Sub word
                            t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                        }

                        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                    }
                }

                // Compute inv key schedule
                var invKeySchedule = this._invKeySchedule = [];
                for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                    var ksRow = ksRows - invKsRow;

                    if (invKsRow % 4) {
                        var t = keySchedule[ksRow];
                    } else {
                        var t = keySchedule[ksRow - 4];
                    }

                    if (invKsRow < 4 || ksRow <= 4) {
                        invKeySchedule[invKsRow] = t;
                    } else {
                        invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                            INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
                    }
                }
            },

            encryptBlock: function (M, offset) {
                this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },

            decryptBlock: function (M, offset) {
                // Swap 2nd and 4th rows
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3];
                M[offset + 3] = t;

                this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

                // Inv swap 2nd and 4th rows
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3];
                M[offset + 3] = t;
            },

            _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
                // Shortcut
                var nRounds = this._nRounds;

                // Get input, add round key
                var s0 = M[offset] ^ keySchedule[0];
                var s1 = M[offset + 1] ^ keySchedule[1];
                var s2 = M[offset + 2] ^ keySchedule[2];
                var s3 = M[offset + 3] ^ keySchedule[3];

                // Key schedule row counter
                var ksRow = 4;

                // Rounds
                for (var round = 1; round < nRounds; round++) {
                    // Shift rows, sub bytes, mix columns, add round key
                    var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
                    var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
                    var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
                    var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

                    // Update state
                    s0 = t0;
                    s1 = t1;
                    s2 = t2;
                    s3 = t3;
                }

                // Shift rows, sub bytes, add round key
                var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
                var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
                var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
                var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

                // Set output
                M[offset] = t0;
                M[offset + 1] = t1;
                M[offset + 2] = t2;
                M[offset + 3] = t3;
            },

            keySize: 256 / 32
        });

        /**
         * Shortcut functions to the cipher's object interface.
         *
         * @example
         *
         *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
         *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
         */
        C.AES = BlockCipher._createHelper(AES);
    } ());

    // Bundle: mode-ctr.js
    CryptoJS.mode.CTR = function () { var b = CryptoJS.lib.BlockCipherMode.extend(), g = b.Encryptor = b.extend({ processBlock: function (b, f) { var a = this._cipher, e = a.blockSize, c = this._iv, d = this._counter; c && (d = this._counter = c.slice(0), this._iv = void 0); c = d.slice(0); a.encryptBlock(c, 0); d[e - 1] = d[e - 1] + 1 | 0; for (a = 0; a < e; a++) b[f + a] ^= c[a] } }); b.Decryptor = g; return b } ();

    // Bundle: no-padding.js
    CryptoJS.pad.NoPadding = { pad: function () { }, unpad: function () { } };

    // Bundle BigInt.js
    ////////////////////////////////////////////////////////////////////////////////////////
    // Big Integer Library v. 5.5
    // Created 2000, last modified 2013
    // Leemon Baird
    // www.leemon.com
    //
    // Version history:
    // v 5.5  17 Mar 2013
    //   - two lines of a form like "if (x<0) x+=n" had the "if" changed to "while" to 
    //     handle the case when x<-n. (Thanks to James Ansell for finding that bug)
    // v 5.4  3 Oct 2009
    //   - added "var i" to greaterShift() so i is not global. (Thanks to PŽter Szab— for finding that bug)
    //
    // v 5.3  21 Sep 2009
    //   - added randProbPrime(k) for probable primes
    //   - unrolled loop in mont_ (slightly faster)
    //   - millerRabin now takes a bigInt parameter rather than an int
    //
    // v 5.2  15 Sep 2009
    //   - fixed capitalization in call to int2bigInt in randBigInt
    //     (thanks to Emili Evripidou, Reinhold Behringer, and Samuel Macaleese for finding that bug)
    //
    // v 5.1  8 Oct 2007 
    //   - renamed inverseModInt_ to inverseModInt since it doesn't change its parameters
    //   - added functions GCD and randBigInt, which call GCD_ and randBigInt_
    //   - fixed a bug found by Rob Visser (see comment with his name below)
    //   - improved comments
    //
    // This file is public domain.   You can use it for any purpose without restriction.
    // I do not guarantee that it is correct, so use it at your own risk.  If you use 
    // it for something interesting, I'd appreciate hearing about it.  If you find 
    // any bugs or make any improvements, I'd appreciate hearing about those too.
    // It would also be nice if my name and URL were left in the comments.  But none 
    // of that is required.
    //
    // This code defines a bigInt library for arbitrary-precision integers.
    // A bigInt is an array of integers storing the value in chunks of bpe bits, 
    // little endian (buff[0] is the least significant word).
    // Negative bigInts are stored two's complement.  Almost all the functions treat
    // bigInts as nonnegative.  The few that view them as two's complement say so
    // in their comments.  Some functions assume their parameters have at least one 
    // leading zero element. Functions with an underscore at the end of the name put
    // their answer into one of the arrays passed in, and have unpredictable behavior 
    // in case of overflow, so the caller must make sure the arrays are big enough to 
    // hold the answer.  But the average user should never have to call any of the 
    // underscored functions.  Each important underscored function has a wrapper function 
    // of the same name without the underscore that takes care of the details for you.  
    // For each underscored function where a parameter is modified, that same variable 
    // must not be used as another argument too.  So, you cannot square x by doing 
    // multMod_(x,x,n).  You must use squareMod_(x,n) instead, or do y=dup(x); multMod_(x,y,n).
    // Or simply use the multMod(x,x,n) function without the underscore, where
    // such issues never arise, because non-underscored functions never change
    // their parameters; they always allocate new memory for the answer that is returned.
    //
    // These functions are designed to avoid frequent dynamic memory allocation in the inner loop.
    // For most functions, if it needs a BigInt as a local variable it will actually use
    // a global, and will only allocate to it only when it's not the right size.  This ensures
    // that when a function is called repeatedly with same-sized parameters, it only allocates
    // memory on the first call.
    //
    // Note that for cryptographic purposes, the calls to Math.random() must 
    // be replaced with calls to a better pseudorandom number generator.
    //
    // In the following, "bigInt" means a bigInt with at least one leading zero element,
    // and "integer" means a nonnegative integer less than radix.  In some cases, integer 
    // can be negative.  Negative bigInts are 2s complement.
    // 
    // The following functions do not modify their inputs.
    // Those returning a bigInt, string, or Array will dynamically allocate memory for that value.
    // Those returning a boolean will return the integer 0 (false) or 1 (true).
    // Those returning boolean or int will not allocate memory except possibly on the first 
    // time they're called with a given parameter size.
    // 
    // bigInt  add(x,y)               //return (x+y) for bigInts x and y.  
    // bigInt  addInt(x,n)            //return (x+n) where x is a bigInt and n is an integer.
    // string  bigInt2str(x,base)     //return a string form of bigInt x in a given base, with 2 <= base <= 95
    // int     bitSize(x)             //return how many bits long the bigInt x is, not counting leading zeros
    // bigInt  dup(x)                 //return a copy of bigInt x
    // boolean equals(x,y)            //is the bigInt x equal to the bigint y?
    // boolean equalsInt(x,y)         //is bigint x equal to integer y?
    // bigInt  expand(x,n)            //return a copy of x with at least n elements, adding leading zeros if needed
    // Array   findPrimes(n)          //return array of all primes less than integer n
    // bigInt  GCD(x,y)               //return greatest common divisor of bigInts x and y (each with same number of elements).
    // boolean greater(x,y)           //is x>y?  (x and y are nonnegative bigInts)
    // boolean greaterShift(x,y,shift)//is (x <<(shift*bpe)) > y?
    // bigInt  int2bigInt(t,n,m)      //return a bigInt equal to integer t, with at least n bits and m array elements
    // bigInt  inverseMod(x,n)        //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
    // int     inverseModInt(x,n)     //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
    // boolean isZero(x)              //is the bigInt x equal to zero?
    // boolean millerRabin(x,b)       //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is bigInt, 1<b<x)
    // boolean millerRabinInt(x,b)    //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is int,    1<b<x)
    // bigInt  mod(x,n)               //return a new bigInt equal to (x mod n) for bigInts x and n.
    // int     modInt(x,n)            //return x mod n for bigInt x and integer n.
    // bigInt  mult(x,y)              //return x*y for bigInts x and y. This is faster when y<x.
    // bigInt  multMod(x,y,n)         //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
    // boolean negative(x)            //is bigInt x negative?
    // bigInt  powMod(x,y,n)          //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
    // bigInt  randBigInt(n,s)        //return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
    // bigInt  randTruePrime(k)       //return a new, random, k-bit, true prime bigInt using Maurer's algorithm.
    // bigInt  randProbPrime(k)       //return a new, random, k-bit, probable prime bigInt (probability it's composite less than 2^-80).
    // bigInt  str2bigInt(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements
    // bigInt  sub(x,y)               //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
    // bigInt  trim(x,k)              //return a copy of x with exactly k leading zero elements
    //
    //
    // The following functions each have a non-underscored version, which most users should call instead.
    // These functions each write to a single parameter, and the caller is responsible for ensuring the array 
    // passed in is large enough to hold the result. 
    //
    // void    addInt_(x,n)          //do x=x+n where x is a bigInt and n is an integer
    // void    add_(x,y)             //do x=x+y for bigInts x and y
    // void    copy_(x,y)            //do x=y on bigInts x and y
    // void    copyInt_(x,n)         //do x=n on bigInt x and integer n
    // void    GCD_(x,y)             //set x to the greatest common divisor of bigInts x and y, (y is destroyed).  (This never overflows its array).
    // boolean inverseMod_(x,n)      //do x=x**(-1) mod n, for bigInts x and n. Returns 1 (0) if inverse does (doesn't) exist
    // void    mod_(x,n)             //do x=x mod n for bigInts x and n. (This never overflows its array).
    // void    mult_(x,y)            //do x=x*y for bigInts x and y.
    // void    multMod_(x,y,n)       //do x=x*y  mod n for bigInts x,y,n.
    // void    powMod_(x,y,n)        //do x=x**y mod n, where x,y,n are bigInts (n is odd) and ** is exponentiation.  0**0=1.
    // void    randBigInt_(b,n,s)    //do b = an n-bit random BigInt. if s=1, then nth bit (most significant bit) is set to 1. n>=1.
    // void    randTruePrime_(ans,k) //do ans = a random k-bit true random prime (not just probable prime) with 1 in the msb.
    // void    sub_(x,y)             //do x=x-y for bigInts x and y. Negative answers will be 2s complement.
    //
    // The following functions do NOT have a non-underscored version. 
    // They each write a bigInt result to one or more parameters.  The caller is responsible for
    // ensuring the arrays passed in are large enough to hold the results. 
    //
    // void addShift_(x,y,ys)       //do x=x+(y<<(ys*bpe))
    // void carry_(x)               //do carries and borrows so each element of the bigInt x fits in bpe bits.
    // void divide_(x,y,q,r)        //divide x by y giving quotient q and remainder r
    // int  divInt_(x,n)            //do x=floor(x/n) for bigInt x and integer n, and return the remainder. (This never overflows its array).
    // int  eGCD_(x,y,d,a,b)        //sets a,b,d to positive bigInts such that d = GCD_(x,y) = a*x-b*y
    // void halve_(x)               //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement.  (This never overflows its array).
    // void leftShift_(x,n)         //left shift bigInt x by n bits.  n<bpe.
    // void linComb_(x,y,a,b)       //do x=a*x+b*y for bigInts x and y and integers a and b
    // void linCombShift_(x,y,b,ys) //do x=x+b*(y<<(ys*bpe)) for bigInts x and y, and integers b and ys
    // void mont_(x,y,n,np)         //Montgomery multiplication (see comments where the function is defined)
    // void multInt_(x,n)           //do x=x*n where x is a bigInt and n is an integer.
    // void rightShift_(x,n)        //right shift bigInt x by n bits.  0 <= n < bpe. (This never overflows its array).
    // void squareMod_(x,n)         //do x=x*x  mod n for bigInts x,n
    // void subShift_(x,y,ys)       //do x=x-(y<<(ys*bpe)). Negative answers will be 2s complement.
    //
    // The following functions are based on algorithms from the _Handbook of Applied Cryptography_
    //    powMod_()           = algorithm 14.94, Montgomery exponentiation
    //    eGCD_,inverseMod_() = algorithm 14.61, Binary extended GCD_
    //    GCD_()              = algorothm 14.57, Lehmer's algorithm
    //    mont_()             = algorithm 14.36, Montgomery multiplication
    //    divide_()           = algorithm 14.20  Multiple-precision division
    //    squareMod_()        = algorithm 14.16  Multiple-precision squaring
    //    randTruePrime_()    = algorithm  4.62, Maurer's algorithm
    //    millerRabin()       = algorithm  4.24, Miller-Rabin algorithm
    //
    // Profiling shows:
    //     randTruePrime_() spends:
    //         10% of its time in calls to powMod_()
    //         85% of its time in calls to millerRabin()
    //     millerRabin() spends:
    //         99% of its time in calls to powMod_()   (always with a base of 2)
    //     powMod_() spends:
    //         94% of its time in calls to mont_()  (almost always with x==y)
    //
    // This suggests there are several ways to speed up this library slightly:
    //     - convert powMod_ to use a Montgomery form of k-ary window (or maybe a Montgomery form of sliding window)
    //         -- this should especially focus on being fast when raising 2 to a power mod n
    //     - convert randTruePrime_() to use a minimum r of 1/3 instead of 1/2 with the appropriate change to the test
    //     - tune the parameters in randTruePrime_(), including c, m, and recLimit
    //     - speed up the single loop in mont_() that takes 95% of the runtime, perhaps by reducing checking
    //       within the loop when all the parameters are the same length.
    //
    // There are several ideas that look like they wouldn't help much at all:
    //     - replacing trial division in randTruePrime_() with a sieve (that speeds up something taking almost no time anyway)
    //     - increase bpe from 15 to 30 (that would help if we had a 32*32->64 multiplier, but not with JavaScript's 32*32->32)
    //     - speeding up mont_(x,y,n,np) when x==y by doing a non-modular, non-Montgomery square
    //       followed by a Montgomery reduction.  The intermediate answer will be twice as long as x, so that
    //       method would be slower.  This is unfortunate because the code currently spends almost all of its time
    //       doing mont_(x,x,...), both for randTruePrime_() and powMod_().  A faster method for Montgomery squaring
    //       would have a large impact on the speed of randTruePrime_() and powMod_().  HAC has a couple of poorly-worded
    //       sentences that seem to imply it's faster to do a non-modular square followed by a single
    //       Montgomery reduction, but that's obviously wrong.
    ////////////////////////////////////////////////////////////////////////////////////////

    //globals
    bpe = 0;         //bits stored per array element
    mask = 0;        //AND this with an array element to chop it down to bpe bits
    radix = mask + 1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

    //the digits for converting to different bases
    digitsStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

    //initialize the global variables
    for (bpe = 0; (1 << (bpe + 1)) > (1 << bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
    bpe >>= 1;                   //bpe=number of bits in one element of the array representing the bigInt
    mask = (1 << bpe) - 1;           //AND the mask with an integer to get its bpe least significant bits
    radix = mask + 1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
    one = int2bigInt(1, 1, 1);     //constant used in powMod_()

    //the following global variables are scratchpad memory to 
    //reduce dynamic memory allocation in the inner loop
    t = new Array(0);
    ss = t;       //used in mult_()
    s0 = t;       //used in multMod_(), squareMod_() 
    s1 = t;       //used in powMod_(), multMod_(), squareMod_() 
    s2 = t;       //used in powMod_(), multMod_()
    s3 = t;       //used in powMod_()
    s4 = t; s5 = t; //used in mod_()
    s6 = t;       //used in bigInt2str()
    s7 = t;       //used in powMod_()
    T = t;        //used in GCD_()
    sa = t;       //used in mont_()
    mr_x1 = t; mr_r = t; mr_a = t;                                      //used in millerRabin()
    eg_v = t; eg_u = t; eg_A = t; eg_B = t; eg_C = t; eg_D = t;               //used in eGCD_(), inverseMod_()
    md_q1 = t; md_q2 = t; md_q3 = t; md_r = t; md_r1 = t; md_r2 = t; md_tt = t; //used in mod_()

    primes = t; pows = t; s_i = t; s_i2 = t; s_R = t; s_rm = t; s_q = t; s_n1 = t;
    s_a = t; s_r2 = t; s_n = t; s_b = t; s_d = t; s_x1 = t; s_x2 = t, s_aa = t; //used in randTruePrime_()

    rpprb = t; //used in randProbPrimeRounds() (which also uses "primes")

    ////////////////////////////////////////////////////////////////////////////////////////


    //return array of all primes less than integer n
    function findPrimes(n) {
        var i, s, p, ans;
        s = new Array(n);
        for (i = 0; i < n; i++)
            s[i] = 0;
        s[0] = 2;
        p = 0;    //first p elements of s are primes, the rest are a sieve
        for (; s[p] < n;) {                  //s[p] is the pth prime
            for (i = s[p] * s[p]; i < n; i += s[p]) //mark multiples of s[p]
                s[i] = 1;
            p++;
            s[p] = s[p - 1] + 1;
            for (; s[p] < n && s[s[p]]; s[p]++); //find next prime (where s[p]==0)
        }
        ans = new Array(p);
        for (i = 0; i < p; i++)
            ans[i] = s[i];
        return ans;
    }


    //does a single round of Miller-Rabin base b consider x to be a possible prime?
    //x is a bigInt, and b is an integer, with b<x
    function millerRabinInt(x, b) {
        if (mr_x1.length != x.length) {
            mr_x1 = dup(x);
            mr_r = dup(x);
            mr_a = dup(x);
        }

        copyInt_(mr_a, b);
        return millerRabin(x, mr_a);
    }

    //does a single round of Miller-Rabin base b consider x to be a possible prime?
    //x and b are bigInts with b<x
    function millerRabin(x, b) {
        var i, j, k, s;

        if (mr_x1.length != x.length) {
            mr_x1 = dup(x);
            mr_r = dup(x);
            mr_a = dup(x);
        }

        copy_(mr_a, b);
        copy_(mr_r, x);
        copy_(mr_x1, x);

        addInt_(mr_r, -1);
        addInt_(mr_x1, -1);

        //s=the highest power of two that divides mr_r
        k = 0;
        for (i = 0; i < mr_r.length; i++)
            for (j = 1; j < mask; j <<= 1)
                if (x[i] & j) {
                    s = (k < mr_r.length + bpe ? k : 0);
                    i = mr_r.length;
                    j = mask;
                } else
                    k++;

        if (s)
            rightShift_(mr_r, s);

        powMod_(mr_a, mr_r, x);

        if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
            j = 1;
            while (j <= s - 1 && !equals(mr_a, mr_x1)) {
                squareMod_(mr_a, x);
                if (equalsInt(mr_a, 1)) {
                    return 0;
                }
                j++;
            }
            if (!equals(mr_a, mr_x1)) {
                return 0;
            }
        }
        return 1;
    }

    //returns how many bits long the bigInt is, not counting leading zeros.
    function bitSize(x) {
        var j, z, w;
        for (j = x.length - 1; (x[j] == 0) && (j > 0); j--);
        for (z = 0, w = x[j]; w; (w >>= 1), z++);
        z += bpe * j;
        return z;
    }

    //return a copy of x with at least n elements, adding leading zeros if needed
    function expand(x, n) {
        var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);
        copy_(ans, x);
        return ans;
    }

    //return a k-bit true random prime using Maurer's algorithm.
    function randTruePrime(k) {
        var ans = int2bigInt(0, k, 0);
        randTruePrime_(ans, k);
        return trim(ans, 1);
    }

    //return a k-bit random probable prime with probability of error < 2^-80
    function randProbPrime(k) {
        if (k >= 600) return randProbPrimeRounds(k, 2); //numbers from HAC table 4.3
        if (k >= 550) return randProbPrimeRounds(k, 4);
        if (k >= 500) return randProbPrimeRounds(k, 5);
        if (k >= 400) return randProbPrimeRounds(k, 6);
        if (k >= 350) return randProbPrimeRounds(k, 7);
        if (k >= 300) return randProbPrimeRounds(k, 9);
        if (k >= 250) return randProbPrimeRounds(k, 12); //numbers from HAC table 4.4
        if (k >= 200) return randProbPrimeRounds(k, 15);
        if (k >= 150) return randProbPrimeRounds(k, 18);
        if (k >= 100) return randProbPrimeRounds(k, 27);
        return randProbPrimeRounds(k, 40); //number from HAC remark 4.26 (only an estimate)
    }

    //return a k-bit probable random prime using n rounds of Miller Rabin (after trial division with small primes)	
    function randProbPrimeRounds(k, n) {
        var ans, i, divisible, B;
        B = 30000;  //B is largest prime to use in trial division
        ans = int2bigInt(0, k, 0);

        //optimization: try larger and smaller B to find the best limit.

        if (primes.length == 0)
            primes = findPrimes(30000);  //check for divisibility by primes <=30000

        if (rpprb.length != ans.length)
            rpprb = dup(ans);

        for (; ;) { //keep trying random values for ans until one appears to be prime
            //optimization: pick a random number times L=2*3*5*...*p, plus a 
            //   random element of the list of all numbers in [0,L) not divisible by any prime up to p.
            //   This can reduce the amount of random number generation.

            randBigInt_(ans, k, 0); //ans = a random odd number to check
            ans[0] |= 1;
            divisible = 0;

            //check ans for divisibility by small primes up to B
            for (i = 0; (i < primes.length) && (primes[i] <= B); i++)
                if (modInt(ans, primes[i]) == 0 && !equalsInt(ans, primes[i])) {
                    divisible = 1;
                    break;
                }

            //optimization: change millerRabin so the base can be bigger than the number being checked, then eliminate the while here.

            //do n rounds of Miller Rabin, with random bases less than ans
            for (i = 0; i < n && !divisible; i++) {
                randBigInt_(rpprb, k, 0);
                while (!greater(ans, rpprb)) //pick a random rpprb that's < ans
                    randBigInt_(rpprb, k, 0);
                if (!millerRabin(ans, rpprb))
                    divisible = 1;
            }

            if (!divisible)
                return ans;
        }
    }

    //return a new bigInt equal to (x mod n) for bigInts x and n.
    function mod(x, n) {
        var ans = dup(x);
        mod_(ans, n);
        return trim(ans, 1);
    }

    //return (x+n) where x is a bigInt and n is an integer.
    function addInt(x, n) {
        var ans = expand(x, x.length + 1);
        addInt_(ans, n);
        return trim(ans, 1);
    }

    //return x*y for bigInts x and y. This is faster when y<x.
    function mult(x, y) {
        var ans = expand(x, x.length + y.length);
        mult_(ans, y);
        return trim(ans, 1);
    }

    //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
    function powMod(x, y, n) {
        var ans = expand(x, n.length);
        powMod_(ans, trim(y, 2), trim(n, 2), 0);  //this should work without the trim, but doesn't
        return trim(ans, 1);
    }

    //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
    function sub(x, y) {
        var ans = expand(x, (x.length > y.length ? x.length + 1 : y.length + 1));
        sub_(ans, y);
        return trim(ans, 1);
    }

    //return (x+y) for bigInts x and y.  
    function add(x, y) {
        var ans = expand(x, (x.length > y.length ? x.length + 1 : y.length + 1));
        add_(ans, y);
        return trim(ans, 1);
    }

    //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
    function inverseMod(x, n) {
        var ans = expand(x, n.length);
        var s;
        s = inverseMod_(ans, n);
        return s ? trim(ans, 1) : null;
    }

    //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
    function multMod(x, y, n) {
        var ans = expand(x, n.length);
        multMod_(ans, y, n);
        return trim(ans, 1);
    }

    //generate a k-bit true random prime using Maurer's algorithm,
    //and put it into ans.  The bigInt ans must be large enough to hold it.
    function randTruePrime_(ans, k) {
        var c, m, pm, dd, j, r, B, divisible, z, zz, recSize;

        if (primes.length == 0)
            primes = findPrimes(30000);  //check for divisibility by primes <=30000

        if (pows.length == 0) {
            pows = new Array(512);
            for (j = 0; j < 512; j++) {
                pows[j] = Math.pow(2, j / 511. - 1.);
            }
        }

        //c and m should be tuned for a particular machine and value of k, to maximize speed
        c = 0.1;  //c=0.1 in HAC
        m = 20;   //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
        recLimit = 20; //stop recursion when k <=recLimit.  Must have recLimit >= 2

        if (s_i2.length != ans.length) {
            s_i2 = dup(ans);
            s_R = dup(ans);
            s_n1 = dup(ans);
            s_r2 = dup(ans);
            s_d = dup(ans);
            s_x1 = dup(ans);
            s_x2 = dup(ans);
            s_b = dup(ans);
            s_n = dup(ans);
            s_i = dup(ans);
            s_rm = dup(ans);
            s_q = dup(ans);
            s_a = dup(ans);
            s_aa = dup(ans);
        }

        if (k <= recLimit) {  //generate small random primes by trial division up to its square root
            pm = (1 << ((k + 2) >> 1)) - 1; //pm is binary number with all ones, just over sqrt(2^k)
            copyInt_(ans, 0);
            for (dd = 1; dd;) {
                dd = 0;
                ans[0] = 1 | (1 << (k - 1)) | Math.floor(Math.random() * (1 << k));  //random, k-bit, odd integer, with msb 1
                for (j = 1; (j < primes.length) && ((primes[j] & pm) == primes[j]); j++) { //trial division by all primes 3...sqrt(2^k)
                    if (0 == (ans[0] % primes[j])) {
                        dd = 1;
                        break;
                    }
                }
            }
            carry_(ans);
            return;
        }

        B = c * k * k;    //try small primes up to B (or all the primes[] array if the largest is less than B).
        if (k > 2 * m)  //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
            for (r = 1; k - k * r <= m;)
                r = pows[Math.floor(Math.random() * 512)];   //r=Math.pow(2,Math.random()-1);
        else
            r = .5;

        //simulation suggests the more complex algorithm using r=.333 is only slightly faster.

        recSize = Math.floor(r * k) + 1;

        randTruePrime_(s_q, recSize);
        copyInt_(s_i2, 0);
        s_i2[Math.floor((k - 2) / bpe)] |= (1 << ((k - 2) % bpe));   //s_i2=2^(k-2)
        divide_(s_i2, s_q, s_i, s_rm);                        //s_i=floor((2^(k-1))/(2q))

        z = bitSize(s_i);

        for (; ;) {
            for (; ;) {  //generate z-bit numbers until one falls in the range [0,s_i-1]
                randBigInt_(s_R, z, 0);
                if (greater(s_i, s_R))
                    break;
            }                //now s_R is in the range [0,s_i-1]
            addInt_(s_R, 1);  //now s_R is in the range [1,s_i]
            add_(s_R, s_i);   //now s_R is in the range [s_i+1,2*s_i]

            copy_(s_n, s_q);
            mult_(s_n, s_R);
            multInt_(s_n, 2);
            addInt_(s_n, 1);    //s_n=2*s_R*s_q+1

            copy_(s_r2, s_R);
            multInt_(s_r2, 2);  //s_r2=2*s_R

            //check s_n for divisibility by small primes up to B
            for (divisible = 0, j = 0; (j < primes.length) && (primes[j] < B); j++)
                if (modInt(s_n, primes[j]) == 0 && !equalsInt(s_n, primes[j])) {
                    divisible = 1;
                    break;
                }

            if (!divisible)    //if it passes small primes check, then try a single Miller-Rabin base 2
                if (!millerRabinInt(s_n, 2)) //this line represents 75% of the total runtime for randTruePrime_ 
                    divisible = 1;

            if (!divisible) {  //if it passes that test, continue checking s_n
                addInt_(s_n, -3);
                for (j = s_n.length - 1; (s_n[j] == 0) && (j > 0); j--);  //strip leading zeros
                for (zz = 0, w = s_n[j]; w; (w >>= 1), zz++);
                zz += bpe * j;                             //zz=number of bits in s_n, ignoring leading zeros
                for (; ;) {  //generate z-bit numbers until one falls in the range [0,s_n-1]
                    randBigInt_(s_a, zz, 0);
                    if (greater(s_n, s_a))
                        break;
                }                //now s_a is in the range [0,s_n-1]
                addInt_(s_n, 3);  //now s_a is in the range [0,s_n-4]
                addInt_(s_a, 2);  //now s_a is in the range [2,s_n-2]
                copy_(s_b, s_a);
                copy_(s_n1, s_n);
                addInt_(s_n1, -1);
                powMod_(s_b, s_n1, s_n);   //s_b=s_a^(s_n-1) modulo s_n
                addInt_(s_b, -1);
                if (isZero(s_b)) {
                    copy_(s_b, s_a);
                    powMod_(s_b, s_r2, s_n);
                    addInt_(s_b, -1);
                    copy_(s_aa, s_n);
                    copy_(s_d, s_b);
                    GCD_(s_d, s_n);  //if s_b and s_n are relatively prime, then s_n is a prime
                    if (equalsInt(s_d, 1)) {
                        copy_(ans, s_aa);
                        return;     //if we've made it this far, then s_n is absolutely guaranteed to be prime
                    }
                }
            }
        }
    }

    //Return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
    function randBigInt(n, s) {
        var a, b;
        a = Math.floor((n - 1) / bpe) + 2; //# array elements to hold the BigInt with a leading 0 element
        b = int2bigInt(0, 0, a);
        randBigInt_(b, n, s);
        return b;
    }

    //Set b to an n-bit random BigInt.  If s=1, then the most significant of those n bits is set to 1.
    //Array b must be big enough to hold the result. Must have n>=1
    function randBigInt_(b, n, s) {
        var i, a;
        for (i = 0; i < b.length; i++)
            b[i] = 0;
        a = Math.floor((n - 1) / bpe) + 1; //# array elements to hold the BigInt
        for (i = 0; i < a; i++) {
            b[i] = Math.floor(Math.random() * (1 << (bpe - 1)));
        }
        b[a - 1] &= (2 << ((n - 1) % bpe)) - 1;
        if (s == 1)
            b[a - 1] |= (1 << ((n - 1) % bpe));
    }

    //Return the greatest common divisor of bigInts x and y (each with same number of elements).
    function GCD(x, y) {
        var xc, yc;
        xc = dup(x);
        yc = dup(y);
        GCD_(xc, yc);
        return xc;
    }

    //set x to the greatest common divisor of bigInts x and y (each with same number of elements).
    //y is destroyed.
    function GCD_(x, y) {
        var i, xp, yp, A, B, C, D, q, sing;
        if (T.length != x.length)
            T = dup(x);

        sing = 1;
        while (sing) { //while y has nonzero elements other than y[0]
            sing = 0;
            for (i = 1; i < y.length; i++) //check if y has nonzero elements other than 0
                if (y[i]) {
                    sing = 1;
                    break;
                }
            if (!sing) break; //quit when y all zero elements except possibly y[0]

            for (i = x.length; !x[i] && i >= 0; i--);  //find most significant element of x
            xp = x[i];
            yp = y[i];
            A = 1; B = 0; C = 0; D = 1;
            while ((yp + C) && (yp + D)) {
                q = Math.floor((xp + A) / (yp + C));
                qp = Math.floor((xp + B) / (yp + D));
                if (q != qp)
                    break;
                t = A - q * C; A = C; C = t;    //  do (A,B,xp, C,D,yp) = (C,D,yp, A,B,xp) - q*(0,0,0, C,D,yp)      
                t = B - q * D; B = D; D = t;
                t = xp - q * yp; xp = yp; yp = t;
            }
            if (B) {
                copy_(T, x);
                linComb_(x, y, A, B); //x=A*x+B*y
                linComb_(y, T, D, C); //y=D*y+C*T
            } else {
                mod_(x, y);
                copy_(T, x);
                copy_(x, y);
                copy_(y, T);
            }
        }
        if (y[0] == 0)
            return;
        t = modInt(x, y[0]);
        copyInt_(x, y[0]);
        y[0] = t;
        while (y[0]) {
            x[0] %= y[0];
            t = x[0]; x[0] = y[0]; y[0] = t;
        }
    }

    //do x=x**(-1) mod n, for bigInts x and n.
    //If no inverse exists, it sets x to zero and returns 0, else it returns 1.
    //The x array must be at least as large as the n array.
    function inverseMod_(x, n) {
        var k = 1 + 2 * Math.max(x.length, n.length);

        if (!(x[0] & 1) && !(n[0] & 1)) {  //if both inputs are even, then inverse doesn't exist
            copyInt_(x, 0);
            return 0;
        }

        if (eg_u.length != k) {
            eg_u = new Array(k);
            eg_v = new Array(k);
            eg_A = new Array(k);
            eg_B = new Array(k);
            eg_C = new Array(k);
            eg_D = new Array(k);
        }

        copy_(eg_u, x);
        copy_(eg_v, n);
        copyInt_(eg_A, 1);
        copyInt_(eg_B, 0);
        copyInt_(eg_C, 0);
        copyInt_(eg_D, 1);
        for (; ;) {
            while (!(eg_u[0] & 1)) {  //while eg_u is even
                halve_(eg_u);
                if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) { //if eg_A==eg_B==0 mod 2
                    halve_(eg_A);
                    halve_(eg_B);
                } else {
                    add_(eg_A, n); halve_(eg_A);
                    sub_(eg_B, x); halve_(eg_B);
                }
            }

            while (!(eg_v[0] & 1)) {  //while eg_v is even
                halve_(eg_v);
                if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) { //if eg_C==eg_D==0 mod 2
                    halve_(eg_C);
                    halve_(eg_D);
                } else {
                    add_(eg_C, n); halve_(eg_C);
                    sub_(eg_D, x); halve_(eg_D);
                }
            }

            if (!greater(eg_v, eg_u)) { //eg_v <= eg_u
                sub_(eg_u, eg_v);
                sub_(eg_A, eg_C);
                sub_(eg_B, eg_D);
            } else {                   //eg_v > eg_u
                sub_(eg_v, eg_u);
                sub_(eg_C, eg_A);
                sub_(eg_D, eg_B);
            }

            if (equalsInt(eg_u, 0)) {
                while (negative(eg_C)) //make sure answer is nonnegative
                    add_(eg_C, n);
                copy_(x, eg_C);

                if (!equalsInt(eg_v, 1)) { //if GCD_(x,n)!=1, then there is no inverse
                    copyInt_(x, 0);
                    return 0;
                }
                return 1;
            }
        }
    }

    //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
    function inverseModInt(x, n) {
        var a = 1, b = 0, t;
        for (; ;) {
            if (x == 1) return a;
            if (x == 0) return 0;
            b -= a * Math.floor(n / x);
            n %= x;

            if (n == 1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
            if (n == 0) return 0;
            a -= b * Math.floor(x / n);
            x %= n;
        }
    }

    //this deprecated function is for backward compatibility only. 
    function inverseModInt_(x, n) {
        return inverseModInt(x, n);
    }


    //Given positive bigInts x and y, change the bigints v, a, and b to positive bigInts such that:
    //     v = GCD_(x,y) = a*x-b*y
    //The bigInts v, a, b, must have exactly as many elements as the larger of x and y.
    function eGCD_(x, y, v, a, b) {
        var g = 0;
        var k = Math.max(x.length, y.length);
        if (eg_u.length != k) {
            eg_u = new Array(k);
            eg_A = new Array(k);
            eg_B = new Array(k);
            eg_C = new Array(k);
            eg_D = new Array(k);
        }
        while (!(x[0] & 1) && !(y[0] & 1)) {  //while x and y both even
            halve_(x);
            halve_(y);
            g++;
        }
        copy_(eg_u, x);
        copy_(v, y);
        copyInt_(eg_A, 1);
        copyInt_(eg_B, 0);
        copyInt_(eg_C, 0);
        copyInt_(eg_D, 1);
        for (; ;) {
            while (!(eg_u[0] & 1)) {  //while u is even
                halve_(eg_u);
                if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) { //if A==B==0 mod 2
                    halve_(eg_A);
                    halve_(eg_B);
                } else {
                    add_(eg_A, y); halve_(eg_A);
                    sub_(eg_B, x); halve_(eg_B);
                }
            }

            while (!(v[0] & 1)) {  //while v is even
                halve_(v);
                if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) { //if C==D==0 mod 2
                    halve_(eg_C);
                    halve_(eg_D);
                } else {
                    add_(eg_C, y); halve_(eg_C);
                    sub_(eg_D, x); halve_(eg_D);
                }
            }

            if (!greater(v, eg_u)) { //v<=u
                sub_(eg_u, v);
                sub_(eg_A, eg_C);
                sub_(eg_B, eg_D);
            } else {                //v>u
                sub_(v, eg_u);
                sub_(eg_C, eg_A);
                sub_(eg_D, eg_B);
            }
            if (equalsInt(eg_u, 0)) {
                while (negative(eg_C)) {   //make sure a (C) is nonnegative
                    add_(eg_C, y);
                    sub_(eg_D, x);
                }
                multInt_(eg_D, -1);  ///make sure b (D) is nonnegative
                copy_(a, eg_C);
                copy_(b, eg_D);
                leftShift_(v, g);
                return;
            }
        }
    }


    //is bigInt x negative?
    function negative(x) {
        return ((x[x.length - 1] >> (bpe - 1)) & 1);
    }


    //is (x << (shift*bpe)) > y?
    //x and y are nonnegative bigInts
    //shift is a nonnegative integer
    function greaterShift(x, y, shift) {
        var i, kx = x.length, ky = y.length;
        k = ((kx + shift) < ky) ? (kx + shift) : ky;
        for (i = ky - 1 - shift; i < kx && i >= 0; i++)
            if (x[i] > 0)
                return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
        for (i = kx - 1 + shift; i < ky; i++)
            if (y[i] > 0)
                return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
        for (i = k - 1; i >= shift; i--)
            if (x[i - shift] > y[i]) return 1;
            else if (x[i - shift] < y[i]) return 0;
        return 0;
    }

    //is x > y? (x and y both nonnegative)
    function greater(x, y) {
        var i;
        var k = (x.length < y.length) ? x.length : y.length;

        for (i = x.length; i < y.length; i++)
            if (y[i])
                return 0;  //y has more digits

        for (i = y.length; i < x.length; i++)
            if (x[i])
                return 1;  //x has more digits

        for (i = k - 1; i >= 0; i--)
            if (x[i] > y[i])
                return 1;
            else if (x[i] < y[i])
                return 0;
        return 0;
    }

    //divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
    //x must have at least one leading zero element.
    //y must be nonzero.
    //q and r must be arrays that are exactly the same length as x. (Or q can have more).
    //Must have x.length >= y.length >= 2.
    function divide_(x, y, q, r) {
        var kx, ky;
        var i, j, y1, y2, c, a, b;
        copy_(r, x);
        for (ky = y.length; y[ky - 1] == 0; ky--); //ky is number of elements in y, not including leading zeros

        //normalize: ensure the most significant element of y has its highest bit set  
        b = y[ky - 1];
        for (a = 0; b; a++)
            b >>= 1;
        a = bpe - a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
        leftShift_(y, a);  //multiply both by 1<<a now, then divide both by that at the end
        leftShift_(r, a);

        //Rob Visser discovered a bug: the following line was originally just before the normalization.
        for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--); //kx is number of elements in normalized x, not including leading zeros

        copyInt_(q, 0);                      // q=0
        while (!greaterShift(y, r, kx - ky)) {  // while (leftShift_(y,kx-ky) <= r) {
            subShift_(r, y, kx - ky);             //   r=r-leftShift_(y,kx-ky)
            q[kx - ky]++;                       //   q[kx-ky]++;
        }                                   // }

        for (i = kx - 1; i >= ky; i--) {
            if (r[i] == y[ky - 1])
                q[i - ky] = mask;
            else
                q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]);

            //The following for(;;) loop is equivalent to the commented while loop, 
            //except that the uncommented version avoids overflow.
            //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
            //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
            //    q[i-ky]--;    
            for (; ;) {
                y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];
                c = y2 >> bpe;
                y2 = y2 & mask;
                y1 = c + q[i - ky] * y[ky - 1];
                c = y1 >> bpe;
                y1 = y1 & mask;

                if (c == r[i] ? y1 == r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i])
                    q[i - ky]--;
                else
                    break;
            }

            linCombShift_(r, y, -q[i - ky], i - ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
            if (negative(r)) {
                addShift_(r, y, i - ky);         //r=r+leftShift_(y,i-ky)
                q[i - ky]--;
            }
        }

        rightShift_(y, a);  //undo the normalization step
        rightShift_(r, a);  //undo the normalization step
    }

    //do carries and borrows so each element of the bigInt x fits in bpe bits.
    function carry_(x) {
        var i, k, c, b;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i];
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
        }
    }

    //return x mod n for bigInt x and integer n.
    function modInt(x, n) {
        var i, c = 0;
        for (i = x.length - 1; i >= 0; i--)
            c = (c * radix + x[i]) % n;
        return c;
    }

    //convert the integer t into a bigInt with at least the given number of bits.
    //the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
    //Pad the array with leading zeros so that it has at least minSize elements.
    //There will always be at least one leading 0 element.
    function int2bigInt(t, bits, minSize) {
        var i, k;
        k = Math.ceil(bits / bpe) + 1;
        k = minSize > k ? minSize : k;
        buff = new Array(k);
        copyInt_(buff, t);
        return buff;
    }

    //return the bigInt given a string representation in a given base.  
    //Pad the array with leading zeros so that it has at least minSize elements.
    //If base=-1, then it reads in a space-separated list of array elements in decimal.
    //The array will always have at least one leading zero, unless base=-1.
    function str2bigInt(s, base, minSize) {
        var d, i, j, x, y, kk;
        var k = s.length;
        if (base == -1) { //comma-separated list of array elements in decimal
            x = new Array(0);
            for (; ;) {
                y = new Array(x.length + 1);
                for (i = 0; i < x.length; i++)
                    y[i + 1] = x[i];
                y[0] = parseInt(s, 10);
                x = y;
                d = s.indexOf(',', 0);
                if (d < 1)
                    break;
                s = s.substring(d + 1);
                if (s.length == 0)
                    break;
            }
            if (x.length < minSize) {
                y = new Array(minSize);
                copy_(y, x);
                return y;
            }
            return x;
        }

        x = int2bigInt(0, base * k, 0);
        for (i = 0; i < k; i++) {
            d = digitsStr.indexOf(s.substring(i, i + 1), 0);
            if (base <= 36 && d >= 36)  //convert lowercase to uppercase if base<=36
                d -= 26;
            if (d >= base || d < 0) {   //stop at first illegal character
                break;
            }
            multInt_(x, base);
            addInt_(x, d);
        }

        for (k = x.length; k > 0 && !x[k - 1]; k--); //strip off leading zeros
        k = minSize > k + 1 ? minSize : k + 1;
        y = new Array(k);
        kk = k < x.length ? k : x.length;
        for (i = 0; i < kk; i++)
            y[i] = x[i];
        for (; i < k; i++)
            y[i] = 0;
        return y;
    }

    //is bigint x equal to integer y?
    //y must have less than bpe bits
    function equalsInt(x, y) {
        var i;
        if (x[0] != y)
            return 0;
        for (i = 1; i < x.length; i++)
            if (x[i])
                return 0;
        return 1;
    }

    //are bigints x and y equal?
    //this works even if x and y are different lengths and have arbitrarily many leading zeros
    function equals(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = 0; i < k; i++)
            if (x[i] != y[i])
                return 0;
        if (x.length > y.length) {
            for (; i < x.length; i++)
                if (x[i])
                    return 0;
        } else {
            for (; i < y.length; i++)
                if (y[i])
                    return 0;
        }
        return 1;
    }

    //is the bigInt x equal to zero?
    function isZero(x) {
        var i;
        for (i = 0; i < x.length; i++)
            if (x[i])
                return 0;
        return 1;
    }

    //convert a bigInt into a string in a given base, from base 2 up to base 95.
    //Base -1 prints the contents of the array representing the number.
    function bigInt2str(x, base) {
        var i, t, s = "";

        if (s6.length != x.length)
            s6 = dup(x);
        else
            copy_(s6, x);

        if (base == -1) { //return the list of array contents
            for (i = x.length - 1; i > 0; i--)
                s += x[i] + ',';
            s += x[0];
        }
        else { //return it in the given base
            while (!isZero(s6)) {
                t = divInt_(s6, base);  //t=s6 % base; s6=floor(s6/base);
                s = digitsStr.substring(t, t + 1) + s;
            }
        }
        if (s.length == 0)
            s = "0";
        return s;
    }

    //returns a duplicate of bigInt x
    function dup(x) {
        var i;
        buff = new Array(x.length);
        copy_(buff, x);
        return buff;
    }

    //do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
    function copy_(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = 0; i < k; i++)
            x[i] = y[i];
        for (i = k; i < x.length; i++)
            x[i] = 0;
    }

    //do x=y on bigInt x and integer y.  
    function copyInt_(x, n) {
        var i, c;
        for (c = n, i = 0; i < x.length; i++) {
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x+n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    function addInt_(x, n) {
        var i, k, c, b;
        x[0] += n;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i];
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
            if (!c) return; //stop carrying as soon as the carry is zero
        }
    }

    //right shift bigInt x by n bits.  0 <= n < bpe.
    function rightShift_(x, n) {
        var i;
        var k = Math.floor(n / bpe);
        if (k) {
            for (i = 0; i < x.length - k; i++) //right shift x by k elements
                x[i] = x[i + k];
            for (; i < x.length; i++)
                x[i] = 0;
            n %= bpe;
        }
        for (i = 0; i < x.length - 1; i++) {
            x[i] = mask & ((x[i + 1] << (bpe - n)) | (x[i] >> n));
        }
        x[i] >>= n;
    }

    //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement
    function halve_(x) {
        var i;
        for (i = 0; i < x.length - 1; i++) {
            x[i] = mask & ((x[i + 1] << (bpe - 1)) | (x[i] >> 1));
        }
        x[i] = (x[i] >> 1) | (x[i] & (radix >> 1));  //most significant bit stays the same
    }

    //left shift bigInt x by n bits.
    function leftShift_(x, n) {
        var i;
        var k = Math.floor(n / bpe);
        if (k) {
            for (i = x.length; i >= k; i--) //left shift x by k elements
                x[i] = x[i - k];
            for (; i >= 0; i--)
                x[i] = 0;
            n %= bpe;
        }
        if (!n)
            return;
        for (i = x.length - 1; i > 0; i--) {
            x[i] = mask & ((x[i] << n) | (x[i - 1] >> (bpe - n)));
        }
        x[i] = mask & (x[i] << n);
    }

    //do x=x*n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    function multInt_(x, n) {
        var i, k, c, b;
        if (!n)
            return;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i] * n;
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
        }
    }

    //do x=floor(x/n) for bigInt x and integer n, and return the remainder
    function divInt_(x, n) {
        var i, r = 0, s;
        for (i = x.length - 1; i >= 0; i--) {
            s = r * radix + x[i];
            x[i] = Math.floor(s / n);
            r = s % n;
        }
        return r;
    }

    //do the linear combination x=a*x+b*y for bigInts x and y, and integers a and b.
    //x must be large enough to hold the answer.
    function linComb_(x, y, a, b) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        kk = x.length;
        for (c = 0, i = 0; i < k; i++) {
            c += a * x[i] + b * y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; i < kk; i++) {
            c += a * x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
    //x must be large enough to hold the answer.
    function linCombShift_(x, y, b, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] + b * y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x+(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
    //x must be large enough to hold the answer.
    function addShift_(x, y, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] + y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
    //x must be large enough to hold the answer.
    function subShift_(x, y, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] - y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x-y for bigInts x and y.
    //x must be large enough to hold the answer.
    //negative answers will be 2s complement
    function sub_(x, y) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        for (c = 0, i = 0; i < k; i++) {
            c += x[i] - y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < x.length; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x+y for bigInts x and y.
    //x must be large enough to hold the answer.
    function add_(x, y) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        for (c = 0, i = 0; i < k; i++) {
            c += x[i] + y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < x.length; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x*y for bigInts x and y.  This is faster when y<x.
    function mult_(x, y) {
        var i;
        if (ss.length != 2 * x.length)
            ss = new Array(2 * x.length);
        copyInt_(ss, 0);
        for (i = 0; i < y.length; i++)
            if (y[i])
                linCombShift_(ss, x, y[i], i);   //ss=1*ss+y[i]*(x<<(i*bpe))
        copy_(x, ss);
    }

    //do x=x mod n for bigInts x and n.
    function mod_(x, n) {
        if (s4.length != x.length)
            s4 = dup(x);
        else
            copy_(s4, x);
        if (s5.length != x.length)
            s5 = dup(x);
        divide_(s4, n, s5, x);  //x = remainder of s4 / n
    }

    //do x=x*y mod n for bigInts x,y,n.
    //for greater speed, let y<x.
    function multMod_(x, y, n) {
        var i;
        if (s0.length != 2 * x.length)
            s0 = new Array(2 * x.length);
        copyInt_(s0, 0);
        for (i = 0; i < y.length; i++)
            if (y[i])
                linCombShift_(s0, x, y[i], i);   //s0=1*s0+y[i]*(x<<(i*bpe))
        mod_(s0, n);
        copy_(x, s0);
    }

    //do x=x*x mod n for bigInts x,n.
    function squareMod_(x, n) {
        var i, j, d, c, kx, kn, k;
        for (kx = x.length; kx > 0 && !x[kx - 1]; kx--);  //ignore leading zeros in x
        k = kx > n.length ? 2 * kx : 2 * n.length; //k=# elements in the product, which is twice the elements in the larger of x and n
        if (s0.length != k)
            s0 = new Array(k);
        copyInt_(s0, 0);
        for (i = 0; i < kx; i++) {
            c = s0[2 * i] + x[i] * x[i];
            s0[2 * i] = c & mask;
            c >>= bpe;
            for (j = i + 1; j < kx; j++) {
                c = s0[i + j] + 2 * x[i] * x[j] + c;
                s0[i + j] = (c & mask);
                c >>= bpe;
            }
            s0[i + kx] = c;
        }
        mod_(s0, n);
        copy_(x, s0);
    }

    //return x with exactly k leading zero elements
    function trim(x, k) {
        var i, y;
        for (i = x.length; i > 0 && !x[i - 1]; i--);
        y = new Array(i + k);
        copy_(y, x);
        return y;
    }

    //do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
    //this is faster when n is odd.  x usually needs to have as many elements as n.
    function powMod_(x, y, n) {
        var k1, k2, kn, np;
        if (s7.length != n.length)
            s7 = dup(n);

        //for even modulus, use a simple square-and-multiply algorithm,
        //rather than using the more complex Montgomery algorithm.
        if ((n[0] & 1) == 0) {
            copy_(s7, x);
            copyInt_(x, 1);
            while (!equalsInt(y, 0)) {
                if (y[0] & 1)
                    multMod_(x, s7, n);
                divInt_(y, 2);
                squareMod_(s7, n);
            }
            return;
        }

        //calculate np from n for the Montgomery multiplications
        copyInt_(s7, 0);
        for (kn = n.length; kn > 0 && !n[kn - 1]; kn--);
        np = radix - inverseModInt(modInt(n, radix), radix);
        s7[kn] = 1;
        multMod_(x, s7, n);   // x = x * 2**(kn*bp) mod n

        if (s3.length != x.length)
            s3 = dup(x);
        else
            copy_(s3, x);

        for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--);  //k1=first nonzero element of y
        if (y[k1] == 0) {  //anything to the 0th power is 1
            copyInt_(x, 1);
            return;
        }
        for (k2 = 1 << (bpe - 1); k2 && !(y[k1] & k2); k2 >>= 1);  //k2=position of first 1 bit in y[k1]
        for (; ;) {
            if (!(k2 >>= 1)) {  //look at next bit of y
                k1--;
                if (k1 < 0) {
                    mont_(x, one, n, np);
                    return;
                }
                k2 = 1 << (bpe - 1);
            }
            mont_(x, x, n, np);

            if (k2 & y[k1]) //if next bit is a 1
                mont_(x, s3, n, np);
        }
    }


    //do x=x*y*Ri mod n for bigInts x,y,n, 
    //  where Ri = 2**(-kn*bpe) mod n, and kn is the 
    //  number of elements in the n array, not 
    //  counting leading zeros.  
    //x array must have at least as many elemnts as the n array
    //It's OK if x and y are the same variable.
    //must have:
    //  x,y < n
    //  n is odd
    //  np = -(n^(-1)) mod radix
    function mont_(x, y, n, np) {
        var i, j, c, ui, t, ks;
        var kn = n.length;
        var ky = y.length;

        if (sa.length != kn)
            sa = new Array(kn);

        copyInt_(sa, 0);

        for (; kn > 0 && n[kn - 1] == 0; kn--); //ignore leading zeros of n
        for (; ky > 0 && y[ky - 1] == 0; ky--); //ignore leading zeros of y
        ks = sa.length - 1; //sa will never have more than this many nonzero elements.  

        //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
        for (i = 0; i < kn; i++) {
            t = sa[0] + x[i] * y[0];
            ui = ((t & mask) * np) & mask;  //the inner "& mask" was needed on Safari (but not MSIE) at one time
            c = (t + ui * n[0]) >> bpe;
            t = x[i];

            //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
            j = 1;
            for (; j < ky - 4;) {
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
            }
            for (; j < ky;) { c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
            for (; j < kn - 4;) {
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
            }
            for (; j < kn;) { c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
            for (; j < ks;) { c += sa[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
            sa[j - 1] = c & mask;
        }

        if (!greater(n, sa))
            sub_(sa, n);
        copy_(x, sa);
    }

    // Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
    // This work is free. You can redistribute it and/or modify it
    // under the terms of the WTFPL, Version 2
    // For more information see LICENSE.txt or http://www.wtfpl.net/
    //
    // This lib is part of the lz-string project.
    // For more information, the home page:
    // http://pieroxy.net/blog/pages/lz-string/index.html
    //
    // Base64 compression / decompression for already compressed content (gif, png, jpg, mp3, ...) 
    // version 1.4.1
    var Base64String = {

        compressToUTF16: function (input) {
            var output = [],
                i, c,
                current,
                status = 0;

            input = this.compress(input);

            for (i = 0; i < input.length; i++) {
                c = input.charCodeAt(i);
                switch (status++) {
                    case 0:
                        output.push(String.fromCharCode((c >> 1) + 32));
                        current = (c & 1) << 14;
                        break;
                    case 1:
                        output.push(String.fromCharCode((current + (c >> 2)) + 32));
                        current = (c & 3) << 13;
                        break;
                    case 2:
                        output.push(String.fromCharCode((current + (c >> 3)) + 32));
                        current = (c & 7) << 12;
                        break;
                    case 3:
                        output.push(String.fromCharCode((current + (c >> 4)) + 32));
                        current = (c & 15) << 11;
                        break;
                    case 4:
                        output.push(String.fromCharCode((current + (c >> 5)) + 32));
                        current = (c & 31) << 10;
                        break;
                    case 5:
                        output.push(String.fromCharCode((current + (c >> 6)) + 32));
                        current = (c & 63) << 9;
                        break;
                    case 6:
                        output.push(String.fromCharCode((current + (c >> 7)) + 32));
                        current = (c & 127) << 8;
                        break;
                    case 7:
                        output.push(String.fromCharCode((current + (c >> 8)) + 32));
                        current = (c & 255) << 7;
                        break;
                    case 8:
                        output.push(String.fromCharCode((current + (c >> 9)) + 32));
                        current = (c & 511) << 6;
                        break;
                    case 9:
                        output.push(String.fromCharCode((current + (c >> 10)) + 32));
                        current = (c & 1023) << 5;
                        break;
                    case 10:
                        output.push(String.fromCharCode((current + (c >> 11)) + 32));
                        current = (c & 2047) << 4;
                        break;
                    case 11:
                        output.push(String.fromCharCode((current + (c >> 12)) + 32));
                        current = (c & 4095) << 3;
                        break;
                    case 12:
                        output.push(String.fromCharCode((current + (c >> 13)) + 32));
                        current = (c & 8191) << 2;
                        break;
                    case 13:
                        output.push(String.fromCharCode((current + (c >> 14)) + 32));
                        current = (c & 16383) << 1;
                        break;
                    case 14:
                        output.push(String.fromCharCode((current + (c >> 15)) + 32, (c & 32767) + 32));
                        status = 0;
                        break;
                }
            }
            output.push(String.fromCharCode(current + 32));
            return output.join('');
        },


        decompressFromUTF16: function (input) {
            var output = [],
                current, c,
                status = 0,
                i = 0;

            while (i < input.length) {
                c = input.charCodeAt(i) - 32;

                switch (status++) {
                    case 0:
                        current = c << 1;
                        break;
                    case 1:
                        output.push(String.fromCharCode(current | (c >> 14)));
                        current = (c & 16383) << 2;
                        break;
                    case 2:
                        output.push(String.fromCharCode(current | (c >> 13)));
                        current = (c & 8191) << 3;
                        break;
                    case 3:
                        output.push(String.fromCharCode(current | (c >> 12)));
                        current = (c & 4095) << 4;
                        break;
                    case 4:
                        output.push(String.fromCharCode(current | (c >> 11)));
                        current = (c & 2047) << 5;
                        break;
                    case 5:
                        output.push(String.fromCharCode(current | (c >> 10)));
                        current = (c & 1023) << 6;
                        break;
                    case 6:
                        output.push(String.fromCharCode(current | (c >> 9)));
                        current = (c & 511) << 7;
                        break;
                    case 7:
                        output.push(String.fromCharCode(current | (c >> 8)));
                        current = (c & 255) << 8;
                        break;
                    case 8:
                        output.push(String.fromCharCode(current | (c >> 7)));
                        current = (c & 127) << 9;
                        break;
                    case 9:
                        output.push(String.fromCharCode(current | (c >> 6)));
                        current = (c & 63) << 10;
                        break;
                    case 10:
                        output.push(String.fromCharCode(current | (c >> 5)));
                        current = (c & 31) << 11;
                        break;
                    case 11:
                        output.push(String.fromCharCode(current | (c >> 4)));
                        current = (c & 15) << 12;
                        break;
                    case 12:
                        output.push(String.fromCharCode(current | (c >> 3)));
                        current = (c & 7) << 13;
                        break;
                    case 13:
                        output.push(String.fromCharCode(current | (c >> 2)));
                        current = (c & 3) << 14;
                        break;
                    case 14:
                        output.push(String.fromCharCode(current | (c >> 1)));
                        current = (c & 1) << 15;
                        break;
                    case 15:
                        output.push(String.fromCharCode(current | c));
                        status = 0;
                        break;
                }


                i++;
            }

            return this.decompress(output.join(''));
            //return output;

        },


        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        decompress: function (input) {
            var output = [];
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 1;
            var odd = input.charCodeAt(0) >> 8;

            while (i < input.length * 2 && (i < input.length * 2 - 1 || odd == 0)) {

                if (i % 2 == 0) {
                    chr1 = input.charCodeAt(i / 2) >> 8;
                    chr2 = input.charCodeAt(i / 2) & 255;
                    if (i / 2 + 1 < input.length)
                        chr3 = input.charCodeAt(i / 2 + 1) >> 8;
                    else
                        chr3 = NaN;
                } else {
                    chr1 = input.charCodeAt((i - 1) / 2) & 255;
                    if ((i + 1) / 2 < input.length) {
                        chr2 = input.charCodeAt((i + 1) / 2) >> 8;
                        chr3 = input.charCodeAt((i + 1) / 2) & 255;
                    } else
                        chr2 = chr3 = NaN;
                }
                i += 3;

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2) || (i == input.length * 2 + 1 && odd)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3) || (i == input.length * 2 && odd)) {
                    enc4 = 64;
                }

                output.push(this._keyStr.charAt(enc1));
                output.push(this._keyStr.charAt(enc2));
                output.push(this._keyStr.charAt(enc3));
                output.push(this._keyStr.charAt(enc4));
            }

            return output.join('');
        },

        compress: function (input) {
            var output = [],
                ol = 1,
                output_,
                chr1, chr2, chr3,
                enc1, enc2, enc3, enc4,
                i = 0, flush = false;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                if (ol % 2 == 0) {
                    output_ = chr1 << 8;
                    flush = true;

                    if (enc3 != 64) {
                        output.push(String.fromCharCode(output_ | chr2));
                        flush = false;
                    }
                    if (enc4 != 64) {
                        output_ = chr3 << 8;
                        flush = true;
                    }
                } else {
                    output.push(String.fromCharCode(output_ | chr1));
                    flush = false;

                    if (enc3 != 64) {
                        output_ = chr2 << 8;
                        flush = true;
                    }
                    if (enc4 != 64) {
                        output.push(String.fromCharCode(output_ | chr3));
                        flush = false;
                    }
                }
                ol += 3;
            }

            if (flush) {
                output.push(String.fromCharCode(output_));
                output = output.join('');
                output = String.fromCharCode(output.charCodeAt(0) | 256) + output.substring(1);
            } else {
                output = output.join('');
            }

            return output;

        }
    }

    // Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
    // This work is free. You can redistribute it and/or modify it
    // under the terms of the WTFPL, Version 2
    // For more information see LICENSE.txt or http://www.wtfpl.net/
    //
    // For more information, the home page:
    // http://pieroxy.net/blog/pages/lz-string/testing.html
    //
    // LZ-based compression algorithm, version 1.4.4
    var LZString = (function () {

        // private property
        var f = String.fromCharCode;
        var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
        var baseReverseDic = {};

        function getBaseValue(alphabet, character) {
            if (!baseReverseDic[alphabet]) {
                baseReverseDic[alphabet] = {};
                for (var i = 0; i < alphabet.length; i++) {
                    baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                }
            }
            return baseReverseDic[alphabet][character];
        }

        var LZString = {
            compressToBase64: function (input) {
                if (input == null) return "";
                var res = LZString._compress(input, 6, function (a) { return keyStrBase64.charAt(a); });
                switch (res.length % 4) { // To produce valid Base64
                    default: // When could this happen ?
                    case 0: return res;
                    case 1: return res + "===";
                    case 2: return res + "==";
                    case 3: return res + "=";
                }
            },

            decompressFromBase64: function (input) {
                if (input == null) return "";
                if (input == "") return null;
                return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
            },

            compressToUTF16: function (input) {
                if (input == null) return "";
                return LZString._compress(input, 15, function (a) { return f(a + 32); }) + " ";
            },

            decompressFromUTF16: function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 16384, function (index) { return compressed.charCodeAt(index) - 32; });
            },

            //compress into uint8array (UCS-2 big endian format)
            compressToUint8Array: function (uncompressed) {
                var compressed = LZString.compress(uncompressed);
                var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

                for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
                    var current_value = compressed.charCodeAt(i);
                    buf[i * 2] = current_value >>> 8;
                    buf[i * 2 + 1] = current_value % 256;
                }
                return buf;
            },

            //decompress from uint8array (UCS-2 big endian format)
            decompressFromUint8Array: function (compressed) {
                if (compressed === null || compressed === undefined) {
                    return LZString.decompress(compressed);
                } else {
                    var buf = new Array(compressed.length / 2); // 2 bytes per character
                    for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                        buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                    }

                    var result = [];
                    buf.forEach(function (c) {
                        result.push(f(c));
                    });
                    return LZString.decompress(result.join(''));

                }

            },


            //compress into a string that is already URI encoded
            compressToEncodedURIComponent: function (input) {
                if (input == null) return "";
                return LZString._compress(input, 6, function (a) { return keyStrUriSafe.charAt(a); });
            },

            //decompress from an output of compressToEncodedURIComponent
            decompressFromEncodedURIComponent: function (input) {
                if (input == null) return "";
                if (input == "") return null;
                input = input.replace(/ /g, "+");
                return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
            },

            compress: function (uncompressed) {
                return LZString._compress(uncompressed, 16, function (a) { return f(a); });
            },
            _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
                if (uncompressed == null) return "";
                var i, value,
                    context_dictionary = {},
                    context_dictionaryToCreate = {},
                    context_c = "",
                    context_wc = "",
                    context_w = "",
                    context_enlargeIn = 2, // Compensate for the first entry which should not count
                    context_dictSize = 3,
                    context_numBits = 2,
                    context_data = [],
                    context_data_val = 0,
                    context_data_position = 0,
                    ii;

                for (ii = 0; ii < uncompressed.length; ii += 1) {
                    context_c = uncompressed.charAt(ii);
                    if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                        context_dictionary[context_c] = context_dictSize++;
                        context_dictionaryToCreate[context_c] = true;
                    }

                    context_wc = context_w + context_c;
                    if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                        context_w = context_wc;
                    } else {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                            if (context_w.charCodeAt(0) < 256) {
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 8; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for (i = 0; i < context_numBits; i++) {
                                    context_data_val = (context_data_val << 1) | value;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for (i = 0; i < 16; i++) {
                                    context_data_val = (context_data_val << 1) | (value & 1);
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }


                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        // Add wc to the dictionary.
                        context_dictionary[context_wc] = context_dictSize++;
                        context_w = String(context_c);
                    }
                }

                // Output the code for w.
                if (context_w !== "") {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 8; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 16; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }


                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                }

                // Mark the end of the stream
                value = 2;
                for (i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }

                // Flush the last char
                while (true) {
                    context_data_val = (context_data_val << 1);
                    if (context_data_position == bitsPerChar - 1) {
                        context_data.push(getCharFromInt(context_data_val));
                        break;
                    }
                    else context_data_position++;
                }
                return context_data.join('');
            },

            decompress: function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return LZString._decompress(compressed.length, 32768, function (index) { return compressed.charCodeAt(index); });
            },

            _decompress: function (length, resetValue, getNextValue) {
                var dictionary = [],
                    next,
                    enlargeIn = 4,
                    dictSize = 4,
                    numBits = 3,
                    entry = "",
                    result = [],
                    i,
                    w,
                    bits, resb, maxpower, power,
                    c,
                    data = { val: getNextValue(0), position: resetValue, index: 1 };

                for (i = 0; i < 3; i += 1) {
                    dictionary[i] = i;
                }

                bits = 0;
                maxpower = Math.pow(2, 2);
                power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }

                switch (next = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 2:
                        return "";
                }
                dictionary[3] = c;
                w = c;
                result.push(c);
                while (true) {
                    if (data.index > length) {
                        return "";
                    }

                    bits = 0;
                    maxpower = Math.pow(2, numBits);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }

                    switch (c = bits) {
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2, 8);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }

                            dictionary[dictSize++] = f(bits);
                            c = dictSize - 1;
                            enlargeIn--;
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2, 16);
                            power = 1;
                            while (power != maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            dictionary[dictSize++] = f(bits);
                            c = dictSize - 1;
                            enlargeIn--;
                            break;
                        case 2:
                            return result.join('');
                    }

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                    if (dictionary[c]) {
                        entry = dictionary[c];
                    } else {
                        if (c === dictSize) {
                            entry = w + w.charAt(0);
                        } else {
                            return null;
                        }
                    }
                    result.push(entry);

                    // Add w+entry[0] to the dictionary.
                    dictionary[dictSize++] = w + entry.charAt(0);
                    enlargeIn--;

                    w = entry;

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                }
            }
        };
        return LZString;
    })();

    if (typeof define === 'function' && define.amd) {
        define(function () { return LZString; });
    } else if (typeof module !== 'undefined' && module != null) {
        module.exports = LZString
    } else if (typeof angular !== 'undefined' && angular != null) {
        angular.module('LZString', [])
            .factory('LZString', function () {
                return LZString;
            });
    }

    /* Blackfeather.Data.Encoding */
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

    /* Blackfeather.Security.Cryptology */
    Blackfeather.Security = Blackfeather.Security || {};
    Blackfeather.Security.Cryptology = Blackfeather.Security.Cryptology || {};
    Blackfeather.Security.Cryptology = {
    	PBKDF2_ITERATIONS: 1,
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
                return randBigInt(length, 0);
            };

            // TODO: NOT REALLY SECURE COMPARED TO THE OTHERS
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
        Hash: function () {
            this.Compute = function (data, salt) {
                var output = new Blackfeather.Security.Cryptology.SaltedData();

                output.Salt = (typeof salt === "undefined" || salt === null) ? new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16) : CryptoJS.enc.Base64.parse(salt);
                output.Data = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(new Blackfeather.Security.Cryptology.Kdf().Compute(data, output.Salt.toString(CryptoJS.enc.Base64)).Data).toString(CryptoJS.enc.Hex));

                return output;
            };
        },
        Hmac: function () {
            this.Compute = function (data, key, salt) {
                var output = new Blackfeather.Security.Cryptology.SaltedData();
                output.Salt = (typeof salt === "undefined" || salt === null) ? new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16) : CryptoJS.enc.Base64.parse(salt);
                var kdf = new Blackfeather.Security.Cryptology.Kdf().Compute(key, output.Salt.toString(CryptoJS.enc.Base64)).Data;
                output.Data = CryptoJS.enc.Hex.parse(CryptoJS.HmacSHA256(data, kdf).toString(CryptoJS.enc.Hex));

                return output;
            };
        },
        Encryption: function () {
            this.Compute = function (data, password, salt, secondaryVerifier) {
            	var saltedData = new Blackfeather.Security.Cryptology.SaltedData();
                var salting = (typeof salt === "undefined" || salt === null) ? new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16) : CryptoJS.enc.Base64.parse(salt);
                var keyHash = new Blackfeather.Security.Cryptology.Hash().Compute(password, salting.toString(CryptoJS.enc.Base64));
                var iv = CryptoJS.enc.Hex.parse(new Blackfeather.Security.Cryptology.SecureRandom().NextBytes(16));

                if (typeof secondaryVerifier !== "undefined" || secondaryVerifier !== null) {
					var kdf = new Blackfeather.Security.Cryptology.Hmac().Compute(secondaryVerifier, keyHash.Data, keyHash.Salt.toString(CryptoJS.enc.Base64)).Data.toString(CryptoJS.enc.Hex);
                    data += kdf;
                }

                var output = CryptoJS.enc.Hex.parse(CryptoJS.AES.encrypt(data, keyHash.Data, { mode: CryptoJS.mode.CTR, iv: iv, padding: CryptoJS.pad.NoPadding }).ciphertext.toString(CryptoJS.enc.Hex));
                var outputHash = new Blackfeather.Security.Cryptology.Hmac().Compute(output, keyHash.Data, keyHash.Salt.toString(CryptoJS.enc.Base64)).Data;

                output = iv.concat(output);
                output = output.concat(outputHash);

                saltedData.Salt = CryptoJS.enc.Hex.parse(salting.toString(CryptoJS.enc.Hex));
                saltedData.Data = output;

                return saltedData;
            };
        },
        Decryption: function () {
            this.Compute = function (data, password, salt, secondaryVerifier) {
                var dataBytes = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Hex);
                var iv = CryptoJS.enc.Hex.parse(dataBytes.substr(0, 32));
                var verifier = dataBytes.substring(dataBytes.length - 64, dataBytes.length);
                var keyHash = new Blackfeather.Security.Cryptology.Hash().Compute(password, salt);

                var input = CryptoJS.enc.Hex.parse(dataBytes.substring(32, dataBytes.length - 64));
                var inputHash = new Blackfeather.Security.Cryptology.Hmac().Compute(input, keyHash.Data, salt).Data;
                if (inputHash.toString(CryptoJS.enc.Hex) !== verifier) {
                    return null;
                }

                var output = CryptoJS.AES.decrypt(input.toString(CryptoJS.enc.Base64), keyHash.Data, { mode: CryptoJS.mode.CTR, iv: iv, padding: CryptoJS.pad.NoPadding }).toString(CryptoJS.enc.Utf8);
                if (typeof secondaryVerifier !== "undefined" || secondaryVerifier !== null) {
                    var expectedVerifier = new Blackfeather.Security.Cryptology.Hmac().Compute(secondaryVerifier, keyHash.Data, salt).Data.toString(CryptoJS.enc.Hex);
                    var suspectedVerifier = output.substr(output.length - 64, 64);

                    if ((expectedVerifier !== suspectedVerifier)) {
                        return null;
                    }

                    output = output.substr(0, output.length - 64);
                }

                return output;
            };
        },
        KeyExchange: function () {
            this.KeyPair = function (Private, Public) {
                this.Private = Private;
                this.Public = Public;
            };

            this.Commonality = function () {
                this.G = str2bigInt("3", 10);
                // https://en.wikipedia.org/wiki/RSA_numbers#RSA-617
                // https://en.wikipedia.org/wiki/RSA_numbers#RSA-2048
                this.P = str2bigInt("25195908475657893494027183240048398571429282126204032027777137836043662020707595556264018525880784406918290641249515082189298559149176184502808489120072844992687392807287776735971418347270261896375014971824691165077613379859095700097330459748808428401797429100642458691817195118746121515172654632282216869987549182422433637259085141865462043576798423387184774447920739934236584823824281198163815010674810451660377306056201619676256133844143603833904414952634432190114657544454178424020924616515723350778707749817125772467962926386356373289912154831438167899885040445364023527381951378636564391212010397122822120720357", 10);
            };

            this.Mix = function () {
                var keyPair = new this.KeyPair();
                var commonality = new this.Commonality();

                keyPair.Private = bigInt2str(new Blackfeather.Security.Cryptology.SecureRandom().NextBigInt(2048), 10);
                keyPair.Public = bigInt2str(powMod(commonality.G, str2bigInt(keyPair.Private, 10), commonality.P), 10);

                return keyPair;
            };

            this.Remix = function (keyPair) {
                return bigInt2str(powMod(str2bigInt(keyPair.Public, 10), str2bigInt(keyPair.Private, 10), new this.Commonality().P), 10);
            };
        }
    };

    /* Blackfeather.Data.Compression */
    Blackfeather.Data.Compression = Blackfeather.Data.Compression || {};
    Blackfeather.Data.Compression.LZString = {
        Compress: function(data) {
            return LZString.compress(data);
        },
        Decompress: function(data) {
            return LZString.decompress(data);
        }
    }

    /* EXPORTS */
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
