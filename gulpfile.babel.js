import path from "path"
import gulp from "gulp"
import gulpLoadPlugins from "gulp-load-plugins"
import del from "del"
import webpack from "webpack"
import browserSync from "browser-sync"
import runSequence from "run-sequence"

const $ = gulpLoadPlugins();
const server = browserSync.create();


gulp.task("server", () => {
  server.init({
    server: {
      baseDir: "./dist/"
    }
  });
});


gulp.task("server:reload", () => {
  server.reload();
});


gulp.task("clean", (cb) => {
  del(["./dist"]).then(() => cb());
});


gulp.task("copy", () => {
  gulp.src("./assets/**/*", {base: "assets"})
  .pipe(gulp.dest("./dist"));
});


gulp.task("webpack", (cb) => {
  webpack({
    entry: {
      app: "./src/js/app.js"
    },
    output: {
      path: path.join(__dirname, "dist/js"),
      filename: "[name].bundle.js"
    },
    devtool: "#source-map",
    module: {
      loaders: [
        {test: /\.jsx?$/, exclude: /(node_modules)/, loader: "babel?optional[]=runtime&stage=0"}
      ]
    }
  }, (err, stats) => {
    if( err ) throw new $.util.PluginError("webpack", err);
    $.util.log("[webpack]", stats.toString());
    server.reload();
    cb();
  });
});


gulp.task("uglify", () => {
  gulp.src("./dist/js/**/*.js")
  .pipe($.plumber())
  .pipe($.uglify({preserveComments: "some"}))
  .pipe(gulp.dest("./dist/js"))
  .pipe(server.stream());
});


gulp.task("sass", () => {
  gulp.src("./src/sass/**/*.scss")
  .pipe($.plumber())
  .pipe($.sass.sync({outputStyle: "compressed"}))
  .pipe($.autoprefixer())
  .pipe(gulp.dest("./dist/css"))
  .pipe(server.stream());
});


gulp.task("test", () => {
  gulp.src("./src/js/test/**/*.js", {read: false})
  .pipe($.plumber())
  .pipe($.mocha());
});


gulp.task("build", () => {
  runSequence(
    [
      "webpack",
      "sass",
      "copy"
    ],
    [
      "uglify"
      // "test"
    ]
  );
});


gulp.task("watch", () => {
  gulp.watch("./src/js/**/*", ["webpack"]);
  gulp.watch("./src/sass/**/*", ["sass"]);
  // gulp.watch("./src/js/test/**/*", ["test"]);
});


gulp.task("start", () => {
  runSequence(
    "build",
    "watch",
    "server"
  );
});


gulp.task("default", ["start"]);