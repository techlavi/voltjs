const path = require('path')

module.exports = [{
  target: 'web',
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'browser.js',
    library: {
      name: 'Volt',
      type: 'var',
      export: 'default',
    },
    libraryTarget: 'var',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  }
}, {
  target: 'node',
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'node.js',
    library: {
      name: 'Volt',
      type: 'umd',
      export: 'default',
    },
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  }
}]
