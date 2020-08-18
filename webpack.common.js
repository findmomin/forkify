const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|ico|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name].[hash].[ext]",
          },
        },
      },
    ],
  },
};
