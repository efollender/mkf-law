var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEBUG = !(process.env.ENV === 'production');
var stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader");
if (DEBUG) var stylusLoader = "style-loader!css-loader!stylus-loader";

var ROOT_PATH = path.resolve(__dirname);
console.log(ROOT_PATH);
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, 'js/index')
  ],
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['babel','eslint'],
        exclude: /node_modules/,
        include: path.resolve(ROOT_PATH, 'js')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.styl$/,
        loader: stylusLoader
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file'
      }
    ]
  },
  stylus: {
    use: [require('nib')(), require('rupture')(), require('s-grid')()]
  },
  eslint: {
    fix: true,
    quotes: 'single'
  },
  babel: {
    presets: [
      "es2015",
      "stage-0"
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.resolve(ROOT_PATH),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH),
    port: 9090,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.ENV': '"dev"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css")
  ]
};