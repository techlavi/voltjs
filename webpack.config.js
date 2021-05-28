const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'volt.js',
    library: {
      name: 'volt',
      type: 'var',
      export: 'default',
    },
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  }
}
