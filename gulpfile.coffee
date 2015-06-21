gulp          = require("gulp")
$             = do require("gulp-load-plugins")
webpack       = require("webpack")
browserSync   = require("browser-sync").create()
webpackConfig = require("./webpack.config.coffee")


# ブラウザの同期
gulp.task("bs", ->
  browserSync.init(
    notify: false
    server: 
      baseDir: "./dist/"
  )
)

gulp.task("bs:reload", ->
  browserSync.reload()
)


# assetsディレクトリのコピー
gulp.task("assets-copy", ->
  gulp.src("./assets/**/*", base: "./assets")
  .pipe(gulp.dest("./dist"))
  .pipe(browserSync.stream())
)


# .scssのコンパイル
gulp.task("sass", ->
  $.rubySass("./src/sass/", 
    style: "compressed"
    stopOnError: true
  )
  .pipe($.autoprefixer())
  .pipe(gulp.dest("./dist/css"))
  .pipe(browserSync.stream())
)


# webpack
gulp.task("webpack", (cb) ->
  webpack(webpackConfig, (err, stats) ->
    if err
      throw new $.util.PluginError("webpack", err)
    $.util.log("[webpack]", stats.toString())

    browserSync.reload()
    cb()
  )
)


# 各ファイルをビルド
# ※今回はファイルの圧縮などはしていません
gulp.task("build", ->
  gulp.start("assets-copy")
  gulp.start("sass")
  gulp.start("webpack")
)


# ファイルの変更を監視
gulp.task("watch", ["bs", "build"], ->
  $.watch("./assets/**/*", ->
    gulp.start("assets-copy")
  )

  $.watch("./src/coffee/**/*", ->
    gulp.start("webpack")
  )

  $.watch("./src/sass/**/*", ->
    gulp.start("sass")
  )
)


# デフォルトのタスク
gulp.task("default", ->
  gulp.start("watch")
)