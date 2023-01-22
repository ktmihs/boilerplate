const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const dotenv = require("dotenv").config().parsed;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const PORT = dotenv.PORT || 5500;

  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "hidden-source-map" : "source-map",
    entry: ['./src/index.tsx', './src/style/index.scss'],
    output: {
      filename: "[name].js",
      path: path.join(__dirname, '/dist'),
      assetModuleFilename: 'assets/[name][ext]'
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/i,
          include: path.resolve(__dirname, 'src'),
          use: ["babel-loader", "ts-loader"]
        },
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
      new MiniCssExtractPlugin({ filename: 'index.css' })
    ],
    devServer: {
      proxy: {
        '/api': 'http://localhost:4000',
      },
      port: PORT,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
  }
};