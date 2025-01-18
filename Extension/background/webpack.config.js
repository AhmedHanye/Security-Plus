const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

module.exports = {
  entry: "./dist/index.js",
  output: {
    filename: "background.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: "production",
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("CleanupPlugin", () => {
          const distDir = path.join(__dirname, "dist");
          fs.readdir(distDir, (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
              if (file !== "background.js") {
                fs.unlink(path.join(distDir, file), (err) => {
                  if (err) throw err;
                });
              }
            });
          });
        });
      },
    },
  ],
};
