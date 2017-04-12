var babel   = require('gulp-babel');
var eslint  = require('gulp-eslint');
var gulp    = require('gulp');
var del     = require('del');
var Promise = require('pinkie');
var os      = require('os');

require('babel-polyfill');


var config = {
    1: [
        {
            os:        'android',
            osVersion: '4.4',
            browser:   'Android Browser',
            device:    'Samsung Galaxy S5',
            alias:     'android'
        },
        {
            os:        'ios',
            osVersion: '10.0',
            browser:   'Mobile Safari',
            device:    'iPad Pro (9.7 inch)',
            alias:     'ipad'
        },
        {
            os:        'ios',
            osVersion: '10.0',
            device:    'iPhone 7 Plus',
            browser:   'Mobile Safari',
            alias:     'iphone'
        }],

    2: [
        {
            os:        'OS X',
            osVersion: 'Sierra',
            name:      'safari',
            version:   '10.0',
            alias:     'safari'
        },
        {
            os:        'OS X',
            osVersion: 'Sierra',
            name:      'chrome',
            version:   '57.0',
            alias:     'chrome-osx'
        },
        {
            os:        'OS X',
            osVersion: 'Sierra',
            name:      'firefox',
            version:   '52.0',
            alias:     'firefox-osx'
        },
        {
            os:        'Windows',
            osVersion: '10',
            name:      'edge',
            version:   '13.0',
            alias:     'edge',
        }
    ]
};

gulp.task('clean', function () {
    return del('lib');
});

gulp.task('build', ['clean'], function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib/'));
});

gulp.task('travis', [process.env.GULP_TASK || '']);

gulp.task('run1', ['build'], function () {
    var Сonnector = require('./lib');
    var connector = new Сonnector(process.env.user, process.env.key);
    var site      = require('./site.js');

    return connector
        .connect()
        .then(function () {
            var url = 'http://' + os.hostname() + ':' + 5000 + '/redirect';

            var openBrowserPromises = config['1'].map(function (browserInfo) {
                return connector.startBrowser(browserInfo, url);
            });

            return Promise.all(openBrowserPromises);
        })
        .then(function (browsers) {
            return new Promise(function (res) {
                setTimeout(res, 9 * 60 * 1000);
            });
        });
});

gulp.task('run2', ['build'], function () {
    var Сonnector = require('./lib');
    var connector = new Сonnector(process.env.user, process.env.key);
    var site      = require('./site.js');

    return connector
        .connect()
        .then(function () {
            var url = 'http://' + os.hostname() + ':' + 5000 + '/redirect';

            var openBrowserPromises = config['2'].map(function (browserInfo) {
                return connector.startBrowser(browserInfo, url);
            });

            return Promise.all(openBrowserPromises);
        })
        .then(function (browsers) {
            return new Promise(function (res) {
                setTimeout(res, 9 * 60 * 1000);
            });
        });
});

gulp.task('lint', function () {
    return gulp
        .src(['src/**/*.js', 'Gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
