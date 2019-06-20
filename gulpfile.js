const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// 静态服务器
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function() {
    // gulp.watch('app/**/*.scss',gulp.series('sass'))
    gulp.watch('app/**/*.scss').on('change', handleSass)
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
})

function handleSass(path, e) {
    return gulp.src('app/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('app'))
            // .pipe(gulp.dest(path.replace(path.replace(/\\/g, "\/").replace(/.+\/(.+)$/, '$1'), '')))
            // .pipe(browserSync.stream());
}

gulp.task('run', gulp.parallel('server', 'watch'))
// 代理

// gulp.task('server', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });