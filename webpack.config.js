const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/front/js/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // clean : true,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            ignoreOrder: true,
            linkType: "text/css",
        }),
        
        new HtmlWebpackPlugin({
          filename: "index.html",
          template: "./src/front/index.html"
        }),
      ],
};