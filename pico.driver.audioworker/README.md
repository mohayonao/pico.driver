# pico.driver.audioworker
[![NPM Version](http://img.shields.io/npm/v/pico.driver.audioworker.svg?style=flat-square)](https://www.npmjs.org/package/pico.driver.audioworker)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

This is an experimental.
AudioWorker have not been implemented in any browsers.

## Installation

```
$ npm install pico.driver.audioworker
```

## API
### PicoAudioWorkerDriver
- `constructor()`

#### Instance attributes
- `sampleRate: number` _(implicit readonly)_

#### Instance methods
- `setup(opts: object): void`
  - `opts.worker: AudioWorker` _(required)_
  - `opts.context: AudioContext` _(required)_
- `start(): void`
- `stop(): void`

## License

MIT
