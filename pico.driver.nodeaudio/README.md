# pico.driver.nodeaudio
[![NPM Version](http://img.shields.io/npm/v/pico.driver.nodeaudio.svg?style=flat-square)](https://www.npmjs.org/package/pico.driver.nodeaudio)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
$ npm install pico.driver.nodeaudio
```

## API
### PicoNodeAudioDriver
- `constructor()`

#### Instance attributes
- `processor: Processor` _(required)_
- `context: null` _(implicit readonly)_
- `sampleRate: number` _(implicit readonly)_
- `bufferLength: number` _(implicit readonly)_

#### Instance methods
- `setup(opts: object): void`
  - `opts.sampleRate: number` _(default: 44100)_
  - `opts.bufferLength: number` _(default: 1024)_
- `start(): void`
- `stop(): void`

#### Server Interface
```
interface Processor {
  driver: PicoDriver;
  process(bufL: Float32Array, bufR: Float32Array) => void;
}
```

## License

MIT
