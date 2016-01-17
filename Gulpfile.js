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
        browserName: 'iphone',
        platform:    'OS X 10.10',
        version:     '8.1',
        deviceName:  'iPad Simulator'
    },
    {
        browserName: 'iphone',
        platform:    'OS X 10.10',
        version:     '9.1',
        deviceName:  'iPhone 6 Plus'
    },
    {
        browserName: 'iphone',
        platform:    'OS X 10.10',
        version:     '8.1',
        deviceName:  'iPad Simulator'
    },
    {
        browserName: 'iphone',
        platform:    'OS X 10.10',
        version:     '9.2',
        deviceName:  'iPhone 6 Plus'
    }
];

var SAUCELABS_SETTINGS = {
    username:  'JohnSilver',
    accessKey: '415a2567-87fa-4d50-9e63-4561a038317a',
    build:     'RCHP5',
    tags:      ['test', 'sl'],
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