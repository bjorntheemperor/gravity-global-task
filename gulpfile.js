const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

const compileSass = require('gulp-sass');
compileSass.compiler = require('sass')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const fileInclude = require('gulp-file-include')

// File paths
const files = { 
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js',
    htmlPath: '*.html',
};

// const sass = gulpSass(dartSass)
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(compileSass([])) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')); // put final CSS in dist folder
}

function jsTask(){
    return src([
        files.jsPath
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

function htmlTask(){
    return src([
        files.htmlPath
    ])
        .pipe(fileInclude())
        .pipe(dest('dist')
        );
}

var cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function watchTask(){
    watch([files.htmlPath, files.scssPath, files.jsPath],
        parallel(htmlTask, scssTask, jsTask));
}

exports.default = series(
    parallel(htmlTask, scssTask, jsTask),
    cacheBustTask,
    watchTask
);