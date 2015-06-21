gulp          = require("gulp")
$             = do require("gulp-load-plugins")
webpack       = require("webpack")
browserSync   = require("browser-sync").create()
webpackConfig = require("./webpack.config.coffee")


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


gulp.task("assets-copy", ->
  gulp.src("./assets/**/*", base: "./assets")
  .pipe(gulp.dest("./dist"))
  .pipe(browserSync.stream())
)


gulp.task("sass", ->
  $.rubySass("./src/sass/", 
    style: "compressed"
    stopOnError: true
  )
  .pipe($.autoprefixer())
  .pipe(gulp.dest("./dist/css"))
  .pipe(browserSync.stream())
)


gulp.task("webpack", (cb) ->
  webpack(webpackConfig, (err, stats) ->
    if err
      throw new $.util.PluginError("webpack", err)
    $.util.log("[webpack]", stats.toString())

    browserSync.reload()
    cb()
  )
)


gulp.task("build", ->
  gulp.start("assets-copy")
  gulp.start("sass")
  gulp.start("webpack")
)


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


gulp.task("default", ->
  gulp.start("watch")
)