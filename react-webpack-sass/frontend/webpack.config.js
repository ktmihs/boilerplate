const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const dotenv = require("dotenv").config().parsed;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const PORT = dotenv.PORT || 4000;

  console.log('===========================', env, argv, dotenv)
  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "hidden-source-map" : "source-map",
    entry: "./src/index.tsx",
    output: {
      filename: "[name].js",
      path: path.join(__dirname, '/dist'),
      assetModuleFilename: 'assets/[name][ext]'
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/i,
          include: path.resolve(__dirname, 'src'),
          use: ["babel-loader", "ts-loader"]
        },
        {
          test: /\.(c|sc)ss?$/,
          use: ["sass-loader", "style-loader", "css-loader"],
        },
        {
          test: /\.(webp|jpg|png|jpeg|gif|svg)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[hash]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({ filename: 'css/index.css' })
    ],
    devServer: {
      proxy: {
        '/api': 'http://localhost:5500',
      },
      port: PORT,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
  }
};