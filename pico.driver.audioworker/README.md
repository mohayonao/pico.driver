# pico.driver.audioworker
[![NPM Version](http://img.shields.io/npm/v/pico.driver.audioworker.svg?style=flat-square)](https://www.npmjs.org/package/pico.driver.audioworker)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

This is an experimental module.
AudioWorker haven't been implemented in any browsers yet.

## Installation

```
$ npm install pico.driver.audioworker
```

## API
### PicoAudioClientDriver
- `constructor()`

#### Instance attributes
- `node: AudioWorkerNode` _(required)_
- `context: AudioContext` _(implicit readonly)_
- `sampleRate: number` _(implicit readonly)_
- `bufferLength: number` _(implicit readonly)_

#### Instance methods
- `setup(opts: object): void`
  - `opts.context: AudioContext` _(required)_
- `start(): void`
- `stop(): void`

### PicoAudioWorkerDriver
- `constructor()`

#### Instance attributes
- `processor: Processor` _(required)_
- `context: null` _(implicit readonly)_
- `sampleRate: number` _(implicit readonly)_
- `bufferLength: number` _(implicit readonly)_

#### Instance methods
- `setup(opts: object): void`
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
