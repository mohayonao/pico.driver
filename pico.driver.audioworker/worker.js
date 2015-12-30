function PicoAudioWorkerDriver(self) {
  var _this = this;

  this.context = null;
  this.sampleRate = 0;
  this.bufferLength = 0;
  this.processor = null;

  this._self = self;

  self.onaudioprocess = function(e) {
    _this.processor.process(e.outputs[0][0], e.outputs[0][1]);
  };
}

PicoAudioWorkerDriver.prototype.setup = function() {
  var bufferLength = Math.max(256, Math.min((+opts.bufferLength|0) || 1024, 16384));

  this.bufferLength = 1 << Math.ceil(Math.log(bufferLength) / Math.log(2));
  this.sampleRate = this._self.sampleRate;
};

PicoAudioWorkerDriver.prototype.start = function() {
};

PicoAudioWorkerDriver.prototype.stop = function() {
};

module.exports = PicoAudioWorkerDriver;
