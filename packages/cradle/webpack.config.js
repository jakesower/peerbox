const HtmlWebpackPlugin = require('html-webpack-plugin');
const widgets = require('./config/widgets.json');

module.exports = {
  devtool: 'inline-source-map',
  entry: "./src/index.js",
  output: {
    // path: __dirname + "../server/assets/scripts/",
    path: __dirname + "/dist",
    filename: "scripts/peerbox-connection.js"
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   widgets,
    //   template: 'index.ejs',
    //   filename: 'index.html',
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
};
