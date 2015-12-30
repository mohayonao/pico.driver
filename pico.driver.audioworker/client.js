function PicoAudioClientDriver() {
  this.node = null;
  this.context = null;
  this.sampleRate = 0;
  this.bufferLength = 0;

  this._destination = null;
  this._node = null;
}

PicoAudioClientDriver.prototype.setup = function(opts) {
  var bufferLength = Math.max(256, Math.min((+opts.bufferLength|0) || 1024, 16384));

  this.bufferLength = 1 << Math.ceil(Math.log(bufferLength) / Math.log(2));

  if (opts.destination instanceof AudioNode) {
    this._destination = opts.destination;
  } else {
    this._destination = opts.context.destination;
  }

  this.context = this._destination.context;
  this.sampleRate = this.context.sampleRate;
};

PicoAudioClientDriver.prototype.start = function() {
  if (this.context !== null && this.node !== null && this._node === null) {
    this.node.connect(this._destination);
    this._node = this.node;
  }
};

PicoAudioClientDriver.prototype.stop = function() {
  if (this._node !== null) {
    this._node.disconnect();
    this._node = null;
  }
};

module.exports = PicoAudioClientDriver;
