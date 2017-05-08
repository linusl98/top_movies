
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js?x$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader',
      ],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'url-loader',
        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    }, {
      test: /\.(eot|ttf|woff|woff2|wav|mp3)$/,
      loader: 'file-loader',
    }],
  },
};

module.exports = config;
