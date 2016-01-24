var gulp         = require('gulp');
var qunitHarness = require('gulp-qunit-harness');
var Promise      = require('pinkie');

var CLIENT_TESTS_SETTINGS = {
    basePath:        'test',
    port:            2000,
    crossDomainPort: 2001,

};

var CLIENT_TESTS_BROWSERS = [
    {
        platform:    'Windows 10',
        browserName: 'microsoftedge'
    },
    {
        platform:    'Windows 10',
        browserName: 'chrome'
    },
    {
        browserName: 'chrome',
        platform:    'OS X 10.11'
    },
    {
        platform:    'Windows 10',
        browserName: 'firefox'
    },
    {
        browserName: 'firefox',
        platform:    'OS X 10.11'
    }
];

var SAUCELABS_SETTINGS = {
    username:  'JohnSilverM',
    accessKey: '5ac1ea58-8ea0-4f15-a0c9-1e41786bcc51',
    build:     process.env.TRAVIS_JOB_ID || '',
    tags:      [process.env.TRAVIS_BRANCH || 'master'],
    browsers:  CLIENT_TESTS_BROWSERS,
    name:      'qunit browserJob tests',
    timeout:   720
};

gulp.task('test-local', function () {
    return gulp
        .src('test/**/*-test.js')
        .pipe(qunitHarness(CLIENT_TESTS_SETTINGS));
});

gulp.task('test-remote', function () {
    return gulp
        .src('test/**/*-test.js')
        .pipe(qunitHarness(CLIENT_TESTS_SETTINGS, SAUCELABS_SETTINGS));
});

gulp.task('travis', [process.env.GULP_TASK || '']);