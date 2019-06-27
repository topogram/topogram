const webpack = require('webpack');

module.exports = {
  target: "web", // frontend only
  context: __dirname + "/src",
  entry: {
    javascript: "./index.js"
    // html: "./index.html"
  },
  output: {
   // path: path.resolve(__dirname, "../build"),
   path: __dirname + '/dist',
   filename: "bundle.js",
   library: 'Topograph',
   libraryTarget: 'umd'
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
  externals: [
      {
          "react": {
              root: "React",
              commonjs2: "react",
              commonjs: "react",
              amd: "react"
          },
          "react-dom": {
              root: "ReactDOM",
              commonjs2: "react-dom",
              commonjs: "react-dom",
              amd: "react-dom"
          }
      }
  ]
}
