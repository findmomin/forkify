const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
   mode: "production",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[contentHash].js",
   },
   plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: "css/[name].[contentHash].css",
      }),
   ],
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader, //3. Extract CSS from JS into files
               "css-loader", //2. Turns css into commonjs
               "sass-loader", //1. Turns sass into css
            ],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
            },
         },
      ],
   },
   optimization: {
      minimizer: [
         new OptimizeCssAssetsPlugin(),
         new TerserPlugin(),
         new HtmlWebpackPlugin({
            template: "./src/template.html",
            minify: {
               removeAttributeQuotes: true,
               collapseWhitespace: true,
               removeComments: true,
            },
         }),
      ],
   },
});
