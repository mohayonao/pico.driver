# pico.driver.webaudio
[![NPM Version](http://img.shields.io/npm/v/pico.driver.webaudio.svg?style=flat-square)](https://www.npmjs.org/package/pico.driver.webaudio)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
$ npm install pico.driver.webaudio
```

## API
### PicoWebAudioDriver
- `constructor()`

#### Instance attributes
- `processor: Processor` _(required)_
- `context: AudioContext` _(implicit readonly)_
- `sampleRate: number` _(implicit readonly)_
- `bufferLength: number` _(implicit readonly)_

#### Instance methods
- `setup(opts: object): void`
  - `opts.context: AudioContext` _(required)_
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
