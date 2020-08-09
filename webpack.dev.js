const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
   mode: "development",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: "./src/template.html",
      }),
   ],
   devServer: {
      contentBase: "./dist",
      port: 8080,
      open: {
         app: ["chrome", "--incognito"],
      },
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
         },
         {
            test: /\.scss$/,
            use: [
               "style-loader", //3. Inject styles into DOM
               "css-loader", //2. Turns css into commonjs
               "sass-loader", //1. Turns sass into css
            ],
         },
      ],
   },
});
