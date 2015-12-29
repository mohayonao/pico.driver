var Readable = require("stream").Readable;
var Speaker = require("speaker");

function PicoNodeAudioDriver() {
  this.context = null;
  this.sampleRate = 0;
  this.bufferLength = 0;
  this.processor = null;

  this._node = null;
}

PicoNodeAudioDriver.prototype.setup = function(opts) {
  var sampleRate = +opts.sampleRate || 44100;
  var bufferLength = Math.max(256, Math.min((+opts.bufferLength|0) || 1024, 16384));

  this.sampleRate = sampleRate;
  this.bufferLength = 1 << Math.ceil(Math.log(bufferLength) / Math.log(2));
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
