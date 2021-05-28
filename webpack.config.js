const path = require('path')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: production ? 'volt.min.js' : 'volt.js',
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  }
}
