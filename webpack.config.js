'use strict';

var _ = require('lodash');
var webpack = require('webpack');

var config = {
  fileName: 'world-clock',
  src: './src/scripts/WorldClock.jsx'
};

module.exports = {
  entry: config.src,
  output: {
    path: __dirname + '/dist',
    filename: config.fileName + '.js',
    libraryTarget: 'umd',
    library: 'WorldClock'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    moment: 'moment'
  },
  // node: {
  //   net: 'empty',
  //   fs: 'empty',
  //   tls: 'empty'
  // },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'jsx-loader?harmony'
    }, {
      test: /\.(js|jsx)$/,
      loader: 'jsx-loader?insertPragma=React.DOM'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/, loader: 'babel-loader'
    }, {
      include: /\.json$/,
      loaders: ['json-loader']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    })
  ]
};
