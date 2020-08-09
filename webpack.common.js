const path = require("path");

module.exports = {
   entry: {
      main: "./src/js/index.js",
      vendor: "./src/js/vendor.js",
   },
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
                  name: "[name].[ext]",
               },
            },
         },
      ],
   },
};
