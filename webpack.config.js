const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {

  context: __dirname + "/src",
  entry: {
    javascript: "./index.js"
    // html: "./index.html"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      },
      {
        test: /\.(scss|css)$/,
        use: [ 'style-loader','css-loader','sass-loader' ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ]
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./dist/index.html"
    })
  ],

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    // Display only errors to reduce the amount of output.
    // stats: "errors-only",
    writeToDisk: true
  }
}
