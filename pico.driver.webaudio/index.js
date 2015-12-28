function PicoWebAudioDriver() {
  this.sampleRate = 0;
  this.bufferLength = 0;

  this._scp = null;
  this._context = null;
  this._destination = null;
}

PicoWebAudioDriver.prototype.setup = function(opts) {
  var bufferLength = Math.max(256, Math.min((+opts.bufferLength|0) || 1024, 16384));

  this.bufferLength = 1 << Math.ceil(Math.log(bufferLength) / Math.log(2));

  if (opts.destination) {
    this._destination = opts.destination;
    this._context = this._destination.context;
  } else {
    this._context = opts.context;
    this._destination = this._context.destination;
  }

  this.sampleRate = this._context.sampleRate;
};

PicoWebAudioDriver.prototype.start = function() {
  var processor = this.processor;
  var bufL = new Float32Array(this.bufferLength);
  var bufR = new Float32Array(this.bufferLength);

  if (this._context !== null && this.processor !== null && this._scp === null) {
    this._scp = this._context.createScriptProcessor(this.bufferLength, 0, 2);
    if (typeof AudioBuffer.prototype.copyToChannel === "function") {
      this._scp.onaudioprocess = function(e) {
        var buf = e.outputBuffer;

        processor.process(bufL, bufR);

        buf.copyToChannel(bufL, 0);
        buf.copyToChannel(bufR, 1);
      };
    } else {
      this._scp.onaudioprocess = function(e) {
        var buf = e.outputBuffer;

        processor.process(bufL, bufR);

        buf.getChannelData(0).set(bufL);
        buf.getChannelData(1).set(bufR);
      };
    }
    this._scp.connect(this._destination);
  }
};

PicoWebAudioDriver.prototype.stop = function() {
  if (this._scp !== null) {
    this._scp.disconnect();
    this._scp = null;
  }
};

module.exports = PicoWebAudioDriver;
