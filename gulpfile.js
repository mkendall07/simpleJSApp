var argv = require('yargs').argv;
var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var karma = require('gulp-karma');
var preprocess = require('gulp-preprocess');
var opens = require('open');
var webpackConfig = require('./webpack.conf.js');
var helpers = require('./gulpHelpers');
var jscs = require('gulp-jscs');
var header = require('gulp-header');

var CI_MODE = process.env.NODE_ENV === 'ci';
var sourceEntryPath = './src/simpleJsApp.js';
var pkg = require('./package.json');
var dateString = 'Updated : ' + (new Date()).toISOString().substring(0, 10);
var banner = '/* <%= pkg.name %> v<%= pkg.version %> ' + dateString + ' */\n';

// Tasks
gulp.task('default', ['clean', 'quality', 'webpack']);

gulp.task('serve', ['clean', 'quality', 'webpack', 'watch', 'test']);

gulp.task('build', ['clean', 'quality', 'webpack']);


gulp.task('clean', function() {
    return gulp.src(['build', 'test'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('webpack', function() {

    return gulp.src([sourceEntryPath])
        .pipe(webpack(webpackConfig))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('build/dev'))
        .pipe(gulp.dest('test/app'))
        .pipe(uglify())
        .pipe(preprocess({
            context: {
                UNIT_TEST_EXPORTS: false
            }
        }))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('build/dist'))
        .pipe(connect.reload());
});


// Karma Continuous Testing
// Pass your browsers by using --browsers=chrome,firefox,ie9
// Run CI by passing --watch
gulp.task('test', function() {
    var defaultBrowsers = CI_MODE ? ['PhantomJS'] : ['Chrome'];
    var browserArgs = helpers.parseBrowserArgs(argv).map(helpers.toCapitalCase);

    return gulp.src('lookAtKarmaConfJS')
        .pipe(karma({
            browsers: (browserArgs.length > 0) ? browserArgs : defaultBrowsers,
            configFile: 'karma.conf.js',
            action: (argv.watch) ? 'watch' : 'run'
        }));
});

// Small task to load coverage reports in the browser
gulp.task('coverage', function(done) {
    var coveragePort = 1999;

    connect.server({
        port: 1999,
        root: 'build/coverage',
        livereload: false
    });
    opens('http://localhost:' + coveragePort + '/coverage/');
    done();
});

// Watch Task with Live Reload
gulp.task('watch', function() {

    gulp.watch(['tests/unit/*.js'], ['webpack', 'test']);
    gulp.watch(['tests/e2e/testPages/**/*.html'], ['test']);
    gulp.watch(['src/*.js'], ['webpack', 'test']);
    connect.server({
        port: 8090,
        root: './',
        livereload: true
    });
});

gulp.task('quality', ['hint', 'jscs'], function() {});

gulp.task('hint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
    return gulp.src(sourceEntryPath)
        .pipe(jscs({
            'configPath': 'styleRules.jscs.json'
        }));
});
