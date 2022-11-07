import gulp from "gulp";
import imagemin from "gulp-imagemin"; //стиснення зображень
import concat from "gulp-concat";//об'єднання файлів - конкатенація
import uglify from "gulp-uglify"; //мінімізація javascript
import rename from "gulp-rename"; //перейменування файлів
import {deleteAsync} from "del";
import cleanCSS  from "gulp-clean-css";
import browsersync from "browser-sync";
import include from "gulp-file-include";
import autoprefixer from "autoprefixer";
import sass from "sass";
import cssnano from "cssnano";

const buildFolder = `./dist`;
const srcFolder = `./app`;

const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
        json:`${buildFolder}/json/`,
    },
    /*src: {
        html: `${srcFolder}/!*.html`,
        css: `${srcFolder}/!**!/!*.css`,
        js: `${srcFolder}/!**!/!*.js`,
        img: `${srcFolder}/!**!/!*.+ (jpg | jpeg | png | gif | svg)`,
    },*/
    src: {
        html: `${srcFolder}/*.html`,
        css: `${srcFolder}/css/*.css`,
        js: `${srcFolder}/js/*.js`,
        img: `${srcFolder}/img/*`,
        json: `${srcFolder}/*.json`,
    },
    watch: {
        files: `${srcFolder}/!*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
}

global.app ={
    path: path,
    gulp: gulp
}
//Створюємо тестовий таск
gulp.task ('testTask', function (done) {
    console.log ('This is a test task!');
    done();
});
//копіювання HTML файлів в папку dist
const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(include({
            prefix: `@@`
        }))
        .pipe(app.gulp.dest(app.path.build.html))
}

const css = () => {
    return app.gulp.src(app.path.src.css)
        .pipe(concat('styles.scss'))
        .pipe (cleanCSS())
        .pipe (rename ({suffix: '.min'}))
        .pipe(app.gulp.dest(app.path.build.css))
}
const json = () => {
    return app.gulp.src(app.path.src.json)
        .pipe(app.gulp.dest(app.path.build.json))
}
// cтискання зображень
const images = () => {
    return app.gulp.src(app.path.src.img)
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(app.gulp.dest(app.path.build.img))
}

//об'єднання і стиснення JS-файлів
const scripts = () => {
    return app.gulp.src(app.path.src.js)
        .pipe (concat ( 'scripts.js'))
        .pipe (uglify ())
        .pipe (rename ({suffix: '.min'}))
        .pipe(app.gulp.dest(app.path.build.js))
    return app.gulp.src(app.path.src.json)
        .pipe(app.gulp.dest(app.path.build.json))
}

//відстежування за змінами у файлах
const watcher = (done) => {
    gulp.watch(app.path.watch.files, html);
    gulp.watch(app.path.watch.files, scripts);
    gulp.watch(app.path.watch.files, images);
    gulp.watch(app.path.watch.files, css);
    gulp.watch(app.path.watch.files, json);
    done();
}
const server = (done) => {
    browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`,
        },
        notify: false,
        port: 3000,
    });
    done();
}
const mainTask = gulp.series( html, css, scripts, images,json);

const dev = gulp.series(mainTask, gulp.parallel(watcher, server));



gulp.task ( "default", dev);

/*
//Запуск тасків за замовчуванням
const task =gulp.series( html,css ,scripts, images, gulp.parallel(watcher,server));
gulp.task("default",task);
*/




