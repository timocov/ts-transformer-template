# ts-transformer-transformerName

[![GH Actions][ci-img]][ci-link]
[![npm version][npm-version-img]][npm-link]
[![Downloads][npm-downloads-img]][npm-link]

## Installation

1. Install the package `npm i -D ts-transformer-transformerName`
1. Add transformer with [one of possible ways](#how-to-use-the-custom-transformer)

## Options

<!--
### optionName

*Default: `defaultValue`*

Description.

 -->

## How to use the custom transformer

Unfortunately, TypeScript itself does not currently provide any easy way to use custom transformers (see <https://github.com/Microsoft/TypeScript/issues/14419>).
The followings are the example usage of the custom transformer.

### webpack (with ts-loader or awesome-typescript-loader)

```js
// webpack.config.js
const transformerName = require('ts-transformer-transformerName').default;

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader', // or 'awesome-typescript-loader'
        options: {
          getCustomTransformers: program => ({
              before: [
                  transformerName(program, { entrySourceFiles: ['./src/index.ts'] })
              ]
          })
        }
      }
    ]
  }
};
```

### Rollup (with rollup-plugin-typescript2)

```js
// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import transformerName from 'ts-transformer-transformerName';

export default {
  // ...
  plugins: [
    typescript({ transformers: [service => ({
      before: [ transformerName(service.getProgram(), { entrySourceFiles: ['./src/index.ts'] }) ],
      after: []
    })] })
  ]
};
```

### ttypescript

See [ttypescript's README](https://github.com/cevek/ttypescript/blob/master/README.md) for how to use this with module bundlers such as webpack or Rollup.

*tsconfig.json*:

```json
{
  "compilerOptions": {
    // ...
    "plugins": [
      { "transform": "ts-transformer-transformerName", "entrySourceFiles": ["./src/index.ts"] }
    ]
  },
  // ...
}
```

[ci-img]: https://github.com/timocov/ts-transformer-transformerName/workflows/CI%20Test/badge.svg?branch=master
[ci-link]: https://github.com/timocov/ts-transformer-transformerName/actions?query=branch%3Amaster

[npm-version-img]: https://badge.fury.io/js/ts-transformer-transformerName.svg
[npm-downloads-img]: https://img.shields.io/npm/dm/ts-transformer-transformerName.svg
[npm-link]: https://www.npmjs.com/package/ts-transformer-transformerName
