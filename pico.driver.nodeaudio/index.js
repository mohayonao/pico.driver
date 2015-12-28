var Readable = require("stream").Readable;
var Speaker = require("speaker");

function PicoNodeAudioDriver() {
  this._node = null;
}

PicoNodeAudioDriver.prototype.setup = function(opts) {
  var bufferLength = Math.max(256, Math.min((+opts.bufferLength|0) || 1024, 16384));
  var sampleRate = +opts.sampleRate || 44100;

  this.bufferLength = 1 << Math.ceil(Math.log(bufferLength) / Math.log(2));
  this.sampleRate = sampleRate;
};

PicoNodeAudioDriver.prototype.start = function() {
  var processor = this.processor;
  var bufferLength = this.bufferLength;
  var bufL = new Float32Array(bufferLength);
  var bufR = new Float32Array(bufferLength);
  var buf = new Buffer(bufferLength * 2 * 4);
  var node;

  if (this.processor !== null && this._node === null) {
    node = new Readable();
    node._read = function() {
      processor.process(bufL, bufR);

      for (var i = 0; i < bufferLength; i++) {
        buf.writeFloatLE(bufL[i], i * 8 + 0);
        buf.writeFloatLE(bufR[i], i * 8 + 4);
      }

      node.push(buf);
    };
    node.pipe(new Speaker({
      sampleRate: this.sampleRate,
      samplesPerFrame: bufferLength,
      channels: 2,
      float: true
    }));

    this._node = node;
  }
};

PicoNodeAudioDriver.prototype.stop = function() {
  if (this._node !== null) {
    this._node.emit("end");
    this._node = null;
  }
};

module.exports = PicoNodeAudioDriver;
