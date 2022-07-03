const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const commonConfig = {
  rules: [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: ["url-loader"],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ["file-loader"],
    },
    {
      test: /\.(csv|tsv)$/,
      use: ["csv-loader"],
    },
    {
      test: /\.xml$/,
      use: ["xml-loader"],
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(jsx?)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
    },
  ],
};

/** @description Please notice, change this path to create specific "bundle" for dedicated React "instance". */
const filePath = "paragraph/paragraphEnumeratedContentGroup.js";

module.exports = {
  mode: "production",
  entry: {
    entry: `./src/components-index/${filePath}`
  },
  output: {
    filename: `build/static/js/proof-of-concept/components-index/${filePath}`
  },
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  module: {
    ...commonConfig,
  },
  plugins: [new UglifyJsPlugin()],
};
