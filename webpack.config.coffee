path    = require("path")


module.exports =

  progress: true

  entry:
    app: "./src/coffee/app.cjsx"

  output:
    path: path.join(__dirname, "./dist/js/")
    filename: "[name].bundle.js"

  devtool: "source-map"

  resolve:
    modulesDirectories: ["node_modules"]
    extensions: ["", ".cjsx", ".coffee", ".webpack.js", ".web.js", ".js"]

  # .cjsxファイルをコンパイルするためのLoaderを指定します
  module: 
    loaders: [
      {test: /.cjsx$/, loaders: ["coffee-loader", "cjsx-loader"]}
      {test: /.coffee$/, loader: "coffee-loader"}
    ]
