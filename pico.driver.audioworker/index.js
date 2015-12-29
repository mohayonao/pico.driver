function PicoAudioWorkerDriver() {
  this.sampleRate = 0;
  this.bufferLength = 0;

  this._worker = null;
  this._node = null;
}

PicoAudioWorkerDriver.prototype.setup = function(opts) {
  this._worker = opts.worker;

  if (opts.destination) {
    this._destination = opts.destination;
    this._context = this._destination.context;
  } else {
    this._context = opts.context;
    this._destination = this._context.destination;
  }

  this.sampleRate = this._context.sampleRate;
};

PicoAudioWorkerDriver.prototype.start = function() {
  if (this._worker !== null && this._node === null) {
    this._node = this._worker.createNode(0, 2);
    this._node.connect(this._destination);
  }
};

PicoAudioWorkerDriver.prototype.stop = function() {
  if (this._node !== null) {
    this._node.disconnect();
    this._node = null;
  }
};

module.exports = PicoAudioWorkerDriver;
