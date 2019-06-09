const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");

module.exports = (env, arg) => {
  const config = {
    entry: "./src/App.tsx",
    output: {
      path: Path.join(process.cwd(), "docs"),
      filename: "[name].[chunkhash].js",
      crossOriginLoading: false
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
      rules: [{
        test: /\.scss$/,
        loader: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: { modules: 'global' }
        }, {
          loader: "sass-loader",
          options: { includePaths: ["./node_modules"] }
        }]
      }, {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/Template.html" })
    ],
    devServer: {
      port: 4200,
      historyApiFallback: true
    },
  };

  if (arg.mode === 'production') {
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin()
    ]);
  }

  return config;
};