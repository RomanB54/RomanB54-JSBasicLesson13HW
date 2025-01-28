const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const glob = require("glob");
// const htmlTemplates = glob.sync('./pages/*.html').map((file) => {
//   return new HtmlWebpackPlugin({
//       template: file,
//       filename: path.basename(file),
//       chunks: [path.basename(file, path.extname(file))]
//   });
// });
module.exports = {
  mode: 'development',
  entry: {
    firstPage: './src/index1.js',
    secondPage: './src/index2.js',
    thirdPage: './src/index3.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      filename: 'index.html',
      chunks: ['firstPage'], // Only include index.bundle.js
    }),
    new HtmlWebpackPlugin({
      template: './pages/index2.html',
      filename: 'index2.html',
      chunks: ['secondPage'], // Only include index.bundle.js
    }),
    new HtmlWebpackPlugin({
      template: './pages/index3.html',
      filename: 'index3.html',
      chunks: ['thirdPage'], // Only include index.bundle.js
    }),
    new MiniCssExtractPlugin(),
  ],
  // devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 9000,
  },
};
